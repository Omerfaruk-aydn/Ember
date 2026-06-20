from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.api.websocket.manager import manager
from app.core.security import decode_token
from urllib.parse import urlparse, parse_qs

router = APIRouter()


@router.websocket("/ws/projects/{project_id}")
async def project_websocket(websocket: WebSocket, project_id: str):
    token = websocket.query_params.get("token", "")
    payload = decode_token(token)
    if not payload:
        await websocket.close(code=4001, reason="Invalid token")
        return

    user_id = payload.get("sub", "unknown")
    await manager.connect(websocket, project_id, user_id)

    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")

            if msg_type == "cursor_move":
                await manager.broadcast_to_project(project_id, {"type": "cursor_moved", "user_id": user_id, "position": data.get("position")}, exclude=[])
            elif msg_type == "edit_operation":
                await manager.broadcast_to_project(project_id, {"type": "edit_operation", "user_id": user_id, "operation": data.get("operation")}, exclude=[])
            elif msg_type == "ping":
                await websocket.send_json({"type": "pong"})

    except WebSocketDisconnect:
        await manager.disconnect(project_id, f"{user_id}_*", user_id)
