import uuid
from datetime import datetime

from pydantic import BaseModel


class SceneCreateRequest(BaseModel):
    title: str | None = None
    description: str | None = None
    voiceover_text: str | None = None
    image_prompt: str | None = None
    duration_ms: int = 5000
    motion_type: str = "fade"
    animation_duration_ms: int = 500
    transition_in: str = "fade"
    transition_out: str = "fade"
    transition_duration_ms: int = 300
    effects: list[dict] = []
    text_overlays: list[dict] = []


class SceneUpdateRequest(BaseModel):
    title: str | None = None
    description: str | None = None
    voiceover_text: str | None = None
    image_prompt: str | None = None
    duration_ms: int | None = None
    motion_type: str | None = None
    animation_duration_ms: int | None = None
    transition_in: str | None = None
    transition_out: str | None = None
    transition_duration_ms: int | None = None
    effects: list[dict] | None = None
    text_overlays: list[dict] | None = None


class SceneResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    order_index: int
    start_time_ms: int
    duration_ms: int
    title: str | None
    description: str | None
    voiceover_text: str | None
    image_prompt: str | None
    image_url: str | None
    motion_type: str
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
