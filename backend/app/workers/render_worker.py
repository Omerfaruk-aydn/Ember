import asyncio
import logging
from app.workers.celery_app import celery_app

logger = logging.getLogger(__name__)


@celery_app.task(bind=True, name="app.workers.render_worker.generate_video", queue="render", time_limit=1800, soft_time_limit=1500)
def generate_video(self, project_id: str, user_id: str, prompt: str, settings: dict):
    from app.agents.orchestrator import VideoOrchestrator
    from app.services.video_service import VideoService

    orchestrator = VideoOrchestrator()
    video_service = VideoService()

    async def run():
        async def callback(phase, progress):
            await video_service.update_progress(project_id, progress, phase)
            self.update_state(state="PROGRESS", meta={"phase": phase, "progress": progress})

        result = await orchestrator.generate(project_id, user_id, prompt, settings, callback)

        if result.get("status") == "completed":
            await video_service.complete_generation(project_id)
        else:
            await video_service.update_progress(project_id, 0, "failed")

        return result

    return asyncio.run(run())
