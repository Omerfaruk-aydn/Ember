from fastapi import APIRouter

from app.api.v1 import auth, projects, scenes, users, brands, billing, assets, videos

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(scenes.router, prefix="/projects/{project_id}/scenes", tags=["scenes"])
api_router.include_router(brands.router, prefix="/brands", tags=["brands"])
api_router.include_router(billing.router, prefix="/billing", tags=["billing"])
api_router.include_router(assets.router, prefix="/assets", tags=["assets"])
api_router.include_router(videos.router, prefix="/videos", tags=["videos"])
