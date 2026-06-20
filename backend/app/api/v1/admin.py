import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ForbiddenException
from app.core.permissions import Permission, PermissionChecker
from app.deps import get_current_active_user, get_db
from app.models.user import User
from app.models.project import Project
from app.models.render_job import RenderJob
from app.models.subscription import Subscription

router = APIRouter()


async def require_admin(current_user: User = Depends(get_current_active_user)):
    if not hasattr(current_user, "role") or current_user.role != "admin":
        raise ForbiddenException("Admin access required")
    return current_user


@router.get("/dashboard/stats")
async def dashboard_stats(admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    user_count = (await db.execute(select(func.count(User.id)))).scalar() or 0
    project_count = (await db.execute(select(func.count(Project.id)))).scalar() or 0
    active_projects = (await db.execute(select(func.count(Project.id)).where(Project.status == "generating"))).scalar() or 0
    completed_projects = (await db.execute(select(func.count(Project.id)).where(Project.status == "ready"))).scalar() or 0
    failed_projects = (await db.execute(select(func.count(Project.id)).where(Project.status == "failed"))).scalar() or 0
    render_jobs = (await db.execute(select(func.count(RenderJob.id)))).scalar() or 0

    return {
        "users": {"total": user_count},
        "projects": {"total": project_count, "active": active_projects, "completed": completed_projects, "failed": failed_projects},
        "render_jobs": {"total": render_jobs},
    }


@router.get("/users")
async def list_users(page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100), admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    offset = (page - 1) * limit
    result = await db.execute(select(User).where(User.deleted_at.is_(None)).order_by(User.created_at.desc()).offset(offset).limit(limit))
    users = result.scalars().all()
    total = (await db.execute(select(func.count(User.id)).where(User.deleted_at.is_(None)))).scalar() or 0
    return {
        "data": [{"id": str(u.id), "email": u.email, "full_name": u.full_name, "created_at": u.created_at.isoformat()} for u in users],
        "meta": {"page": page, "limit": limit, "total": total, "has_more": offset + limit < total},
    }


@router.get("/users/{user_id}")
async def get_user(user_id: uuid.UUID, admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("User not found")
    return {"id": str(user.id), "email": user.email, "full_name": user.full_name, "created_at": user.created_at.isoformat()}


@router.put("/users/{user_id}")
async def update_user(user_id: uuid.UUID, body: dict, admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("User not found")
    for key, value in body.items():
        if hasattr(user, key) and key not in ("id", "created_at", "password_hash"):
            setattr(user, key, value)
    await db.commit()
    return {"id": str(user.id), "email": user.email, "full_name": user.full_name}


@router.delete("/users/{user_id}")
async def delete_user(user_id: uuid.UUID, admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("User not found")
    user.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"message": "User deleted"}


@router.get("/projects")
async def list_all_projects(page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100), admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    offset = (page - 1) * limit
    result = await db.execute(select(Project).where(Project.deleted_at.is_(None)).order_by(Project.created_at.desc()).offset(offset).limit(limit))
    projects = result.scalars().all()
    total = (await db.execute(select(func.count(Project.id)).where(Project.deleted_at.is_(None)))).scalar() or 0
    return {
        "data": [{"id": str(p.id), "name": p.name, "status": p.status, "user_id": str(p.user_id), "created_at": p.created_at.isoformat()} for p in projects],
        "meta": {"page": page, "limit": limit, "total": total, "has_more": offset + limit < total},
    }


@router.get("/render-jobs")
async def list_render_jobs(page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100), status: str | None = None, admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    offset = (page - 1) * limit
    query = select(RenderJob)
    if status:
        query = query.where(RenderJob.status == status)
    result = await db.execute(query.order_by(RenderJob.created_at.desc()).offset(offset).limit(limit))
    jobs = result.scalars().all()
    return {
        "data": [{"id": str(j.id), "project_id": str(j.project_id), "status": j.status, "progress": float(j.progress or 0), "created_at": j.created_at.isoformat()} for j in jobs],
    }


@router.get("/render-jobs/{job_id}")
async def get_render_job(job_id: uuid.UUID, admin: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RenderJob).where(RenderJob.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("Render job not found")
    return {"id": str(job.id), "project_id": str(job.project_id), "status": job.status, "progress": float(job.progress or 0), "error_message": job.error_message, "output_url": job.output_url}


@router.get("/system/health")
async def system_health(admin: User = Depends(require_admin)):
    from app.core.circuit_breaker import CircuitBreakerRegistry
    return {"status": "healthy", "circuit_breakers": CircuitBreakerRegistry.get_all_stats()}
