import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import TimestampMixin, UUIDPrimaryKeyMixin


class RenderJob(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "render_jobs"
    __table_args__ = (
        Index("idx_render_jobs_project_id", "project_id"),
        Index("idx_render_jobs_user_id", "user_id"),
        Index("idx_render_jobs_status", "status"),
        Index("idx_render_jobs_priority", "priority", "created_at"),
    )

    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    status: Mapped[str] = mapped_column(String(50), default="queued")
    priority: Mapped[int] = mapped_column(Integer, default=0)

    worker_id: Mapped[str | None] = mapped_column(String(100))
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    progress: Mapped[float] = mapped_column(Numeric(5, 2), default=0)
    current_step: Mapped[str | None] = mapped_column(String(100))
    total_steps: Mapped[int | None] = mapped_column(Integer)
    completed_steps: Mapped[int] = mapped_column(Integer, default=0)

    output_url: Mapped[str | None] = mapped_column(Text)
    output_format: Mapped[str | None] = mapped_column(String(10))
    output_resolution: Mapped[str | None] = mapped_column(String(20))
    output_file_size_bytes: Mapped[int | None] = mapped_column()
    output_duration_ms: Mapped[int | None] = mapped_column(Integer)

    error_message: Mapped[str | None] = mapped_column(Text)
    error_stack: Mapped[str | None] = mapped_column(Text)
    retry_count: Mapped[int] = mapped_column(Integer, default=0)
    max_retries: Mapped[int] = mapped_column(Integer, default=3)

    queue_time_ms: Mapped[int | None] = mapped_column(Integer)
    process_time_ms: Mapped[int | None] = mapped_column(Integer)
    render_time_ms: Mapped[int | None] = mapped_column(Integer)
    encode_time_ms: Mapped[int | None] = mapped_column(Integer)
    upload_time_ms: Mapped[int | None] = mapped_column(Integer)
    total_time_ms: Mapped[int | None] = mapped_column(Integer)

    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict)

    project: Mapped["Project"] = relationship(back_populates="render_jobs")
