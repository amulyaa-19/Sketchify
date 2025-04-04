"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoomForm() {
  const router = useRouter();
  const [roomSlug, setRoomSlug] = useState("");
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinRoom = async () => {
    if (!roomSlug.trim()) return;
    setLoading(true);
    
    try {
      const res = await fetch(`http://localhost:3002/room/id/${roomSlug}`, {
        method: "GET",
        credentials: "include",
      });
      
      if (res.ok) {
        router.push(`/canvas/${roomSlug}`);
      } else {
        alert("Room not found. Please check the ID.");
      }
    } catch (error) {
      console.error("Failed to join room:", error);
      alert("An error occurred while trying to join the room.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateRoom = async () => {
    if (!roomName.trim()) return alert("Please enter a room name.");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3002/canvas/room", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roomName }),
      });
    
      const data = await res.json();
      router.push(`/canvas/${data.roomId}`);
    } catch (error) {
      console.error("Failed to create room:", error);
      alert("An error occurred while trying to create a room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="backdrop-blur-xl bg-black/30 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">Welcome to Sketchify</h1>
        
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-gray-300 font-medium ml-1">Room Name</label>
            <input
              type="text"
              placeholder="Enter Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-white font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 shadow-md placeholder-gray-400"
            />
          </div>
          
          <button
            onClick={handleCreateRoom}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold py-3 rounded-xl transition duration-300 hover:from-gray-800 hover:to-black border border-gray-600 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              "+ Create New Room"
            )}
          </button>
          
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-transparent px-2 text-gray-400 mt-8 ">Or Join Existing</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomSlug}
              onChange={(e) => setRoomSlug(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-white font-medium bg-gray-800/80 backdrop-blur-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 shadow-md placeholder-gray-400"
            />
            <button
              onClick={handleJoinRoom}
              className="bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold px-6 py-3 rounded-xl transition duration-300 hover:from-gray-600 hover:to-gray-800 border border-gray-600 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </span>
              ) : (
                "Join"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}