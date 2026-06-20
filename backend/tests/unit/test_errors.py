import pytest


class TestErrorCodes:
    def test_error_code_values(self):
        from app.core.errors import ErrorCode, ERROR_MESSAGES
        assert ErrorCode.AUTH_INVALID_CREDENTIALS == "AUTH_1001"
        assert ErrorCode.PROJECT_NOT_FOUND == "PROJECT_3001"
        assert ErrorCode.GENERATION_FAILED == "GEN_4001"
        assert ErrorCode.SYSTEM_INTERNAL_ERROR == "SYS_9001"

    def test_error_messages_exist(self):
        from app.core.errors import ErrorCode, ERROR_MESSAGES
        for code in ErrorCode:
            assert code in ERROR_MESSAGES, f"Missing error message for {code}"

    def test_error_messages_are_strings(self):
        from app.core.errors import ERROR_MESSAGES
        for code, msg in ERROR_MESSAGES.items():
            assert isinstance(msg, str)
            assert len(msg) > 0
