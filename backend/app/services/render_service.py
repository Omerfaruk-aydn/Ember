import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundException
from app.models.render_job import RenderJob
from app.db.session import async_session_factory


class RenderService:
    async def start_render(self, project_id: uuid.UUID, user_id: uuid.UUID, output_format: str = "mp4") -> RenderJob:
        async with async_session_factory() as db:
            job = RenderJob(project_id=project_id, user_id=user_id, status="queued", output_format=output_format)
            db.add(job)
            await db.commit()
            await db.refresh(job)
            return job

    async def get_status(self, job_id: uuid.UUID) -> dict:
        async with async_session_factory() as db:
            result = await db.execute(select(RenderJob).where(RenderJob.id == job_id))
            job = result.scalar_one_or_none()
            if not job:
                raise NotFoundException("Render job not found")
            return {
                "job_id": str(job.id),
                "status": job.status,
                "progress": float(job.progress or 0),
                "output_url": job.output_url,
                "error_message": job.error_message,
            }

    async def update_job(self, job_id: str, **kwargs) -> None:
        async with async_session_factory() as db:
            result = await db.execute(select(RenderJob).where(RenderJob.id == uuid.UUID(job_id)))
            job = result.scalar_one_or_none()
            if job:
                for key, value in kwargs.items():
                    setattr(job, key, value)
                await db.commit()
