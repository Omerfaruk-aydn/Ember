import redis.asyncio as redis
import json
from app.config import get_settings

settings = get_settings()


class RedisClient:
    def __init__(self):
        self.redis = redis.from_url(settings.REDIS_URL, decode_responses=True)

    async def get(self, key: str) -> str | None:
        return await self.redis.get(key)

    async def set(self, key: str, value: str, ttl: int = 300) -> None:
        await self.redis.set(key, value, ex=ttl)

    async def delete(self, key: str) -> None:
        await self.redis.delete(key)

    async def publish(self, channel: str, message: dict) -> None:
        await self.redis.publish(channel, json.dumps(message))

    async def hset(self, name: str, key: str, value: str) -> None:
        await self.redis.hset(name, key, value)

    async def hgetall(self, name: str) -> dict:
        return await self.redis.hgetall(name)

    async def incr(self, key: str) -> int:
        return await self.redis.incr(key)

    async def expire(self, key: str, ttl: int) -> None:
        await self.redis.expire(key, ttl)

    async def close(self) -> None:
        await self.redis.close()
