import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, Numeric, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import TimestampMixin, UUIDPrimaryKeyMixin


class Scene(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "scenes"
    __table_args__ = (
        Index("idx_scenes_project_id", "project_id"),
        Index("idx_scenes_order", "project_id", "order_index"),
        Index("idx_scenes_status", "status"),
        UniqueConstraint("project_id", "order_index", name="uq_scenes_project_order"),
    )

    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    order_index: Mapped[int] = mapped_column(Integer, nullable=False)

    start_time_ms: Mapped[int] = mapped_column(Integer, nullable=False)
    duration_ms: Mapped[int] = mapped_column(Integer, nullable=False)

    title: Mapped[str | None] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    voiceover_text: Mapped[str | None] = mapped_column(Text)

    image_prompt: Mapped[str | None] = mapped_column(Text)
    image_url: Mapped[str | None] = mapped_column(Text)
    image_seed: Mapped[int | None] = mapped_column(Integer)
    image_model: Mapped[str | None] = mapped_column(String(50))

    motion_type: Mapped[str] = mapped_column(String(50), default="fade")
    animation_duration_ms: Mapped[int] = mapped_column(Integer, default=500)
    animation_easing: Mapped[str] = mapped_column(String(50), default="easeInOut")

    voiceover_url: Mapped[str | None] = mapped_column(Text)
    voiceover_duration_ms: Mapped[int | None] = mapped_column(Integer)
    voiceover_voice_id: Mapped[str | None] = mapped_column(String(100))
    background_music_volume: Mapped[float] = mapped_column(Numeric(3, 2), default=0.3)

    effects: Mapped[dict] = mapped_column(JSONB, default=list)
    text_overlays: Mapped[dict] = mapped_column(JSONB, default=list)

    transition_in: Mapped[str] = mapped_column(String(50), default="fade")
    transition_out: Mapped[str] = mapped_column(String(50), default="fade")
    transition_duration_ms: Mapped[int] = mapped_column(Integer, default=300)

    status: Mapped[str] = mapped_column(String(50), default="pending")
    quality_score: Mapped[float | None] = mapped_column(Numeric(3, 2))
    quality_feedback: Mapped[str | None] = mapped_column(Text)

    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict)

    project: Mapped["Project"] = relationship(back_populates="scenes")
