import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundException
from app.deps import get_current_active_user, get_db
from app.models.user import User
from app.services.brand_service import BrandService

router = APIRouter()
brand_service = BrandService()


@router.get("")
async def list_brands(current_user: User = Depends(get_current_active_user)):
    brands = await brand_service.list_brands(current_user.id)
    return [{"id": str(b.id), "name": b.name, "website_url": b.website_url, "primary_colors": b.primary_colors, "status": b.status, "created_at": b.created_at.isoformat()} for b in brands]


@router.post("", status_code=201)
async def create_brand(body: dict, current_user: User = Depends(get_current_active_user)):
    brand = await brand_service.create(current_user.id, body["name"], body.get("website_url"), body.get("colors"))
    return {"id": str(brand.id), "name": brand.name, "status": brand.status}


@router.get("/{brand_id}")
async def get_brand(brand_id: uuid.UUID, current_user: User = Depends(get_current_active_user)):
    brand = await brand_service.get(brand_id, current_user.id)
    return {"id": str(brand.id), "name": brand.name, "website_url": brand.website_url, "primary_colors": brand.primary_colors, "style_keywords": brand.style_keywords, "mood": brand.mood, "industry": brand.industry}


@router.put("/{brand_id}")
async def update_brand(brand_id: uuid.UUID, body: dict, current_user: User = Depends(get_current_active_user)):
    brand = await brand_service.update(brand_id, current_user.id, **body)
    return {"id": str(brand.id), "name": brand.name}


@router.delete("/{brand_id}", status_code=204)
async def delete_brand(brand_id: uuid.UUID, current_user: User = Depends(get_current_active_user)):
    await brand_service.delete(brand_id, current_user.id)
