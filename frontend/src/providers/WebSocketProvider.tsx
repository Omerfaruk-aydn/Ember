import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

interface WebSocketContextType {
  isConnected: boolean;
  send: (message: Record<string, unknown>) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  send: () => {},
});

export function useWebSocketContext() {
  return useContext(WebSocketContext);
}

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { isAuthenticated } = useAuthStore();

  const connect = useCallback(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const socket = new WebSocket(`${protocol}//${window.location.host}/ws?token=${token}`);

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => {
      setIsConnected(false);
      setTimeout(connect, 3000);
    };
    socket.onerror = () => socket.close();

    setWs(socket);
  }, [isAuthenticated]);

  useEffect(() => {
    connect();
    return () => ws?.close();
  }, [connect]);

  const send = useCallback(
    (message: Record<string, unknown>) => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    },
    [ws]
  );

  return (
    <WebSocketContext.Provider value={{ isConnected, send }}>
      {children}
    </WebSocketContext.Provider>
  );
}
