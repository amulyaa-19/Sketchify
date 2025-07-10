"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const types_1 = require("@repo/common/types");
const client_1 = require("@repo/db/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}
app.post("/signup", async (req, res) => {
    console.log("Signup request received:", req.body);
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(parsedData.data.password, 10);
        const user = await client_1.prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name,
            },
        });
        // ✅ Generate JWT token and set it as an HTTP-only cookie
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false, // change to true if using HTTPS
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        console.log("User created and signed in successfully");
        res
            .status(201)
            .json({ message: "User created and signed in successfully" });
    }
    catch (e) {
        res.status(409).json({ message: "User already exists with this username" });
    }
});
app.post("/signin", async (req, res) => {
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    const user = await client_1.prismaClient.user.findFirst({
        where: { email: parsedData.data.email },
    });
    if (!user ||
        !(await bcrypt_1.default.compare(parsedData.data.password, user.password))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Signin successful" });
    return;
});
// PROTECTED: Create Room API
app.post("/canvas/room", middleware_1.authMiddleware, async (req, res) => {
    const parsedData = types_1.CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    const userId = req.userId;
    try {
        const room = await client_1.prismaClient.room.create({
            data: { slug: parsedData.data.name, adminId: userId },
        });
        res.json({ roomId: room.id });
        return;
    }
    catch (e) {
        res.status(409).json({ message: "Room already exists with this name" });
        return;
    }
});
app.get("/chats/:roomId", middleware_1.authMiddleware, async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        const messages = await client_1.prismaClient.chat.findMany({
            where: { roomId },
            orderBy: { id: "desc" },
            take: 1000,
        });
        res.json({ messages });
        return;
    }
    catch (e) {
        res.status(500).json({ messages: [] });
        return;
    }
});
// PROTECTED: Fetch Room Details
// Join using roomId
app.get("/room/id/:roomId", middleware_1.authMiddleware, async (req, res) => {
    const roomId = Number(req.params.roomId);
    if (isNaN(roomId)) {
        res.status(400).json({ message: "Invalid room ID" });
        return;
    }
    const room = await client_1.prismaClient.room.findUnique({
        where: { id: roomId },
    });
    if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
    }
    res.json({ room });
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
});
// Because http only cookie cant be read by document.cookie
app.get("/me", middleware_1.authMiddleware, (req, res) => {
    const token = req.cookies.authToken; // since token is stored as authToken
    res.json({ userId: req.userId, token });
});
app.listen(3002, () => {
    console.log("Server running on port 3002");
});
