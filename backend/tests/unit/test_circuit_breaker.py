import pytest
from app.core.circuit_breaker import CircuitBreaker, CircuitBreakerOpenError, CircuitState


class TestCircuitBreaker:
    def test_initial_state(self):
        cb = CircuitBreaker("test", failure_threshold=3)
        assert cb.state == CircuitState.CLOSED
        assert cb.failure_count == 0

    def test_success_resets_failures(self):
        cb = CircuitBreaker("test", failure_threshold=3)
        cb._on_failure()
        cb._on_failure()
        cb._on_success()
        assert cb.failure_count == 0
        assert cb.state == CircuitState.CLOSED

    def test_opens_after_threshold(self):
        cb = CircuitBreaker("test", failure_threshold=3)
        cb._on_failure()
        cb._on_failure()
        cb._on_failure()
        assert cb.state == CircuitState.OPEN

    def test_stats(self):
        cb = CircuitBreaker("test", failure_threshold=3)
        stats = cb.get_stats()
        assert stats["name"] == "test"
        assert stats["state"] == "closed"
        assert stats["failure_count"] == 0
