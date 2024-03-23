import { NextFunction, Request, Response, Router } from "express";
interface CustomRequestPublicID extends Request {
    publicId?: string
}
const express = require("express");
const router: Router = express.Router()
import { protect } from "../middlewares/authMiddleware";
import { createPost, getAllPosts, deletePost } from "../controllers/postController";
import { uploadMiddleware, uploadToCloudinary } from "../config/multerConfig";
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
export default router
