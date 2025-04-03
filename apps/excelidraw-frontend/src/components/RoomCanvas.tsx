"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Get auth token from cookies
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!authToken) {
      console.error("No auth token found!");
      return;
    }

    const ws = new WebSocket(`${WS_URL}?token=${authToken}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };

    ws.onmessage = (event) => {
      console.log("WebSocket Message:", event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.send(JSON.stringify({ type: "leave_room", roomId }));
      ws.close();
    };
  }, [roomId]);

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
