import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas({
  roomId,
  socket
}: {
  socket: WebSocket;
  roomId: string;
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(canvasRef.current){
      console.log("Initializing draw with Room ID:", roomId);
      initDraw(canvasRef.current, roomId, socket)
    }
  }, [canvasRef])
  
  return <div>
    <canvas ref={canvasRef} width={1440} height={1440}></canvas>
  </div>
}