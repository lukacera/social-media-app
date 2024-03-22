import { Router } from "express";

const express = require("express");
const router: Router = express.Router()
import { protect } from "../middlewares/authMiddleware";
import { createPost, getAllPosts, deletePost } from "../controllers/postController";
import { upload } from "../config/multerConfig";
import { uploadToCloudinary } from "../config/multerConfig";
router
    .route("/createPost")
    .post(protect, upload.single("postImg"), createPost)

router
    .route("/getAllPosts")
    .get(getAllPosts)

router
    .route("/:postId")
    .delete(protect, deletePost)
export default router
