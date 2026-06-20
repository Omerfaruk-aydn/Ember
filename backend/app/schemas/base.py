from datetime import datetime
from typing import Any, Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class ResponseBase(BaseModel, Generic[T]):
    success: bool = True
    data: T
    request_id: str | None = None
    timestamp: datetime | None = None


class PaginatedResponse(BaseModel, Generic[T]):
    success: bool = True
    data: list[T]
    meta: "PaginationMeta"
    request_id: str | None = None
    timestamp: datetime | None = None


class PaginationMeta(BaseModel):
    page: int
    limit: int
    total: int
    has_more: bool


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: dict[str, Any] | None = None
    field: str | None = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail
    request_id: str | None = None
    timestamp: datetime | None = None
