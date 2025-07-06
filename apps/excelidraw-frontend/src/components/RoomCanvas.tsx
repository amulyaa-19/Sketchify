"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { useRouter } from "next/navigation";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const HTTP_BACKEND_URL = process.env.NEXT_PUBLIC_HTTP_BACKEND_URL || "http://localhost:3002";
  const WS_BACKEND_URL = process.env.NEXT_PUBLIC_WS_BACKEND_URL || "ws://localhost:8080";

  useEffect(() => {
    const validateSessionAndConnect = async () => {
      try {
        const response = await fetch(`${HTTP_BACKEND_URL}/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          console.error("User not authenticated, redirecting...");
          router.push("/signin");
          return;
        }

        const data = await response.json();
        const token = data.token;
        if (!token) {
          console.error("No token received from /me endpoint.");
          router.push("/signin");
          return;
        }

        const ws = new WebSocket(`${WS_BACKEND_URL}?roomId=${roomId}&token=${token}`);

        ws.onopen = () => {
          console.log("WebSocket connected");
          setSocket(ws);
          ws.send(JSON.stringify({ type: "join_room", roomId }));
        };

        ws.onmessage = (event) => {
          console.log("Message from server:", event.data);
        };

        ws.onclose = () => {
          console.log("WebSocket disconnected");
        };

        ws.onerror = (err) => {
          console.error("WebSocket error:", err);
        };
      } catch (error) {
        console.error("Authentication or WebSocket connection error:", error);
        router.push("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    validateSessionAndConnect();
  }, [roomId, router, HTTP_BACKEND_URL, WS_BACKEND_URL]);

  if (isLoading) {
    return <div className="text-white p-6">Checking authentication...</div>;
  }

  if (!socket) {
    return <div className="text-white p-6">Connecting to server...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
