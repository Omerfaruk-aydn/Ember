import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Index, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.base import TimestampMixin, SoftDeleteMixin, UUIDPrimaryKeyMixin


class Asset(UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "assets"
    __table_args__ = (
        Index("idx_assets_user_id", "user_id"),
        Index("idx_assets_project_id", "project_id"),
        Index("idx_assets_scene_id", "scene_id"),
        Index("idx_assets_type", "type"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    project_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("projects.id", ondelete="SET NULL")
    )
    scene_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("scenes.id", ondelete="SET NULL")
    )

    type: Mapped[str] = mapped_column(String(50), nullable=False)
    name: Mapped[str | None] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)

    storage_provider: Mapped[str] = mapped_column(String(50), default="s3")
    storage_bucket: Mapped[str | None] = mapped_column(String(255))
    storage_key: Mapped[str] = mapped_column(Text, nullable=False)
    cdn_url: Mapped[str | None] = mapped_column(Text)

    mime_type: Mapped[str | None] = mapped_column(String(100))
    file_size_bytes: Mapped[int | None] = mapped_column()
    duration_ms: Mapped[int | None] = mapped_column(Integer)

    generator: Mapped[str | None] = mapped_column(String(50))
    generation_prompt: Mapped[str | None] = mapped_column(Text)
    generation_params: Mapped[dict] = mapped_column(JSONB, default=dict)
    generation_seed: Mapped[int | None] = mapped_column(Integer)
    generation_model: Mapped[str | None] = mapped_column(String(100))
    generation_time_ms: Mapped[int | None] = mapped_column(Integer)

    processed: Mapped[bool] = mapped_column(Boolean, default=False)
    usage_count: Mapped[int] = mapped_column(Integer, default=0)
    last_used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    is_favorite: Mapped[bool] = mapped_column(Boolean, default=False)

    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict)
