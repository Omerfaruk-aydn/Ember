import uuid
from fastapi import APIRouter, Depends, UploadFile, File
from app.deps import get_current_active_user
from app.models.user import User
from app.services.asset_service import AssetService

router = APIRouter()
asset_service = AssetService()


@router.get("")
async def list_assets(asset_type: str | None = None, current_user: User = Depends(get_current_active_user)):
    assets = await asset_service.list(current_user.id, asset_type)
    return [{"id": str(a.id), "name": a.name, "type": a.type, "cdn_url": a.cdn_url, "mime_type": a.mime_type, "file_size_bytes": a.file_size_bytes, "created_at": a.created_at.isoformat()} for a in assets]


@router.post("/upload", status_code=201)
async def upload_asset(name: str = "", asset_type: str = "image", file: UploadFile = File(...), current_user: User = Depends(get_current_active_user)):
    content = await file.read()
    storage_key = f"assets/{current_user.id}/{file.filename}"
    from app.integrations.s3 import S3Client
    s3 = S3Client()
    cdn_url = await s3.upload_bytes(content, storage_key, file.content_type)
    asset = await asset_service.create(current_user.id, name or file.filename, asset_type, storage_key, file.content_type, len(content), cdn_url)
    return {"id": str(asset.id), "name": asset.name, "cdn_url": asset.cdn_url}


@router.delete("/{asset_id}", status_code=204)
async def delete_asset(asset_id: uuid.UUID, current_user: User = Depends(get_current_active_user)):
    await asset_service.delete(asset_id, current_user.id)
