import asyncio
import logging
from enum import Enum
from datetime import datetime, timedelta
from typing import Callable, Any, Optional

logger = logging.getLogger(__name__)


class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"


class CircuitBreaker:
    def __init__(
        self,
        name: str = "default",
        failure_threshold: int = 5,
        recovery_timeout: int = 60,
        expected_exception: type = Exception,
    ):
        self.name = name
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.expected_exception = expected_exception
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time: Optional[datetime] = None
        self.success_count = 0
        self.total_calls = 0

    async def call(self, func: Callable, *args, **kwargs) -> Any:
        self.total_calls += 1

        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
                logger.info(f"Circuit breaker '{self.name}' transitioning to HALF_OPEN")
            else:
                raise CircuitBreakerOpenError(
                    f"Circuit breaker '{self.name}' is OPEN. "
                    f"Retry after {self._time_until_reset():.0f}s"
                )

        try:
            if asyncio.iscoroutinefunction(func):
                result = await func(*args, **kwargs)
            else:
                result = func(*args, **kwargs)

            self._on_success()
            return result

        except self.expected_exception as e:
            self._on_failure()
            raise

    def _on_success(self):
        self.failure_count = 0
        self.success_count += 1
        if self.state == CircuitState.HALF_OPEN:
            self.state = CircuitState.CLOSED
            logger.info(f"Circuit breaker '{self.name}' recovered -> CLOSED")

    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = datetime.utcnow()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
            logger.warning(
                f"Circuit breaker '{self.name}' OPEN after {self.failure_count} failures"
            )

    def _should_attempt_reset(self) -> bool:
        if not self.last_failure_time:
            return True
        return (datetime.utcnow() - self.last_failure_time) > timedelta(seconds=self.recovery_timeout)

    def _time_until_reset(self) -> float:
        if not self.last_failure_time:
            return 0
        elapsed = (datetime.utcnow() - self.last_failure_time).total_seconds()
        return max(0, self.recovery_timeout - elapsed)

    def get_stats(self) -> dict:
        return {
            "name": self.name,
            "state": self.state.value,
            "failure_count": self.failure_count,
            "success_count": self.success_count,
            "total_calls": self.total_calls,
            "failure_rate": self.failure_count / max(1, self.total_calls),
        }


class CircuitBreakerOpenError(Exception):
    pass


class CircuitBreakerRegistry:
    _breakers: dict[str, CircuitBreaker] = {}

    @classmethod
    def get_or_create(cls, name: str, **kwargs) -> CircuitBreaker:
        if name not in cls._breakers:
            cls._breakers[name] = CircuitBreaker(name=name, **kwargs)
        return cls._breakers[name]

    @classmethod
    def get_all_stats(cls) -> dict:
        return {name: cb.get_stats() for name, cb in cls._breakers.items()}


claude_breaker = CircuitBreakerRegistry.get_or_create("claude", failure_threshold=3, recovery_timeout=30)
flux_breaker = CircuitBreakerRegistry.get_or_create("flux", failure_threshold=3, recovery_timeout=60)
elevenlabs_breaker = CircuitBreakerRegistry.get_or_create("elevenlabs", failure_threshold=3, recovery_timeout=30)
stripe_breaker = CircuitBreakerRegistry.get_or_create("stripe", failure_threshold=5, recovery_timeout=120)
s3_breaker = CircuitBreakerRegistry.get_or_create("s3", failure_threshold=3, recovery_timeout=30)
