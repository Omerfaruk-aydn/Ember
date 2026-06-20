import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import BadRequestException, NotFoundException
from app.models.project import Project
from app.models.scene import Scene
from app.db.session import async_session_factory


class VideoService:
    async def create_project(self, user_id: uuid.UUID, prompt: str, name: str, description: str | None = None, settings: dict | None = None) -> Project:
        async with async_session_factory() as db:
            project = Project(
                user_id=user_id,
                name=name,
                description=description,
                prompt=prompt,
                settings=settings or {},
            )
            db.add(project)
            await db.commit()
            await db.refresh(project)
            return project

    async def start_generation(self, project_id: uuid.UUID) -> dict:
        async with async_session_factory() as db:
            result = await db.execute(select(Project).where(Project.id == project_id))
            project = result.scalar_one_or_none()
            if not project:
                raise NotFoundException("Project not found")
            project.status = "generating"
            project.current_phase = "init"
            project.progress = 0
            await db.commit()

            from app.workers.celery_app import celery_app
            task = celery_app.send_task(
                "app.workers.render_worker.generate_video",
                args=[str(project_id), str(project.user_id), project.prompt, project.settings],
                queue="render",
            )
            return {"project_id": str(project_id), "task_id": task.id, "status": "generating"}

    async def get_status(self, project_id: uuid.UUID) -> dict:
        async with async_session_factory() as db:
            result = await db.execute(select(Project).where(Project.id == project_id))
            project = result.scalar_one_or_none()
            if not project:
                raise NotFoundException("Project not found")
            return {
                "project_id": str(project.id),
                "status": project.status,
                "progress": float(project.progress or 0),
                "current_phase": project.current_phase,
                "error_message": project.error_message,
            }

    async def cancel_generation(self, project_id: uuid.UUID) -> bool:
        async with async_session_factory() as db:
            result = await db.execute(select(Project).where(Project.id == project_id))
            project = result.scalar_one_or_none()
            if not project:
                raise NotFoundException("Project not found")
            project.status = "draft"
            project.current_phase = None
            await db.commit()
            return True

    async def update_progress(self, project_id: str, progress: float, phase: str) -> None:
        async with async_session_factory() as db:
            result = await db.execute(select(Project).where(Project.id == uuid.UUID(project_id)))
            project = result.scalar_one_or_none()
            if project:
                project.progress = progress
                project.current_phase = phase
                await db.commit()

    async def complete_generation(self, project_id: str, video_url: str | None = None) -> None:
        async with async_session_factory() as db:
            result = await db.execute(select(Project).where(Project.id == uuid.UUID(project_id)))
            project = result.scalar_one_or_none()
            if project:
                project.status = "ready"
                project.progress = 100
                project.current_phase = "complete"
                if video_url:
                    project.metadata_["video_url"] = video_url
                await db.commit()
