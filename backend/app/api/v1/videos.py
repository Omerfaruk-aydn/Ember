import uuid
from fastapi import APIRouter, Depends
from app.deps import get_current_active_user
from app.models.user import User
from app.schemas.project import ProjectCreateRequest
from app.services.video_service import VideoService

router = APIRouter()
video_service = VideoService()


@router.post("/generate")
async def generate_video(body: ProjectCreateRequest, current_user: User = Depends(get_current_active_user)):
    project = await video_service.create_project(current_user.id, body.prompt, body.name, body.description, body.settings)
    result = await video_service.start_generation(project.id)
    return result


@router.get("/{project_id}/status")
async def get_video_status(project_id: uuid.UUID, current_user: User = Depends(get_current_active_user)):
    return await video_service.get_status(project_id)


@router.post("/{project_id}/cancel")
async def cancel_video(project_id: uuid.UUID, current_user: User = Depends(get_current_active_user)):
    await video_service.cancel_generation(project_id)
    return {"status": "cancelled"}
