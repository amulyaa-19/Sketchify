import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YTlkNWU3NS1mNGQwLTQ0MWMtYjEwYS0yZTAwMjFkZDU3OTQiLCJpYXQiOjE3NDMwMTkxNjh9.MTVnJk4sG79IY47W5_9qs5kDCHtzyQAbS8Wsq0_Zqtw`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}