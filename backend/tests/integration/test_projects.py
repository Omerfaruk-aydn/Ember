import pytest
from httpx import AsyncClient


class TestProjectsAPI:
    @pytest.mark.asyncio
    async def test_create_project(self, client: AsyncClient, auth_headers):
        response = await client.post(
            "/api/v1/projects",
            json={"name": "Test Project", "prompt": "Create a cinematic video"},
            headers=auth_headers,
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Test Project"
        assert data["status"] == "draft"

    @pytest.mark.asyncio
    async def test_list_projects(self, client: AsyncClient, auth_headers):
        await client.post(
            "/api/v1/projects",
            json={"name": "Project 1", "prompt": "Prompt 1"},
            headers=auth_headers,
        )
        response = await client.get("/api/v1/projects", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1

    @pytest.mark.asyncio
    async def test_get_project(self, client: AsyncClient, auth_headers):
        create_resp = await client.post(
            "/api/v1/projects",
            json={"name": "Get Test", "prompt": "Test prompt"},
            headers=auth_headers,
        )
        project_id = create_resp.json()["id"]

        response = await client.get(f"/api/v1/projects/{project_id}", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["name"] == "Get Test"

    @pytest.mark.asyncio
    async def test_update_project(self, client: AsyncClient, auth_headers):
        create_resp = await client.post(
            "/api/v1/projects",
            json={"name": "Update Test", "prompt": "Original"},
            headers=auth_headers,
        )
        project_id = create_resp.json()["id"]

        response = await client.put(
            f"/api/v1/projects/{project_id}",
            json={"name": "Updated Name"},
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["name"] == "Updated Name"

    @pytest.mark.asyncio
    async def test_delete_project(self, client: AsyncClient, auth_headers):
        create_resp = await client.post(
            "/api/v1/projects",
            json={"name": "Delete Test", "prompt": "To be deleted"},
            headers=auth_headers,
        )
        project_id = create_resp.json()["id"]

        response = await client.delete(f"/api/v1/projects/{project_id}", headers=auth_headers)
        assert response.status_code == 204

    @pytest.mark.asyncio
    async def test_get_nonexistent_project(self, client: AsyncClient, auth_headers):
        import uuid
        response = await client.get(f"/api/v1/projects/{uuid.uuid4()}", headers=auth_headers)
        assert response.status_code == 404

    @pytest.mark.asyncio
    async def test_unauthorized_access(self, client: AsyncClient):
        response = await client.get("/api/v1/projects")
        assert response.status_code == 401
