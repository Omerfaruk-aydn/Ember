from enum import Enum


class ErrorCode(str, Enum):
    AUTH_INVALID_CREDENTIALS = "AUTH_1001"
    AUTH_TOKEN_EXPIRED = "AUTH_1002"
    AUTH_TOKEN_INVALID = "AUTH_1003"
    AUTH_INSUFFICIENT_PERMISSIONS = "AUTH_1004"
    AUTH_ACCOUNT_LOCKED = "AUTH_1005"
    AUTH_EMAIL_NOT_VERIFIED = "AUTH_1006"
    AUTH_OAUTH_FAILED = "AUTH_1007"
    AUTH_2FA_REQUIRED = "AUTH_1008"
    AUTH_2FA_INVALID = "AUTH_1009"
    AUTH_RATE_LIMITED = "AUTH_1010"

    USER_NOT_FOUND = "USER_2001"
    USER_ALREADY_EXISTS = "USER_2002"
    USER_INVALID_INPUT = "USER_2003"
    USER_DEACTIVATED = "USER_2004"

    PROJECT_NOT_FOUND = "PROJECT_3001"
    PROJECT_ACCESS_DENIED = "PROJECT_3002"
    PROJECT_INVALID_STATE = "PROJECT_3003"
    PROJECT_LIMIT_EXCEEDED = "PROJECT_3004"
    PROJECT_NAME_DUPLICATE = "PROJECT_3005"

    GENERATION_FAILED = "GEN_4001"
    GENERATION_TIMEOUT = "GEN_4002"
    GENERATION_INVALID_PROMPT = "GEN_4003"
    GENERATION_CONTENT_POLICY = "GEN_4004"
    GENERATION_QUALITY_TOO_LOW = "GEN_4005"
    GENERATION_CONCURRENT_LIMIT = "GEN_4006"

    RENDER_FAILED = "RENDER_5001"
    RENDER_TIMEOUT = "RENDER_5002"
    RENDER_INSUFFICIENT_RESOURCES = "RENDER_5003"
    RENDER_CANCELLED = "RENDER_5004"

    ASSET_NOT_FOUND = "ASSET_6001"
    ASSET_UPLOAD_FAILED = "ASSET_6002"
    ASSET_TOO_LARGE = "ASSET_6003"
    ASSET_INVALID_FORMAT = "ASSET_6004"

    BILLING_PAYMENT_FAILED = "BILLING_7001"
    BILLING_SUBSCRIPTION_REQUIRED = "BILLING_7002"
    BILLING_USAGE_LIMIT_EXCEEDED = "BILLING_7003"
    BILLING_INVALID_PLAN = "BILLING_7004"
    BILLING_CUSTOMER_NOT_FOUND = "BILLING_7005"

    BRAND_NOT_FOUND = "BRAND_8001"
    BRAND_ANALYSIS_FAILED = "BRAND_8002"

    SYSTEM_INTERNAL_ERROR = "SYS_9001"
    SYSTEM_SERVICE_UNAVAILABLE = "SYS_9002"
    SYSTEM_RATE_LIMIT_EXCEEDED = "SYS_9003"
    SYSTEM_MAINTENANCE = "SYS_9004"


ERROR_MESSAGES = {
    ErrorCode.AUTH_INVALID_CREDENTIALS: "Invalid email or password",
    ErrorCode.AUTH_TOKEN_EXPIRED: "Token has expired. Please log in again",
    ErrorCode.AUTH_TOKEN_INVALID: "Invalid authentication token",
    ErrorCode.AUTH_INSUFFICIENT_PERMISSIONS: "You do not have permission to perform this action",
    ErrorCode.AUTH_ACCOUNT_LOCKED: "Account has been locked due to too many failed attempts",
    ErrorCode.AUTH_EMAIL_NOT_VERIFIED: "Please verify your email address",
    ErrorCode.USER_NOT_FOUND: "User not found",
    ErrorCode.USER_ALREADY_EXISTS: "An account with this email already exists",
    ErrorCode.USER_INVALID_INPUT: "Invalid input provided",
    ErrorCode.PROJECT_NOT_FOUND: "Project not found",
    ErrorCode.PROJECT_ACCESS_DENIED: "You do not have access to this project",
    ErrorCode.PROJECT_INVALID_STATE: "Project is in an invalid state for this operation",
    ErrorCode.PROJECT_LIMIT_EXCEEDED: "You have reached your project limit. Please upgrade your plan",
    ErrorCode.GENERATION_FAILED: "Video generation failed. Please try again",
    ErrorCode.GENERATION_TIMEOUT: "Video generation timed out",
    ErrorCode.GENERATION_INVALID_PROMPT: "The prompt contains invalid content",
    ErrorCode.GENERATION_CONTENT_POLICY: "The prompt violates content policy",
    ErrorCode.RENDER_FAILED: "Video rendering failed",
    ErrorCode.ASSET_NOT_FOUND: "Asset not found",
    ErrorCode.ASSET_TOO_LARGE: "File size exceeds the maximum limit",
    ErrorCode.ASSET_INVALID_FORMAT: "Invalid file format",
    ErrorCode.BILLING_SUBSCRIPTION_REQUIRED: "This feature requires a paid subscription",
    ErrorCode.BILLING_USAGE_LIMIT_EXCEEDED: "Usage limit exceeded for your current plan",
    ErrorCode.BRAND_NOT_FOUND: "Brand context not found",
    ErrorCode.SYSTEM_INTERNAL_ERROR: "An internal error occurred. Please try again later",
    ErrorCode.SYSTEM_SERVICE_UNAVAILABLE: "Service temporarily unavailable",
    ErrorCode.SYSTEM_RATE_LIMIT_EXCEEDED: "Too many requests. Please slow down",
}
