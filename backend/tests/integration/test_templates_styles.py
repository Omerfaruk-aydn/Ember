import pytest
from httpx import AsyncClient


class TestTemplatesAPI:
    @pytest.mark.asyncio
    async def test_list_templates(self, client: AsyncClient, auth_headers):
        response = await client.get("/api/v1/templates", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert "data" in data
        assert len(data["data"]) > 0

    @pytest.mark.asyncio
    async def test_get_template(self, client: AsyncClient, auth_headers):
        response = await client.get("/api/v1/templates/product-launch", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["id"] == "product-launch"

    @pytest.mark.asyncio
    async def test_get_nonexistent_template(self, client: AsyncClient, auth_headers):
        response = await client.get("/api/v1/templates/nonexistent", headers=auth_headers)
        assert response.status_code == 404


class TestStylesAPI:
    @pytest.mark.asyncio
    async def test_list_styles(self, client: AsyncClient, auth_headers):
        response = await client.get("/api/v1/styles", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) > 0

    @pytest.mark.asyncio
    async def test_get_style(self, client: AsyncClient, auth_headers):
        response = await client.get("/api/v1/styles/cinematic", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["id"] == "cinematic"
