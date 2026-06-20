import pytest


class TestPermissions:
    def test_editor_has_project_create(self):
        from app.core.permissions import PermissionChecker, Permission
        checker = PermissionChecker("editor", "user-1")
        assert checker.has_permission(Permission.PROJECT_CREATE)

    def test_viewer_lacks_project_create(self):
        from app.core.permissions import PermissionChecker, Permission
        checker = PermissionChecker("viewer", "user-1")
        assert not checker.has_permission(Permission.PROJECT_CREATE)

    def test_viewer_has_project_read(self):
        from app.core.permissions import PermissionChecker, Permission
        checker = PermissionChecker("viewer", "user-1")
        assert checker.has_permission(Permission.PROJECT_READ)

    def test_admin_has_all_permissions(self):
        from app.core.permissions import PermissionChecker, Permission, ROLES
        admin_perms = ROLES["admin"]
        assert Permission.ADMIN_USERS in admin_perms
        assert Permission.ADMIN_PROJECTS in admin_perms

    def test_owner_has_all_permissions(self):
        from app.core.permissions import PermissionChecker, Permission
        checker = PermissionChecker("owner", "user-1", owner_id="user-1")
        assert checker.has_permission(Permission.ADMIN_USERS)

    def test_require_permission_raises(self):
        from app.core.permissions import PermissionChecker, Permission
        from app.core.exceptions import ForbiddenException
        checker = PermissionChecker("viewer", "user-1")
        with pytest.raises(ForbiddenException):
            checker.require_permission(Permission.PROJECT_CREATE)

    def test_has_any_permission(self):
        from app.core.permissions import PermissionChecker, Permission
        checker = PermissionChecker("viewer", "user-1")
        assert checker.has_any_permission(Permission.PROJECT_READ, Permission.PROJECT_CREATE)
        assert not checker.has_any_permission(Permission.PROJECT_CREATE, Permission.PROJECT_DELETE)
