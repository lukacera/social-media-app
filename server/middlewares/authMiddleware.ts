import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';
const asyncHandler = require("express-async-handler");

import User from "../models/User"

// Extend request with user
interface CustomRequest extends Request {
    user: any
}

// @ desc Protects route, so only signed User can access it

export const protect = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        // No token provided
        return res.status(401).json({ error: "No token detected!" });
    }

    try {
        // Verify token
        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");

        // Get user from token's Payload, excluding password from result
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            throw new Error("User not found");
        }

        // Attach user information to the req object
        req.user = user;

        next(); // Call next middleware
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ error: "Not authorized" });
    }
});