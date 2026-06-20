import json
import hashlib
import logging
from typing import Any, Optional, Callable
from functools import wraps

logger = logging.getLogger(__name__)


class CacheManager:
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis_url = redis_url
        self.redis = None
        self.default_ttl = 300
        self._memory_cache: dict[str, tuple[Any, float]] = {}

    async def _get_redis(self):
        if self.redis is None:
            try:
                import redis.asyncio as aioredis
                self.redis = aioredis.from_url(self.redis_url, decode_responses=True)
            except Exception:
                logger.warning("Redis not available, using memory cache")
                return None
        return self.redis

    async def get(self, key: str) -> Optional[Any]:
        r = await self._get_redis()
        if r:
            try:
                value = await r.get(key)
                if value:
                    return json.loads(value)
            except Exception:
                pass

        import time
        if key in self._memory_cache:
            value, expires = self._memory_cache[key]
            if time.time() < expires:
                return value
            del self._memory_cache[key]
        return None

    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        ttl = ttl or self.default_ttl
        serialized = json.dumps(value, default=str)

        r = await self._get_redis()
        if r:
            try:
                await r.setex(key, ttl, serialized)
                return
            except Exception:
                pass

        import time
        self._memory_cache[key] = (value, time.time() + ttl)

    async def delete(self, key: str) -> None:
        r = await self._get_redis()
        if r:
            try:
                await r.delete(key)
            except Exception:
                pass
        self._memory_cache.pop(key, None)

    async def invalidate_pattern(self, pattern: str) -> None:
        r = await self._get_redis()
        if r:
            try:
                keys = await r.keys(pattern)
                if keys:
                    await r.delete(*keys)
            except Exception:
                pass

        keys_to_delete = [k for k in self._memory_cache if pattern.replace("*", "") in k]
        for k in keys_to_delete:
            del self._memory_cache[k]

    async def increment(self, key: str, ttl: int = 60) -> int:
        r = await self._get_redis()
        if r:
            try:
                current = await r.incr(key)
                if current == 1:
                    await r.expire(key, ttl)
                return current
            except Exception:
                pass
        return 0

    def generate_key(self, prefix: str, **kwargs) -> str:
        sorted_params = sorted(kwargs.items())
        param_string = json.dumps(sorted_params, sort_keys=True, default=str)
        param_hash = hashlib.md5(param_string.encode()).hexdigest()
        return f"{prefix}:{param_hash}"

    async def close(self):
        if self.redis:
            await self.redis.close()


_cache_manager: Optional[CacheManager] = None


def get_cache_manager() -> CacheManager:
    global _cache_manager
    if _cache_manager is None:
        from app.config import get_settings
        settings = get_settings()
        _cache_manager = CacheManager(settings.REDIS_URL)
    return _cache_manager


def cached(ttl: int = 300, prefix: str = "cache"):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache = get_cache_manager()

            key_parts = {"func": func.__name__, "module": func.__module__}
            key_parts.update(kwargs)
            cache_key = cache.generate_key(prefix, **key_parts)

            cached_value = await cache.get(cache_key)
            if cached_value is not None:
                return cached_value

            result = await func(*args, **kwargs)

            if result is not None:
                await cache.set(cache_key, result, ttl)

            return result
        return wrapper
    return decorator


async def invalidate_project_cache(project_id: str) -> None:
    cache = get_cache_manager()
    await cache.delete(f"project:{project_id}")
    await cache.invalidate_pattern(f"project:{project_id}:*")
    await cache.invalidate_pattern("projects:list:*")


async def invalidate_brand_cache(brand_id: str, user_id: str) -> None:
    cache = get_cache_manager()
    await cache.delete(f"brand:{brand_id}")
    await cache.invalidate_pattern(f"brands:{user_id}:*")
