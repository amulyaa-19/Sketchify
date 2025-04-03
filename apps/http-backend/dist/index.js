"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const config_1 = require("@repo/backend-common/config");
const types_1 = require("@repo/common/types");
const client_1 = require("@repo/db/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
// SIGNUP API (Hashes password before storing)
app.post("/signup", async (req, res) => {
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(parsedData.data.password, 10);
        await client_1.prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: hashedPassword,
                name: parsedData.data.name,
            },
        });
        res.status(201).json({ message: "User created successfully" });
        return;
    }
    catch (e) {
        res.status(409).json({ message: "User already exists with this username" });
        return;
    }
});
// SIGNIN API (Verifies hashed password and sets JWT in cookie)
app.post("/signin", async (req, res) => {
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    const user = await client_1.prismaClient.user.findFirst({
        where: { email: parsedData.data.username },
    });
    if (!user || !(await bcrypt_1.default.compare(parsedData.data.password, user.password))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Signin successful" });
    return;
});
// PROTECTED: Create Room API
app.post("/room", middleware_1.authMiddleware, async (req, res) => {
    const parsedData = types_1.CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    // Using type assertion to access userId from the request (set by authMiddleware)
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
// PROTECTED: Fetch Chat Messages
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
app.get("/room/:slug", middleware_1.authMiddleware, async (req, res) => {
    const slug = req.params.slug;
    const room = await client_1.prismaClient.room.findFirst({ where: { slug } });
    if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
    }
    res.json({ room });
    return;
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});
app.listen(3002, () => {
    console.log("Server running on port 3002");
});
