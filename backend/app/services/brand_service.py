import uuid
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundException
from app.models.brand import BrandContext
from app.db.session import async_session_factory


class BrandService:
    async def list_brands(self, user_id: uuid.UUID) -> list[BrandContext]:
        async with async_session_factory() as db:
            result = await db.execute(select(BrandContext).where(BrandContext.user_id == user_id).order_by(BrandContext.created_at.desc()))
            return list(result.scalars().all())

    async def create(self, user_id: uuid.UUID, name: str, website_url: Optional[str] = None, colors: Optional[list[str]] = None) -> BrandContext:
        async with async_session_factory() as db:
            brand = BrandContext(user_id=user_id, name=name, website_url=website_url, primary_colors=colors or [])
            db.add(brand)
            await db.commit()
            await db.refresh(brand)
            return brand

    async def get(self, brand_id: uuid.UUID, user_id: uuid.UUID) -> BrandContext:
        async with async_session_factory() as db:
            result = await db.execute(select(BrandContext).where(BrandContext.id == brand_id, BrandContext.user_id == user_id))
            brand = result.scalar_one_or_none()
            if not brand:
                raise NotFoundException("Brand not found")
            return brand

    async def update(self, brand_id: uuid.UUID, user_id: uuid.UUID, **kwargs) -> BrandContext:
        async with async_session_factory() as db:
            result = await db.execute(select(BrandContext).where(BrandContext.id == brand_id, BrandContext.user_id == user_id))
            brand = result.scalar_one_or_none()
            if not brand:
                raise NotFoundException("Brand not found")
            for key, value in kwargs.items():
                if value is not None:
                    setattr(brand, key, value)
            await db.commit()
            await db.refresh(brand)
            return brand

    async def delete(self, brand_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        async with async_session_factory() as db:
            result = await db.execute(select(BrandContext).where(BrandContext.id == brand_id, BrandContext.user_id == user_id))
            brand = result.scalar_one_or_none()
            if not brand:
                raise NotFoundException("Brand not found")
            await db.delete(brand)
            await db.commit()
            return True
