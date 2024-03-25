import { NextFunction, Request, Response, Router } from "express";
interface CustomRequestPublicID extends Request {
    publicId?: string
}
const express = require("express");
const router: Router = express.Router()
import { protect } from "../middlewares/authMiddleware";
import { createPost, getAllPosts, deletePost } from "../controllers/postController";
import { uploadMiddleware, uploadToCloudinary } from "../config/multerConfig";
import { likePost, unlikePost } from "../controllers/LikeController"
import { createNewComment } from "../controllers/CommentController"
router
    .route("/createPost")
    .post(protect, uploadMiddleware, (req, res, next) => {

        // If client submited image in his post, upload it to cloudinary
        if (req.file) {
            return uploadToCloudinary(req, res, next)
        } else {  // If he didn't, go to next middleware(createPost)
            return next();
        }
    }, createPost)

router
    .route("/getAllPosts")
    .get(getAllPosts)

router
    .route("/:postId")
    .delete(protect, deletePost)

router
    .route("/:postId/likePost")
    .post(protect, likePost)


router
    .route("/:postId/unlikePost")
    .delete(protect, unlikePost)

router
    .route("/:postId/createNewComment")
    .post(protect, createNewComment)

export default router
