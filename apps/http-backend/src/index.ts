import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { authMiddleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// SIGNUP API (Hashes password before storing)
app.post("/signup", async (req: Request, res: Response): Promise<void> => {
  console.log("➡️ Signup request received:", req.body); 
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Incorrect inputs" });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    await prismaClient.user.create({
      data: {
        email: parsedData.data.username,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });
    res.status(201).json({ message: "User created successfully" });
    return;
  } catch (e) {
    res.status(409).json({ message: "User already exists with this username" });
    return;
  }
});

// SIGNIN API (Verifies hashed password and sets JWT in cookie)
app.post("/signin", async (req: Request, res: Response): Promise<void> => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Incorrect inputs" });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: { email: parsedData.data.username },
  });
  if (!user || !(await bcrypt.compare(parsedData.data.password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
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
app.post("/room", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Incorrect inputs" });
    return;
  }
  // Using type assertion to access userId from the request (set by authMiddleware)
  const userId = (req as any).userId;
  try {
    const room = await prismaClient.room.create({
      data: { slug: parsedData.data.name, adminId: userId },
    });
    res.json({ roomId: room.id });
    return;
  } catch (e) {
    res.status(409).json({ message: "Room already exists with this name" });
    return;
  }
});

// PROTECTED: Fetch Chat Messages
app.get("/chats/:roomId", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
      where: { roomId },
      orderBy: { id: "desc" },
      take: 1000,
    });
    res.json({ messages });
    return;
  } catch (e) {
    res.status(500).json({ messages: [] });
    return;
  }
});

// PROTECTED: Fetch Room Details
app.get("/room/:slug", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({ where: { slug } });
  if (!room) {
    res.status(404).json({ message: "Room not found" });
    return;
  }
  res.json({ room });
  return;
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});
