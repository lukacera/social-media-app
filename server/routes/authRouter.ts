import { Router } from "express";
import { loginUser, registerUser, getMyProfile } from "../controllers/authController";
const express = require("express");
const router: Router = express.Router()

// Import protect middleware, that requires JWT
import { protect } from "../middlewares/authMiddleware";

router
    .post("/login", loginUser)
    .post("/signUp", registerUser)
    .get("/myProfile", protect, getMyProfile)

export default router