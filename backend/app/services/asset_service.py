import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundException
from app.models.asset import Asset
from app.db.session import async_session_factory


class AssetService:
    async def list_assets(self, user_id: uuid.UUID, asset_type: str | None = None) -> list[Asset]:
        async with async_session_factory() as db:
            query = select(Asset).where(Asset.user_id == user_id, Asset.deleted_at.is_(None))
            if asset_type:
                query = query.where(Asset.type == asset_type)
            result = await db.execute(query.order_by(Asset.created_at.desc()))
            return list(result.scalars().all())

    async def create(self, user_id: uuid.UUID, name: str, asset_type: str, storage_key: str, mime_type: str | None = None, file_size: int | None = None, cdn_url: str | None = None, project_id: uuid.UUID | None = None) -> Asset:
        async with async_session_factory() as db:
            asset = Asset(user_id=user_id, name=name, type=asset_type, storage_key=storage_key, mime_type=mime_type, file_size_bytes=file_size, cdn_url=cdn_url, project_id=project_id)
            db.add(asset)
            await db.commit()
            await db.refresh(asset)
            return asset

    async def get(self, asset_id: uuid.UUID, user_id: uuid.UUID) -> Asset:
        async with async_session_factory() as db:
            result = await db.execute(select(Asset).where(Asset.id == asset_id, Asset.user_id == user_id))
            asset = result.scalar_one_or_none()
            if not asset:
                raise NotFoundException("Asset not found")
            return asset

    async def delete(self, asset_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        from datetime import datetime, timezone
        async with async_session_factory() as db:
            result = await db.execute(select(Asset).where(Asset.id == asset_id, Asset.user_id == user_id))
            asset = result.scalar_one_or_none()
            if not asset:
                raise NotFoundException("Asset not found")
            asset.deleted_at = datetime.now(timezone.utc)
            await db.commit()
            return True
