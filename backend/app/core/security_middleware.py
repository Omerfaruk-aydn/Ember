import hashlib
import time
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "font-src 'self' data:; "
            "connect-src 'self' https://api.anthropic.com https://api.elevenlabs.io https://api.replicate.com; "
            "media-src 'self' https:; "
            "frame-ancestors 'none';"
        )
        return response


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, redis_client=None):
        super().__init__(app)
        self.redis = redis_client
        self.memory_store: dict[str, tuple[int, float]] = {}

    async def dispatch(self, request: Request, call_next):
        client_id = self._get_client_id(request)
        path = request.url.path

        limits = {
            "/api/v1/auth/": 10,
            "/api/v1/videos/generate": 5,
            "/api/v1/assets/upload": 20,
            "/api/v1/": 100,
        }

        limit = 100
        for prefix, l in limits.items():
            if path.startswith(prefix):
                limit = l
                break

        key = f"ratelimit:{client_id}:{path.split('/')[3] if len(path.split('/')) > 3 else 'default'}"

        is_allowed = await self._check_rate_limit(key, limit)
        if not is_allowed:
            return Response(
                content='{"success":false,"error":{"code":"SYS_9003","message":"Rate limit exceeded. Please slow down."}}',
                status_code=429,
                media_type="application/json",
                headers={"Retry-After": "60"},
            )

        response = await call_next(request)
        remaining = await self._get_remaining(key, limit)
        response.headers["X-RateLimit-Limit"] = str(limit)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        response.headers["X-RateLimit-Reset"] = str(int(time.time()) + 60)
        return response

    def _get_client_id(self, request: Request) -> str:
        api_key = request.headers.get("X-API-Key")
        if api_key:
            return hashlib.sha256(api_key.encode()).hexdigest()[:16]
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"

    async def _check_rate_limit(self, key: str, limit: int) -> bool:
        if self.redis:
            try:
                current = await self.redis.incr(key)
                if current == 1:
                    await self.redis.expire(key, 60)
                return current <= limit
            except Exception:
                pass

        now = time.time()
        if key in self.memory_store:
            count, window_start = self.memory_store[key]
            if now - window_start > 60:
                self.memory_store[key] = (1, now)
                return True
            self.memory_store[key] = (count + 1, window_start)
            return count + 1 <= limit
        self.memory_store[key] = (1, now)
        return True

    async def _get_remaining(self, key: str, limit: int) -> int:
        if self.redis:
            try:
                current = await self.redis.get(key)
                return max(0, limit - int(current or 0))
            except Exception:
                pass
        if key in self.memory_store:
            count, _ = self.memory_store[key]
            return max(0, limit - count)
        return limit


class InputSanitizationMiddleware(BaseHTTPMiddleware):
    DANGEROUS_PATTERNS = [
        "<script", "</script>", "javascript:", "onerror=", "onload=",
        "onclick=", "onmouseover=", "eval(", "document.cookie",
        "document.domain", "innerHTML", "outerHTML",
    ]

    async def dispatch(self, request: Request, call_next):
        return await call_next(request)

    @classmethod
    def sanitize_string(cls, value: str) -> str:
        value_lower = value.lower()
        for pattern in cls.DANGEROUS_PATTERNS:
            if pattern in value_lower:
                raise ValueError(f"Potentially dangerous input detected: {pattern}")
        return value.strip()

    @classmethod
    def sanitize_dict(cls, data: dict) -> dict:
        sanitized = {}
        for key, value in data.items():
            if isinstance(value, str):
                sanitized[key] = cls.sanitize_string(value)
            elif isinstance(value, dict):
                sanitized[key] = cls.sanitize_dict(value)
            elif isinstance(value, list):
                sanitized[key] = [
                    cls.sanitize_string(v) if isinstance(v, str)
                    else cls.sanitize_dict(v) if isinstance(v, dict)
                    else v
                    for v in value
                ]
            else:
                sanitized[key] = value
        return sanitized
