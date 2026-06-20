import time
from functools import wraps
from prometheus_client import Counter, Histogram, Gauge, Info, generate_latest, CONTENT_TYPE_LATEST
from fastapi import Request, Response


APP_INFO = Info("motion_app", "Application information")
APP_INFO.info({"version": "0.1.0", "name": "Motion Clone"})

REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP requests",
    ["method", "endpoint", "status_code"],
)

REQUEST_LATENCY = Histogram(
    "http_request_duration_seconds",
    "HTTP request latency in seconds",
    ["method", "endpoint"],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0],
)

VIDEO_GENERATION_COUNT = Counter(
    "video_generation_total",
    "Total video generations",
    ["status", "style"],
)

VIDEO_GENERATION_DURATION = Histogram(
    "video_generation_duration_seconds",
    "Video generation duration",
    ["style"],
    buckets=[10, 30, 60, 120, 180, 300, 600],
)

VIDEO_RENDER_COUNT = Counter(
    "video_render_total",
    "Total video renders",
    ["status", "format"],
)

VIDEO_RENDER_DURATION = Histogram(
    "video_render_duration_seconds",
    "Video render duration",
    ["format"],
    buckets=[10, 30, 60, 120, 180, 300],
)

QUEUE_SIZE = Gauge(
    "queue_size",
    "Queue size",
    ["queue_name"],
)

AI_API_CALLS = Counter(
    "ai_api_calls_total",
    "Total AI API calls",
    ["provider", "model", "status"],
)

AI_API_LATENCY = Histogram(
    "ai_api_latency_seconds",
    "AI API call latency",
    ["provider", "model"],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0],
)

STORAGE_OPERATIONS = Counter(
    "storage_operations_total",
    "Total storage operations",
    ["provider", "operation", "status"],
)

STORAGE_LATENCY = Histogram(
    "storage_operation_duration_seconds",
    "Storage operation latency",
    ["provider", "operation"],
    buckets=[0.01, 0.05, 0.1, 0.5, 1.0],
)

ACTIVE_USERS = Gauge(
    "active_users",
    "Number of active users",
)

SUBSCRIPTION_CHANGES = Counter(
    "subscription_changes_total",
    "Subscription changes",
    ["plan", "action"],
)

CIRCUIT_BREAKER_STATE = Gauge(
    "circuit_breaker_state",
    "Circuit breaker state (0=closed, 1=half_open, 2=open)",
    ["name"],
)


class MetricsMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)

        method = scope["method"]
        path = scope["path"]

        if path in ("/health", "/ready", "/metrics"):
            return await self.app(scope, receive, send)

        start_time = time.time()
        status_code = 500

        async def send_wrapper(message):
            nonlocal status_code
            if message["type"] == "http.response.start":
                status_code = message["status"]
            await send(message)

        try:
            await self.app(scope, receive, send_wrapper)
        finally:
            duration = time.time() - start_time
            endpoint = self._normalize_path(path)
            REQUEST_COUNT.labels(method=method, endpoint=endpoint, status_code=status_code).inc()
            REQUEST_LATENCY.labels(method=method, endpoint=endpoint).observe(duration)

    def _normalize_path(self, path: str) -> str:
        parts = path.strip("/").split("/")
        if len(parts) >= 3 and parts[0] == "api" and parts[1] == "v1":
            normalized = [parts[0], parts[1], parts[2]]
            for part in parts[3:]:
                if part.isdigit() or len(part) > 20:
                    normalized.append("{id}")
                else:
                    normalized.append(part)
            return "/" + "/".join(normalized)
        return path


def metrics_endpoint(request: Request) -> Response:
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)


def track_generation(style: str = "unknown"):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start = time.time()
            try:
                result = await func(*args, **kwargs)
                VIDEO_GENERATION_COUNT.labels(status="success", style=style).inc()
                return result
            except Exception:
                VIDEO_GENERATION_COUNT.labels(status="failed", style=style).inc()
                raise
            finally:
                duration = time.time() - start
                VIDEO_GENERATION_DURATION.labels(style=style).observe(duration)
        return wrapper
    return decorator
