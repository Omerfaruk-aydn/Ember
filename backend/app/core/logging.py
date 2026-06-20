import logging
import json
import sys
from datetime import datetime, timezone
from typing import Any


class JSONFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }

        if hasattr(record, "request_id"):
            log_entry["request_id"] = record.request_id

        if record.exc_info and record.exc_info[0]:
            log_entry["exception"] = {
                "type": record.exc_info[0].__name__,
                "message": str(record.exc_info[1]),
                "traceback": self.formatException(record.exc_info),
            }

        for key in ["duration_ms", "status_code", "method", "path", "user_id", "project_id"]:
            if hasattr(record, key):
                log_entry[key] = getattr(record, key)

        return json.dumps(log_entry, default=str)


class RequestFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        if not hasattr(record, "request_id"):
            record.request_id = ""
        return True


def setup_logging(log_level: str = "INFO"):
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JSONFormatter())
    handler.addFilter(RequestFilter())

    root = logging.getLogger()
    root.handlers.clear()
    root.addHandler(handler)
    root.setLevel(getattr(logging, log_level.upper(), logging.INFO))

    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)


class StructuredLogger:
    def __init__(self, name: str):
        self.logger = logging.getLogger(name)

    def info(self, message: str, **kwargs):
        self.logger.info(message, extra=kwargs)

    def warning(self, message: str, **kwargs):
        self.logger.warning(message, extra=kwargs)

    def error(self, message: str, **kwargs):
        self.logger.error(message, extra=kwargs)

    def debug(self, message: str, **kwargs):
        self.logger.debug(message, extra=kwargs)

    def critical(self, message: str, **kwargs):
        self.logger.critical(message, extra=kwargs)

    def request(self, method: str, path: str, status_code: int, duration_ms: float, **kwargs):
        self.logger.info(
            f"{method} {path} {status_code} {duration_ms:.1f}ms",
            extra={"method": method, "path": path, "status_code": status_code, "duration_ms": duration_ms, **kwargs},
        )

    def generation(self, project_id: str, phase: str, progress: float, **kwargs):
        self.logger.info(
            f"Generation {project_id}: {phase} ({progress:.0f}%)",
            extra={"project_id": project_id, "phase": phase, "progress": progress, **kwargs},
        )

    def auth(self, user_id: str, action: str, success: bool, **kwargs):
        level = logging.INFO if success else logging.WARNING
        self.logger.log(
            level,
            f"Auth {action}: {'success' if success else 'failed'}",
            extra={"user_id": user_id, "action": action, "success": success, **kwargs},
        )
