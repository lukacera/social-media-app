import { Router } from "express";

const express = require("express");
const router: Router = express.Router()
import { protect } from "../middlewares/authMiddleware";
import { createPost, getAllPosts, deletePost } from "../controllers/postController";
import { upload, uploadToCloudinary } from "../config/multerConfig";
import { File } from "buffer";


router
    .route("/createPost")
    .post(protect, upload.single("img"), (req, res, next) => {
        // ID of image in cloudinary, which will be stored in mongo
        if (req.file) {
            uploadToCloudinary(req, res, next)
                .then(publicId => {
                    next();
                })
                .catch(error => {
                    console.error("Error uploading image to Cloudinary:", error);
                    res.status(500).send("Error while uploading image to Cloudinary!");
                });
        } else {
            next();
        }
    }, createPost);


router
    .route("/getAllPosts")
    .get(getAllPosts)

router
    .route("/:postId")
    .delete(protect, deletePost)
export default router
