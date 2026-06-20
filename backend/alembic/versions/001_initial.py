"""initial migration

Revision ID: 001_initial
Revises:
Create Date: 2026-06-20

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY, INET

revision: str = "001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    op.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    op.create_table(
        "users",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v4()")),
        sa.Column("email", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("email_verified", sa.Boolean, default=False),
        sa.Column("password_hash", sa.String(255), nullable=True),
        sa.Column("full_name", sa.String(255)),
        sa.Column("avatar_url", sa.Text),
        sa.Column("locale", sa.String(10), default="en"),
        sa.Column("timezone", sa.String(50), default="UTC"),
        sa.Column("metadata", JSONB, default={}),
        sa.Column("last_login_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("deleted_at", sa.DateTime(timezone=True)),
    )

    op.create_table(
        "projects",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v4()")),
        sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("description", sa.Text),
        sa.Column("prompt", sa.Text, nullable=False),
        sa.Column("aspect_ratio", sa.String(10), default="16:9"),
        sa.Column("duration_seconds", sa.Integer, default=30),
        sa.Column("status", sa.String(50), default="draft", index=True),
        sa.Column("brand_context_id", UUID(as_uuid=True)),
        sa.Column("settings", JSONB, default={}),
        sa.Column("quality", sa.String(20), default="high"),
        sa.Column("output_format", sa.String(10), default="mp4"),
        sa.Column("output_fps", sa.Integer, default=30),
        sa.Column("output_bitrate", sa.String(20), default="8M"),
        sa.Column("progress", sa.Numeric(5, 2), default=0),
        sa.Column("current_phase", sa.String(50)),
        sa.Column("error_message", sa.Text),
        sa.Column("generation_time_ms", sa.Integer),
        sa.Column("render_time_ms", sa.Integer),
        sa.Column("file_size_bytes", sa.BigInteger),
        sa.Column("version", sa.Integer, default=1),
        sa.Column("tags", ARRAY(sa.String), default=[]),
        sa.Column("metadata", JSONB, default={}),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), index=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("deleted_at", sa.DateTime(timezone=True)),
    )

    op.create_table(
        "scenes",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v4()")),
        sa.Column("project_id", UUID(as_uuid=True), sa.ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("order_index", sa.Integer, nullable=False),
        sa.Column("start_time_ms", sa.Integer, nullable=False),
        sa.Column("duration_ms", sa.Integer, nullable=False),
        sa.Column("title", sa.String(255)),
        sa.Column("description", sa.Text),
        sa.Column("voiceover_text", sa.Text),
        sa.Column("image_prompt", sa.Text),
        sa.Column("image_url", sa.Text),
        sa.Column("image_seed", sa.Integer),
        sa.Column("image_model", sa.String(50)),
        sa.Column("motion_type", sa.String(50), default="fade"),
        sa.Column("animation_duration_ms", sa.Integer, default=500),
        sa.Column("animation_easing", sa.String(50), default="easeInOut"),
        sa.Column("voiceover_url", sa.Text),
        sa.Column("voiceover_duration_ms", sa.Integer),
        sa.Column("voiceover_voice_id", sa.String(100)),
        sa.Column("background_music_volume", sa.Numeric(3, 2), default=0.3),
        sa.Column("effects", JSONB, default=[]),
        sa.Column("text_overlays", JSONB, default=[]),
        sa.Column("transition_in", sa.String(50), default="fade"),
        sa.Column("transition_out", sa.String(50), default="fade"),
        sa.Column("transition_duration_ms", sa.Integer, default=300),
        sa.Column("status", sa.String(50), default="pending", index=True),
        sa.Column("quality_score", sa.Numeric(3, 2)),
        sa.Column("quality_feedback", sa.Text),
        sa.Column("metadata", JSONB, default={}),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint("project_id", "order_index", name="uq_scenes_project_order"),
    )

    op.create_table(
        "brand_contexts",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v4()")),
        sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("website_url", sa.Text),
        sa.Column("primary_colors", ARRAY(sa.String), default=[]),
        sa.Column("secondary_colors", ARRAY(sa.String), default=[]),
        sa.Column("accent_colors", ARRAY(sa.String), default=[]),
        sa.Column("primary_font", sa.String(100)),
        sa.Column("secondary_font", sa.String(100)),
        sa.Column("style_keywords", ARRAY(sa.String), default=[]),
        sa.Column("mood", sa.String(100)),
        sa.Column("industry", sa.String(100)),
        sa.Column("logo_urls", ARRAY(sa.String), default=[]),
        sa.Column("reference_image_urls", ARRAY(sa.String), default=[]),
        sa.Column("visual_patterns", JSONB, default={}),
        sa.Column("status", sa.String(50), default="active"),
        sa.Column("last_scraped_at", sa.DateTime(timezone=True)),
        sa.Column("metadata", JSONB, default={}),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "assets",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v4()")),
        sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("project_id", UUID(as_uuid=True), sa.ForeignKey("projects.id", ondelete="SET NULL"), index=True),
        sa.Column("scene_id", UUID(as_uuid=True), sa.ForeignKey("scenes.id", ondelete="SET NULL"), index=True),
        sa.Column("type", sa.String(50), nullable=False, index=True),
        sa.Column("name", sa.String(255)),
        sa.Column("description", sa.Text),
        sa.Column("storage_provider", sa.String(50), default="s3"),
        sa.Column("storage_bucket", sa.String(255)),
        sa.Column("storage_key", sa.Text, nullable=False),
        sa.Column("cdn_url", sa.Text),
        sa.Column("mime_type", sa.String(100)),
        sa.Column("file_size_bytes", sa.BigInteger),
        sa.Column("duration_ms", sa.Integer),
        sa.Column("generator", sa.String(50)),
        sa.Column("generation_prompt", sa.Text),
        sa.Column("generation_params", JSONB, default={}),
        sa.Column("generation_seed", sa.Integer),
        sa.Column("generation_model", sa.String(100)),
        sa.Column("generation_time_ms", sa.Integer),
        sa.Column("processed", sa.Boolean, default=False),
        sa.Column("usage_count", sa.Integer, default=0),
        sa.Column("last_used_at", sa.DateTime(timezone=True)),
        sa.Column("expires_at", sa.DateTime(timezone=True)),
        sa.Column("is_favorite", sa.Boolean, default=False),
        sa.Column("metadata", JSONB, default={}),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("deleted_at", sa.DateTime(timezone=True)),
    )

    op.create_table(
        "subscriptions",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v4()")),
        sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("stripe_customer_id", sa.String(255), index=True),
        sa.Column("stripe_subscription_id", sa.String(255)),
        sa.Column("plan_id", sa.String(50), nullable=False),
        sa.Column("status", sa.String(50), nullable=False, default="active", index=True),
        sa.Column("current_period_start", sa.DateTime(timezone=True)),
        sa.Column("current_period_end", sa.DateTime(timezone=True)),
        sa.Column("cancel_at_period_end", sa.Boolean, default=False),
        sa.Column("trial_start", sa.DateTime(timezone=True)),
        sa.Column("trial_end", sa.DateTime(timezone=True)),
        sa.Column("metadata", JSONB, default={}),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "render_jobs",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("uuid_generate_v4()")),
        sa.Column("project_id", UUID(as_uuid=True), sa.ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True),
        sa.Column("status", sa.String(50), default="queued", index=True),
        sa.Column("priority", sa.Integer, default=0),
        sa.Column("worker_id", sa.String(100)),
        sa.Column("started_at", sa.DateTime(timezone=True)),
        sa.Column("completed_at", sa.DateTime(timezone=True)),
        sa.Column("progress", sa.Numeric(5, 2), default=0),
        sa.Column("current_step", sa.String(100)),
        sa.Column("total_steps", sa.Integer),
        sa.Column("completed_steps", sa.Integer, default=0),
        sa.Column("output_url", sa.Text),
        sa.Column("output_format", sa.String(10)),
        sa.Column("output_resolution", sa.String(20)),
        sa.Column("output_file_size_bytes", sa.BigInteger),
        sa.Column("output_duration_ms", sa.Integer),
        sa.Column("error_message", sa.Text),
        sa.Column("error_stack", sa.Text),
        sa.Column("retry_count", sa.Integer, default=0),
        sa.Column("max_retries", sa.Integer, default=3),
        sa.Column("queue_time_ms", sa.Integer),
        sa.Column("process_time_ms", sa.Integer),
        sa.Column("render_time_ms", sa.Integer),
        sa.Column("encode_time_ms", sa.Integer),
        sa.Column("upload_time_ms", sa.Integer),
        sa.Column("total_time_ms", sa.Integer),
        sa.Column("metadata", JSONB, default={}),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("render_jobs")
    op.drop_table("subscriptions")
    op.drop_table("assets")
    op.drop_table("brand_contexts")
    op.drop_table("scenes")
    op.drop_table("projects")
    op.drop_table("users")
