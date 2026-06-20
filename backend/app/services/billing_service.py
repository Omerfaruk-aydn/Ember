import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import BadRequestException, NotFoundException
from app.models.subscription import Subscription
from app.models.user import User
from app.db.session import async_session_factory

PLANS = {
    "free": {"name": "Free", "price_monthly": 0, "video_limit": 1, "max_duration": 30, "watermark": True},
    "pro": {"name": "Pro", "price_monthly": 2900, "video_limit": 10, "max_duration": 300, "watermark": False},
    "enterprise": {"name": "Enterprise", "price_monthly": 19900, "video_limit": -1, "max_duration": -1, "watermark": False},
}


class BillingService:
    async def get_subscription(self, user_id: uuid.UUID) -> dict | None:
        async with async_session_factory() as db:
            result = await db.execute(select(Subscription).where(Subscription.user_id == user_id).order_by(Subscription.created_at.desc()))
            sub = result.scalar_one_or_none()
            if not sub:
                return {"plan_id": "free", "status": "active", "plan": PLANS["free"]}
            plan = PLANS.get(sub.plan_id, PLANS["free"])
            return {"plan_id": sub.plan_id, "status": sub.status, "plan": plan, "subscription_id": str(sub.id)}

    async def check_usage(self, user_id: uuid.UUID) -> dict:
        async with async_session_factory() as db:
            from app.models.project import Project
            sub_result = await db.execute(select(Subscription).where(Subscription.user_id == user_id))
            sub = sub_result.scalar_one_or_none()
            plan_id = sub.plan_id if sub else "free"
            plan = PLANS.get(plan_id, PLANS["free"])

            count_result = await db.execute(
                select(Project).where(
                    Project.user_id == user_id,
                    Project.status == "ready",
                    Project.created_at >= datetime.now(timezone.utc).replace(day=1),
                )
            )
            usage_count = len(count_result.scalars().all())
            limit = plan["video_limit"]

            return {
                "plan": plan_id,
                "usage": usage_count,
                "limit": limit,
                "remaining": max(0, limit - usage_count) if limit > 0 else -1,
                "can_generate": limit == -1 or usage_count < limit,
            }

    def get_plans(self) -> dict:
        return PLANS
