import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { authMiddleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

app.post("/signup", async (req: Request, res: Response): Promise<void> => {
  console.log("Signup request received:", req.body);

  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Incorrect inputs" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });

    // ✅ Generate JWT token and set it as an HTTP-only cookie
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
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
  } catch (e) {
    res.status(409).json({ message: "User already exists with this username" });
  }
});

app.post("/signin", async (req: Request, res: Response): Promise<void> => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Incorrect inputs" });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: { email: parsedData.data.email },
  });
  if (
    !user ||
    !(await bcrypt.compare(parsedData.data.password, user.password))
  ) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
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
app.post(
  "/canvas/room",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Incorrect inputs" });
      return;
    }

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
  }
);

app.get(
  "/chats/:roomId",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
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
  }
);

// PROTECTED: Fetch Room Details
// Join using roomId
app.get(
  "/room/id/:roomId",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const roomId = Number(req.params.roomId);
    if (isNaN(roomId)) {
      res.status(400).json({ message: "Invalid room ID" });
      return;
    }

    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    res.json({ room });
  }
);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Because http only cookie cant be read by document.cookie
app.get("/me", authMiddleware, (req: Request, res: Response) => {
  const token = req.cookies.authToken; // since token is stored as authToken
  res.json({ userId: (req as any).userId, token });
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});
