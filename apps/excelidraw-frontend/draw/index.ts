import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    points: { x: number; y: number }[];
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");

    let existingShapes: Shape[] = await getExistingShapes(roomId)
    let pencilPoints: { x: number; y: number }[] = [];


    if (!ctx) {
        return
    }

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message)
            existingShapes.push(parsedShape.shape)
            clearCanvas(existingShapes, canvas, ctx);
        }
    }


    clearCanvas(existingShapes, canvas, ctx);
    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX
        startY = e.clientY

        // @ts-ignore
        const selectedTool = window.selectedTool;
        if (selectedTool === "pencil") {
            pencilPoints = [{ x: startX, y: startY }];
        }
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        // @ts-ignore
        const selectedTool = window.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {

            shape = {
                type: "rect",
                x: startX,
                y: startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: startX + radius,
                centerY: startY + radius,
            }
        } else if (selectedTool === "pencil") {
            shape = {
            type: "pencil",
            points: pencilPoints,
        };
    }

        if (!shape) {
            return;
        }

        existingShapes.push(shape);

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))

    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const currentX = e.clientX;
            const currentY = e.clientY;

            //@ts-ignore
            const selectedTool = window.selectedTool;
            if(selectedTool === "pencil"){
                pencilPoints.push({ x: currentX, y: currentY});
                clearCanvas(existingShapes, canvas, ctx);
                drawPencilStroke(ctx, pencilPoints);
            } else {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(255, 255, 255)"
            // @ts-ignore
            const selectedTool = window.selectedTool;
            if (selectedTool === "rect") {
                ctx.strokeRect(startX, startY, width, height);
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = startX + radius;
                const centerY = startY + radius;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
                }
            }
        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.forEach((shape) => {
        ctx.strokeStyle = "rgba(255, 255, 255)";
        if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        } else if (shape.type === "pencil") {
            drawPencilStroke(ctx, shape.points);
        }
    });
}

function drawPencilStroke(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}


async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}