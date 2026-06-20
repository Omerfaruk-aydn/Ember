import asyncio
from app.db.base import Base
from app.db.session import engine
from app.models import User, UserOAuthAccount, UserSession, Project, Scene, BrandContext, Asset, Subscription, UsageRecord, Invoice, RenderJob

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("All tables created successfully!")

asyncio.run(create_tables())
