"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = middleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/backend-common/config");
function middleware(req, res, next) {
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
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        // Attach userId to the request
        req.userId = decoded.userId;
        next(); // Call next() if everything is okay
    }
    catch (error) {
        // Handle different types of JWT errors
        res.status(403).json({
            message: "Failed to authenticate token",
            error: error instanceof Error ? error.message : "Unknown error"
        });
        return;
    }
}
