import uuid
from datetime import datetime, timezone
from typing import Any
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import async_session_factory


class GDPRService:
    async def export_user_data(self, user_id: uuid.UUID) -> dict[str, Any]:
        async with async_session_factory() as db:
            from app.models.user import User
            from app.models.project import Project
            from app.models.brand import BrandContext
            from app.models.asset import Asset

            user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
            if not user:
                return {"error": "User not found"}

            projects = (await db.execute(select(Project).where(Project.user_id == user_id))).scalars().all()
            brands = (await db.execute(select(BrandContext).where(BrandContext.user_id == user_id))).scalars().all()
            assets = (await db.execute(select(Asset).where(Asset.user_id == user_id))).scalars().all()

            return {
                "user": {
                    "id": str(user.id),
                    "email": user.email,
                    "full_name": user.full_name,
                    "created_at": user.created_at.isoformat() if user.created_at else None,
                    "locale": user.locale,
                    "timezone": user.timezone,
                },
                "projects": [
                    {"id": str(p.id), "name": p.name, "prompt": p.prompt, "status": p.status, "created_at": p.created_at.isoformat() if p.created_at else None}
                    for p in projects
                ],
                "brands": [
                    {"id": str(b.id), "name": b.name, "website_url": b.website_url, "primary_colors": b.primary_colors}
                    for b in brands
                ],
                "assets": [
                    {"id": str(a.id), "name": a.name, "type": a.type, "created_at": a.created_at.isoformat() if a.created_at else None}
                    for a in assets
                ],
                "export_date": datetime.now(timezone.utc).isoformat(),
                "retention_info": self.get_retention_info(),
            }

    async def delete_user_data(self, user_id: uuid.UUID) -> dict[str, Any]:
        async with async_session_factory() as db:
            from app.models.user import User
            from app.models.project import Project
            from app.models.brand import BrandContext
            from app.models.asset import Asset

            user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
            if not user:
                return {"error": "User not found"}

            anonymized_email = f"deleted_{str(user_id)[:8]}@anonymized.local"
            user.email = anonymized_email
            user.full_name = "Deleted User"
            user.avatar_url = None
            user.password_hash = None
            user.metadata_ = {}
            user.deleted_at = datetime.now(timezone.utc)

            projects = (await db.execute(select(Project).where(Project.user_id == user_id))).scalars().all()
            for p in projects:
                p.name = "Deleted Project"
                p.prompt = ""
                p.description = None
                p.metadata_ = {}
                p.tags = []
                p.deleted_at = datetime.now(timezone.utc)

            brands = (await db.execute(select(BrandContext).where(BrandContext.user_id == user_id))).scalars().all()
            for b in brands:
                await db.delete(b)

            assets = (await db.execute(select(Asset).where(Asset.user_id == user_id))).scalars().all()
            for a in assets:
                a.deleted_at = datetime.now(timezone.utc)
                a.name = "deleted"

            await db.commit()

            return {
                "message": "User data anonymized and deleted",
                "anonymized_email": anonymized_email,
                "projects_anonymized": len(projects),
                "brands_deleted": len(brands),
                "assets_anonymized": len(assets),
                "deletion_date": datetime.now(timezone.utc).isoformat(),
            }

    async def get_data_retention_info(self) -> dict[str, Any]:
        return {
            "retention_period": "3 years from account creation",
            "anonymization_period": "Immediate upon deletion request",
            "backup_retention": "90 days",
            "log_retention": "1 year",
            "legal_basis": "Contract performance (Art. 6(1)(b) GDPR)",
            "legitimate_interest": "Service improvement and fraud prevention (Art. 6(1)(f) GDPR)",
            "data_controller": "Motion AI Ltd.",
            "dpo_contact": "dpo@motion.ai",
            "right_to_access": True,
            "right_to_rectification": True,
            "right_to_erasure": True,
            "right_to_portability": True,
            "right_to_object": True,
            "right_to_restrict_processing": True,
        }

    async def record_consent(self, user_id: uuid.UUID, consent_type: str, granted: bool) -> dict:
        async with async_session_factory() as db:
            from app.models.user import User
            user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
            if user:
                consents = user.metadata_.get("consents", {})
                consents[consent_type] = {"granted": granted, "timestamp": datetime.now(timezone.utc).isoformat()}
                user.metadata_["consents"] = consents
                await db.commit()
            return {"consent_type": consent_type, "granted": granted, "timestamp": datetime.now(timezone.utc).isoformat()}

    async def get_consents(self, user_id: uuid.UUID) -> dict:
        async with async_session_factory() as db:
            from app.models.user import User
            user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
            if user:
                return user.metadata_.get("consents", {})
            return {}
