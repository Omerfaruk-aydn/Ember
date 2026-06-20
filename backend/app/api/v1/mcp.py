from typing import Any
from fastapi import APIRouter, Depends
from app.deps import get_current_active_user
from app.models.user import User
from app.services.video_service import VideoService
from app.services.brand_service import BrandService

router = APIRouter()
video_service = VideoService()
brand_service = BrandService()

MCP_TOOLS = [
    {
        "name": "generate_video",
        "description": "Generate a professional video from a text prompt",
        "inputSchema": {
            "type": "object",
            "properties": {
                "prompt": {"type": "string", "description": "Description of the video to generate"},
                "duration": {"type": "integer", "description": "Video duration in seconds (default: 30)", "minimum": 5, "maximum": 300},
                "style": {"type": "string", "enum": ["cinematic", "modern", "playful", "minimal", "kinetic", "elegant"], "description": "Visual style"},
                "aspect_ratio": {"type": "string", "enum": ["16:9", "9:16", "1:1", "4:3"], "description": "Video aspect ratio"},
            },
            "required": ["prompt"],
        },
    },
    {
        "name": "list_projects",
        "description": "List all video projects",
        "inputSchema": {
            "type": "object",
            "properties": {
                "status": {"type": "string", "enum": ["draft", "generating", "ready", "failed"]},
                "limit": {"type": "integer", "minimum": 1, "maximum": 100},
            },
        },
    },
    {
        "name": "get_project",
        "description": "Get details of a specific project",
        "inputSchema": {
            "type": "object",
            "properties": {"project_id": {"type": "string"}},
            "required": ["project_id"],
        },
    },
    {
        "name": "get_video_status",
        "description": "Get the status of a video generation",
        "inputSchema": {
            "type": "object",
            "properties": {"project_id": {"type": "string"}},
            "required": ["project_id"],
        },
    },
    {
        "name": "create_brand",
        "description": "Create a new brand context",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Brand name"},
                "website_url": {"type": "string", "description": "Brand website URL"},
                "colors": {"type": "array", "items": {"type": "string"}, "description": "Brand colors (hex codes)"},
            },
            "required": ["name"],
        },
    },
]


@router.get("/tools")
async def list_tools(current_user: User = Depends(get_current_active_user)):
    return {"tools": MCP_TOOLS}


@router.post("/tools/{tool_name}")
async def call_tool(tool_name: str, arguments: dict[str, Any], current_user: User = Depends(get_current_active_user)):
    try:
        if tool_name == "generate_video":
            project = await video_service.create_project(
                current_user.id,
                arguments["prompt"],
                f"MCP Video - {arguments['prompt'][:50]}",
            )
            result = await video_service.start_generation(project.id)
            return {"success": True, "project_id": str(project.id), "status": "generating", "message": f"Video generation started. Project ID: {project.id}"}

        elif tool_name == "list_projects":
            from sqlalchemy import select
            from app.models.project import Project
            from app.db.session import async_session_factory
            async with async_session_factory() as db:
                query = select(Project).where(Project.user_id == current_user.id, Project.deleted_at.is_(None))
                if arguments.get("status"):
                    query = query.where(Project.status == arguments["status"])
                query = query.order_by(Project.created_at.desc()).limit(arguments.get("limit", 20))
                result = await db.execute(query)
                projects = result.scalars().all()
                return {"success": True, "projects": [{"id": str(p.id), "name": p.name, "status": p.status, "created_at": p.created_at.isoformat()} for p in projects]}

        elif tool_name == "get_project":
            import uuid
            from sqlalchemy import select
            from app.models.project import Project
            from app.db.session import async_session_factory
            async with async_session_factory() as db:
                result = await db.execute(select(Project).where(Project.id == uuid.UUID(arguments["project_id"]), Project.user_id == current_user.id))
                project = result.scalar_one_or_none()
                if not project:
                    return {"success": False, "error": "Project not found"}
                return {"success": True, "project": {"id": str(project.id), "name": project.name, "prompt": project.prompt, "status": project.status}}

        elif tool_name == "get_video_status":
            import uuid
            status = await video_service.get_status(uuid.UUID(arguments["project_id"]))
            return {"success": True, **status}

        elif tool_name == "create_brand":
            brand = await brand_service.create(current_user.id, arguments["name"], arguments.get("website_url"), arguments.get("colors"))
            return {"success": True, "brand_id": str(brand.id), "name": brand.name}

        else:
            return {"success": False, "error": f"Unknown tool: {tool_name}"}

    except Exception as e:
        return {"success": False, "error": str(e)}
