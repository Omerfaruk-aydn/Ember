from enum import Enum
from typing import List


class Permission(str, Enum):
    PROJECT_CREATE = "project:create"
    PROJECT_READ = "project:read"
    PROJECT_UPDATE = "project:update"
    PROJECT_DELETE = "project:delete"
    PROJECT_GENERATE = "project:generate"
    PROJECT_DUPLICATE = "project:duplicate"

    SCENE_CREATE = "scene:create"
    SCENE_READ = "scene:read"
    SCENE_UPDATE = "scene:update"
    SCENE_DELETE = "scene:delete"
    SCENE_REORDER = "scene:reorder"

    BRAND_CREATE = "brand:create"
    BRAND_READ = "brand:read"
    BRAND_UPDATE = "brand:update"
    BRAND_DELETE = "brand:delete"
    BRAND_ANALYZE = "brand:analyze"

    ASSET_UPLOAD = "asset:upload"
    ASSET_READ = "asset:read"
    ASSET_DELETE = "asset:delete"
    ASSET_GENERATE = "asset:generate"

    BILLING_READ = "billing:read"
    BILLING_MANAGE = "billing:manage"
    BILLING_SUBSCRIBE = "billing:subscribe"

    TEMPLATE_USE = "template:use"
    TEMPLATE_READ = "template:read"

    EXPORT_VIDEO = "export:video"
    EXPORT_AUDIO = "export:audio"

    COLLAB_INVITE = "collab:invite"
    COLLAB_EDIT = "collab:edit"

    ADMIN_USERS = "admin:users"
    ADMIN_PROJECTS = "admin:projects"
    ADMIN_RENDER_JOBS = "admin:render_jobs"
    ADMIN_SYSTEM = "admin:system"
    ADMIN_BILLING = "admin:billing"
    ADMIN_FEATURE_FLAGS = "admin:feature_flags"

    USER_PROFILE_READ = "user:profile:read"
    USER_PROFILE_UPDATE = "user:profile:update"
    USER_API_KEYS = "user:api_keys"
    USER_PREFERENCES = "user:preferences"


ROLES = {
    "viewer": [
        Permission.PROJECT_READ,
        Permission.SCENE_READ,
        Permission.BRAND_READ,
        Permission.ASSET_READ,
        Permission.TEMPLATE_READ,
        Permission.USER_PROFILE_READ,
    ],
    "editor": [
        Permission.PROJECT_CREATE,
        Permission.PROJECT_READ,
        Permission.PROJECT_UPDATE,
        Permission.PROJECT_GENERATE,
        Permission.PROJECT_DUPLICATE,
        Permission.SCENE_CREATE,
        Permission.SCENE_READ,
        Permission.SCENE_UPDATE,
        Permission.SCENE_DELETE,
        Permission.SCENE_REORDER,
        Permission.BRAND_CREATE,
        Permission.BRAND_READ,
        Permission.BRAND_UPDATE,
        Permission.BRAND_ANALYZE,
        Permission.ASSET_UPLOAD,
        Permission.ASSET_READ,
        Permission.ASSET_DELETE,
        Permission.ASSET_GENERATE,
        Permission.TEMPLATE_USE,
        Permission.TEMPLATE_READ,
        Permission.EXPORT_VIDEO,
        Permission.EXPORT_AUDIO,
        Permission.COLLAB_EDIT,
        Permission.USER_PROFILE_READ,
        Permission.USER_PROFILE_UPDATE,
        Permission.USER_API_KEYS,
        Permission.USER_PREFERENCES,
    ],
    "admin": [
        Permission.PROJECT_CREATE,
        Permission.PROJECT_READ,
        Permission.PROJECT_UPDATE,
        Permission.PROJECT_DELETE,
        Permission.PROJECT_GENERATE,
        Permission.PROJECT_DUPLICATE,
        Permission.SCENE_CREATE,
        Permission.SCENE_READ,
        Permission.SCENE_UPDATE,
        Permission.SCENE_DELETE,
        Permission.SCENE_REORDER,
        Permission.BRAND_CREATE,
        Permission.BRAND_READ,
        Permission.BRAND_UPDATE,
        Permission.BRAND_DELETE,
        Permission.BRAND_ANALYZE,
        Permission.ASSET_UPLOAD,
        Permission.ASSET_READ,
        Permission.ASSET_DELETE,
        Permission.ASSET_GENERATE,
        Permission.BILLING_READ,
        Permission.BILLING_MANAGE,
        Permission.BILLING_SUBSCRIBE,
        Permission.TEMPLATE_USE,
        Permission.TEMPLATE_READ,
        Permission.EXPORT_VIDEO,
        Permission.EXPORT_AUDIO,
        Permission.COLLAB_INVITE,
        Permission.COLLAB_EDIT,
        Permission.ADMIN_USERS,
        Permission.ADMIN_PROJECTS,
        Permission.ADMIN_RENDER_JOBS,
        Permission.ADMIN_SYSTEM,
        Permission.ADMIN_BILLING,
        Permission.ADMIN_FEATURE_FLAGS,
        Permission.USER_PROFILE_READ,
        Permission.USER_PROFILE_UPDATE,
        Permission.USER_API_KEYS,
        Permission.USER_PREFERENCES,
    ],
    "owner": [p for p in Permission],
}


class PermissionChecker:
    def __init__(self, user_role: str, user_id: str, owner_id: str | None = None):
        self.role = user_role
        self.user_id = user_id
        self.owner_id = owner_id
        self.permissions = ROLES.get(user_role, [])

    def has_permission(self, permission: Permission) -> bool:
        if self.owner_id and self.user_id == self.owner_id:
            return True
        return permission in self.permissions

    def has_any_permission(self, *permissions: Permission) -> bool:
        return any(self.has_permission(p) for p in permissions)

    def has_all_permissions(self, *permissions: Permission) -> bool:
        return all(self.has_permission(p) for p in permissions)

    def require_permission(self, permission: Permission) -> None:
        if not self.has_permission(permission):
            from app.core.exceptions import ForbiddenException
            raise ForbiddenException(f"Permission denied: {permission.value}")

    def require_any_permission(self, *permissions: Permission) -> None:
        if not self.has_any_permission(*permissions):
            names = ", ".join(p.value for p in permissions)
            from app.core.exceptions import ForbiddenException
            raise ForbiddenException(f"Permission denied: requires one of [{names}]")
