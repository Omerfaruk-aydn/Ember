import json
import uuid
from typing import Any
from fastapi import WebSocket, WebSocketDisconnect


class ConnectionManager:
    def __init__(self):
        self.connections: dict[str, dict[str, WebSocket]] = {}

    async def connect(self, websocket: WebSocket, project_id: str, user_id: str):
        await websocket.accept()
        if project_id not in self.connections:
            self.connections[project_id] = {}
        connection_id = f"{user_id}_{uuid.uuid4().hex[:8]}"
        self.connections[project_id][connection_id] = websocket
        await self.broadcast_to_project(project_id, {"type": "user_joined", "user_id": user_id, "connection_id": connection_id}, exclude=[connection_id])

    async def disconnect(self, project_id: str, connection_id: str, user_id: str):
        if project_id in self.connections:
            self.connections[project_id].pop(connection_id, None)
            if not self.connections[project_id]:
                del self.connections[project_id]
        await self.broadcast_to_project(project_id, {"type": "user_left", "user_id": user_id})

    async def broadcast_to_project(self, project_id: str, message: dict[str, Any], exclude: list[str] | None = None):
        exclude = exclude or []
        if project_id not in self.connections:
            return
        disconnected = []
        for conn_id, ws in self.connections[project_id].items():
            if conn_id in exclude:
                continue
            try:
                await ws.send_json(message)
            except Exception:
                disconnected.append(conn_id)
        for conn_id in disconnected:
            self.connections[project_id].pop(conn_id, None)

    async def send_generation_progress(self, project_id: str, progress: float, phase: str):
        await self.broadcast_to_project(project_id, {"type": "generation_progress", "progress": progress, "phase": phase})

    async def send_generation_complete(self, project_id: str, video_url: str | None = None):
        await self.broadcast_to_project(project_id, {"type": "generation_complete", "video_url": video_url})


manager = ConnectionManager()
