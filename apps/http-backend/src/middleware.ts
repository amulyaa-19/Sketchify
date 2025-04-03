import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).userId = decoded.userId; // Attach user ID to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
