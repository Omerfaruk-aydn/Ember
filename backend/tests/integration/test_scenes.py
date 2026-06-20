import pytest
from httpx import AsyncClient


class TestScenesAPI:
    @pytest.fixture
    async def project_id(self, client: AsyncClient, auth_headers):
        resp = await client.post(
            "/api/v1/projects",
            json={"name": "Scene Test Project", "prompt": "Test"},
            headers=auth_headers,
        )
        return resp.json()["id"]

    @pytest.mark.asyncio
    async def test_create_scene(self, client: AsyncClient, auth_headers, project_id):
        response = await client.post(
            f"/api/v1/projects/{project_id}/scenes",
            json={"title": "Scene 1", "description": "Opening scene", "duration_ms": 5000},
            headers=auth_headers,
        )
        assert response.status_code == 201
        data = response.json()
        assert data["title"] == "Scene 1"
        assert data["order_index"] == 0

    @pytest.mark.asyncio
    async def test_list_scenes(self, client: AsyncClient, auth_headers, project_id):
        await client.post(
            f"/api/v1/projects/{project_id}/scenes",
            json={"title": "Scene 1", "duration_ms": 5000},
            headers=auth_headers,
        )
        response = await client.get(f"/api/v1/projects/{project_id}/scenes", headers=auth_headers)
        assert response.status_code == 200
        assert len(response.json()) >= 1

    @pytest.mark.asyncio
    async def test_update_scene(self, client: AsyncClient, auth_headers, project_id):
        create_resp = await client.post(
            f"/api/v1/projects/{project_id}/scenes",
            json={"title": "Original", "duration_ms": 5000},
            headers=auth_headers,
        )
        scene_id = create_resp.json()["id"]

        response = await client.put(
            f"/api/v1/projects/{project_id}/scenes/{scene_id}",
            json={"title": "Updated Scene"},
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["title"] == "Updated Scene"

    @pytest.mark.asyncio
    async def test_delete_scene(self, client: AsyncClient, auth_headers, project_id):
        create_resp = await client.post(
            f"/api/v1/projects/{project_id}/scenes",
            json={"title": "To Delete", "duration_ms": 5000},
            headers=auth_headers,
        )
        scene_id = create_resp.json()["id"]

        response = await client.delete(
            f"/api/v1/projects/{project_id}/scenes/{scene_id}",
            headers=auth_headers,
        )
        assert response.status_code == 204
