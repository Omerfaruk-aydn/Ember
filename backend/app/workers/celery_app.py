from celery import Celery
from celery.schedules import crontab

from app.config import get_settings

settings = get_settings()

celery_app = Celery(
    "motion_clone",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL.replace("/0", "/1"),
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_routes={
        "app.workers.render_worker.*": {"queue": "render"},
        "app.workers.export_worker.*": {"queue": "export"},
    },
    beat_schedule={
        "cleanup-expired-assets": {
            "task": "app.workers.cleanup_worker.cleanup_expired_assets",
            "schedule": crontab(hour=2, minute=0),
        },
    },
)
