"use client"

import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}){

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZmI2ZDc0Yi1kMDlmLTRjYzctYjk1Ny03ODYzOWUwMTMyZjIiLCJpYXQiOjE3NDMxNjExNTV9.BqqrTaNRFU91xh1PE2Thm5Dww1iqWRx9EHTqFNMuTME`)

    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({
        type: "join_room",
        roomId
      }))
    }

  }, [])

  if(!socket){
    return <div>
      Connecting to server...
    </div>
  }

  return<div>
    <Canvas roomId={roomId} socket={socket}/>
  </div>

}