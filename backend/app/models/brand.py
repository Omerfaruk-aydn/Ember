import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import TimestampMixin, UUIDPrimaryKeyMixin


class BrandContext(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "brand_contexts"
    __table_args__ = (
        Index("idx_brand_contexts_user_id", "user_id"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    website_url: Mapped[str | None] = mapped_column(Text)

    primary_colors: Mapped[list] = mapped_column(ARRAY(String), default=list)
    secondary_colors: Mapped[list] = mapped_column(ARRAY(String), default=list)
    accent_colors: Mapped[list] = mapped_column(ARRAY(String), default=list)

    primary_font: Mapped[str | None] = mapped_column(String(100))
    secondary_font: Mapped[str | None] = mapped_column(String(100))

    style_keywords: Mapped[list] = mapped_column(ARRAY(String), default=list)
    mood: Mapped[str | None] = mapped_column(String(100))
    industry: Mapped[str | None] = mapped_column(String(100))

    logo_urls: Mapped[list] = mapped_column(ARRAY(String), default=list)
    reference_image_urls: Mapped[list] = mapped_column(ARRAY(String), default=list)

    visual_patterns: Mapped[dict] = mapped_column(JSONB, default=dict)
    status: Mapped[str] = mapped_column(String(50), default="active")
    last_scraped_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, default=dict)
