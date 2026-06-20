import uuid
from datetime import datetime

from pydantic import BaseModel


class ProjectCreateRequest(BaseModel):
    name: str
    description: str | None = None
    prompt: str
    aspect_ratio: str = "16:9"
    duration_seconds: int = 30
    quality: str = "high"
    settings: dict = {}
    tags: list[str] = []


class ProjectUpdateRequest(BaseModel):
    name: str | None = None
    description: str | None = None
    prompt: str | None = None
    aspect_ratio: str | None = None
    duration_seconds: int | None = None
    quality: str | None = None
    settings: dict | None = None
    tags: list[str] | None = None


class ProjectResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str | None
    prompt: str
    aspect_ratio: str
    duration_seconds: int
    status: str
    progress: float
    quality: str
    output_format: str
    version: int
    tags: list[str]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProjectListResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str | None
    status: str
    progress: float
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
