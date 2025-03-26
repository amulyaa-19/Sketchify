"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const config_1 = require("@repo/backend-common/config");
const types_1 = require("@repo/common/types");
const client_1 = require("@repo/db/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", async (req, res) => {
    //db call
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    try {
        const user = await client_1.prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                // todo hash the password
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        });
        res.json({
            userId: user.id
        });
    }
    catch (e) {
        res.status(411).json({
            message: "user already exists with this username"
        });
    }
});
app.post("/signin", async (req, res) => {
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect inputs"
        });
        return;
    }
    // TODO: Compare the hashed password here
    const user = await client_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        res.status(401).json({
            message: "Invalid credentials"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id
    }, config_1.JWT_SECRET);
    console.log("Generated Token:", token);
    res.json({
        token: token
    });
});
app.post("/room", middleware_1.middleware, async (req, res) => {
    const parsedData = types_1.CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    //@ts-ignore fix this
    const userId = req.userId;
    try {
        const room = await client_1.prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });
        res.json({
            roomId: room.id
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Room already exists with this name"
        });
    }
});
app.listen(3002);
