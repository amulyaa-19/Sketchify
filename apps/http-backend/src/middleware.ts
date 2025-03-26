import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface DecodedToken{
  userId: string;
}
export function middleware(req: Request, res: Response, next: NextFunction): void {
  // Get the Authorization header
  const authHeader = req.headers["authorization"];
  
  // If no authorization header is present
  if (!authHeader) {
    res.status(401).json({
      message: "No authorization token provided"
    });
    return; // Important: return instead of using early return
  }

  // Split the header (expecting "Bearer <token>")
  const parts = authHeader.split(" ");
  
  // Check if header is in correct format
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({
      message: "Invalid authorization header format. Use 'Bearer <token>'"
    });
    return; // Important: return instead of using early return
  }

  // Extract the token
  const token = parts[1];

  // Verify token
  try {
    // Ensure token is not empty
    if (!token) {
      res.status(401).json({
        message: "Token cannot be empty"
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    // Attach userId to the request
    req.userId = decoded.userId;
    
    next(); // Call next() if everything is okay
  } catch (error) {
    // Handle different types of JWT errors
    res.status(403).json({
      message: "Failed to authenticate token",
      error: error instanceof Error ? error.message : "Unknown error"
    });
    return;
  }
}