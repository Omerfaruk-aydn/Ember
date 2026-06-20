import { useEffect, useRef, useCallback, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

interface WebSocketMessage {
  type: string;
  [key: string]: unknown;
}

export function useWebSocket(projectId: string | null) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const { user } = useAuthStore();

  const connect = useCallback(() => {
    if (!projectId || !user) return;

    const token = localStorage.getItem("access_token");
    const wsUrl = `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/ws/projects/${projectId}?token=${token}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;
        setLastMessage(message);
      } catch {
        // Invalid message
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      setTimeout(connect, 3000);
    };

    ws.onerror = () => {
      ws.close();
    };

    wsRef.current = ws;
  }, [projectId, user]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const send = useCallback((message: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  const sendCursorMove = useCallback(
    (position: { x: number; y: number }) => {
      send({ type: "cursor_move", position });
    },
    [send]
  );

  const sendEditOperation = useCallback(
    (operation: Record<string, unknown>) => {
      send({ type: "edit_operation", operation });
    },
    [send]
  );

  return { isConnected, lastMessage, send, sendCursorMove, sendEditOperation };
}
