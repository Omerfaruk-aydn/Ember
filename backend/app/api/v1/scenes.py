import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundException
from app.deps import get_current_active_user, get_db
from app.models.project import Project
from app.models.scene import Scene
from app.models.user import User
from app.schemas.scene import SceneCreateRequest, SceneResponse, SceneUpdateRequest

router = APIRouter()


async def _get_project_or_404(
    project_id: uuid.UUID,
    user: User,
    db: AsyncSession,
) -> Project:
    result = await db.execute(
        select(Project).where(
            Project.id == project_id,
            Project.user_id == user.id,
            Project.deleted_at.is_(None),
        )
    )
    project = result.scalar_one_or_none()
    if project is None:
        raise NotFoundException("Project not found")
    return project


@router.get("", response_model=list[SceneResponse])
async def list_scenes(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    await _get_project_or_404(project_id, current_user, db)
    result = await db.execute(
        select(Scene)
        .where(Scene.project_id == project_id)
        .order_by(Scene.order_index)
    )
    return result.scalars().all()


@router.post("", response_model=SceneResponse, status_code=201)
async def create_scene(
    project_id: uuid.UUID,
    body: SceneCreateRequest,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    project = await _get_project_or_404(project_id, current_user, db)

    result = await db.execute(
        select(Scene).where(Scene.project_id == project_id)
    )
    existing_scenes = result.scalars().all()
    next_order = max((s.order_index for s in existing_scenes), default=-1) + 1

    last_end = max((s.start_time_ms + s.duration_ms for s in existing_scenes), default=0)

    scene = Scene(
        project_id=project_id,
        order_index=next_order,
        start_time_ms=last_end,
        duration_ms=body.duration_ms,
        title=body.title,
        description=body.description,
        voiceover_text=body.voiceover_text,
        image_prompt=body.image_prompt,
        motion_type=body.motion_type,
        animation_duration_ms=body.animation_duration_ms,
        transition_in=body.transition_in,
        transition_out=body.transition_out,
        transition_duration_ms=body.transition_duration_ms,
        effects=body.effects,
        text_overlays=body.text_overlays,
    )
    db.add(scene)
    await db.flush()
    await db.refresh(scene)
    return scene


@router.get("/{scene_id}", response_model=SceneResponse)
async def get_scene(
    project_id: uuid.UUID,
    scene_id: uuid.UUID,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    await _get_project_or_404(project_id, current_user, db)
    result = await db.execute(
        select(Scene).where(Scene.id == scene_id, Scene.project_id == project_id)
    )
    scene = result.scalar_one_or_none()
    if scene is None:
        raise NotFoundException("Scene not found")
    return scene


@router.put("/{scene_id}", response_model=SceneResponse)
async def update_scene(
    project_id: uuid.UUID,
    scene_id: uuid.UUID,
    body: SceneUpdateRequest,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    await _get_project_or_404(project_id, current_user, db)
    result = await db.execute(
        select(Scene).where(Scene.id == scene_id, Scene.project_id == project_id)
    )
    scene = result.scalar_one_or_none()
    if scene is None:
        raise NotFoundException("Scene not found")

    update_data = body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(scene, field, value)

    await db.flush()
    await db.refresh(scene)
    return scene


@router.delete("/{scene_id}", status_code=204)
async def delete_scene(
    project_id: uuid.UUID,
    scene_id: uuid.UUID,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    await _get_project_or_404(project_id, current_user, db)
    result = await db.execute(
        select(Scene).where(Scene.id == scene_id, Scene.project_id == project_id)
    )
    scene = result.scalar_one_or_none()
    if scene is None:
        raise NotFoundException("Scene not found")

    await db.delete(scene)
    await db.flush()
