import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: string };
    (req as any).userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
