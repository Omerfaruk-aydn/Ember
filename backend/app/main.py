from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.api.websocket.editor import router as ws_router
from app.config import get_settings
from app.core.middleware import RequestIDMiddleware
from app.core.security_middleware import SecurityHeadersMiddleware, RateLimitMiddleware, InputSanitizationMiddleware
from app.core.errors import ErrorCode, ERROR_MESSAGES
from app.core.exceptions import AppException

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    docs_url=f"{settings.API_V1_PREFIX}/docs",
    redoc_url=f"{settings.API_V1_PREFIX}/redoc",
    lifespan=lifespan,
)


@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": getattr(exc, "error_code", ErrorCode.SYSTEM_INTERNAL_ERROR),
                "message": exc.detail,
            },
            "request_id": getattr(request.state, "request_id", None),
        },
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": ErrorCode.SYSTEM_INTERNAL_ERROR,
                "message": "An internal error occurred",
            },
            "request_id": getattr(request.state, "request_id", None),
        },
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(InputSanitizationMiddleware)
app.add_middleware(RequestIDMiddleware)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)
app.include_router(ws_router)


@app.get("/health")
async def health_check():
    return {"status": "ok", "version": settings.VERSION}


@app.get("/ready")
async def readiness_check():
    return {"status": "ready", "version": settings.VERSION}
