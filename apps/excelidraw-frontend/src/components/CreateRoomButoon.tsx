"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateRoomForm() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:3002/canvas/room", {
      method: "POST",
      body: JSON.stringify({ name: roomName }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      const { roomId } = await res.json();
      router.push(`/canvas/${roomId}`);
    } else {
      const err = await res.json();
      console.error("Failed to create room:", err);
      alert(err.message || "Error creating room");  
    }

    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <input
        className="border px-2 py-1 rounded"
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button
        onClick={handleCreateRoom}
        className="bg-blue-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Room"}
      </button>
    </div>
  );
}
