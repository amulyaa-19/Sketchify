"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@repo/db/client");
const PORT = parseInt(process.env.PORT || "8080", 10);
const wss = new ws_1.WebSocketServer({ port: PORT });
const JWT_SECRET = (() => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return secret;
})();
const users = [];
function checkUser(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Safely extract userId
        if (typeof decoded === "object" && decoded.userId) {
            return decoded.userId;
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
wss.on("connection", function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParam = new URLSearchParams(url.split("?")[1]);
    const token = queryParam.get("token") || "";
    const userId = checkUser(token);
    if (userId == null) {
        ws.close();
        return;
    }
    users.push({
        ws,
        userId,
        rooms: [],
    });
    ws.on("message", async function message(data) {
        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString());
        }
        else {
            parsedData = JSON.parse(data);
        }
        if (parsedData.type === "join_room") {
            const user = users.find((x) => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }
        if (parsedData.type === "leave_room") {
            const user = users.find((x) => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter((x) => x !== parsedData.room);
        }
        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            await client_1.prismaClient.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    userId,
                },
            });
            users.forEach((user) => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message,
                        roomId,
                    }));
                }
            });
        }
    });
});
console.log(`WebSocket server running on port ${PORT}`);
