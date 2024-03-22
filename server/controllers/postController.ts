import { Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
const asyncHandler = require("express-async-handler")
import CustomRequest from "../config/customRequest";
import { getAllDocuments } from "./genericController";
import { isValidObjectId } from "mongoose";
// @desc Get all posts
// @route "/api/posts/getAllPosts"

export const getAllPosts = getAllDocuments(Post, "creator")


interface CustomRequestPost extends CustomRequest {
    publicId: string,
}
// @desc Create new post
// @route "/api/posts/createPost"

export const createPost = asyncHandler(async (req: CustomRequestPost, res: Response) => {
    const creator = req.user._id;
    const { text } = req.body;

    // Create a new post instance
    const newPost = new Post({
        creator: creator,
        text: text,
        img: req.publicId,
        postCreatedAt: new Date()
    });

    // Save the new post to the database
    await newPost.save();
    console.log("Post created")
    const user = await User.findById(creator);
    if (!user) {
        throw new Error('User not found');
    }
    user.posts?.push(newPost._id);
    await user.save();


    // Fetch the new post from the database with populated creator field
    const populatedPost = await Post.findById(newPost._id).populate('creator');

    // Send the response with the populated post
    res.status(201).json({ data: populatedPost });

});

// @desc Delete post from DB
// @route /api/posts/:postId

export const deletePost = asyncHandler(async (req: CustomRequest, res: Response) => {
    const currentUser = req.user._id;
    const postId = req.params.postId

    if (!isValidObjectId(postId)) {
        return res.status(400).json({ message: "Id is invalid! " })
    }
    const postToDelete = await Post.findById(postId)

    // Check if post is not found
    if (!postToDelete) {
        return res.status(400).json({ message: "Post not found! " })
    }

    const postCreator = postToDelete.creator._id;

    // Check if user is trying to delete post that was not made by him
    if (!postCreator?.equals(currentUser)) {
        return res.status(400).json({ message: "User can delete only his posts!" })
    }


    // All checks passed, delete post
    await postToDelete.deleteOne()

    res.status(200).json({ message: "Post deleted successfully" });

});
