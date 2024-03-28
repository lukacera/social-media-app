import { Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
const asyncHandler = require("express-async-handler")
import CustomRequest from "../config/customRequest";
import { getAllDocuments } from "./genericController";
import { isValidObjectId } from "mongoose";
import { io } from "../app";


interface CustomRequestPost extends CustomRequest {
    publicId: string
}


// @desc Get all posts
// @route "/api/posts/getAllPosts"

export const getAllPosts = getAllDocuments(Post, ["creator", "likes", "comments.creator"])



// @desc Get a single post by ID
// @route GET /api/posts/:postId

export const getOnePost = asyncHandler(async (req: CustomRequest, res: Response) => {
    const postId = req.params.postId;

    // Check if the post ID is valid
    if (!isValidObjectId(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        // Find the post by ID in the database
        const post = await Post.findById(postId)
            .populate({
                path: "comments",
                populate: {
                    path: "creator",
                    model: "User"
                }
            });

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }


        // If the post exists, return it as a response
        return res.status(200).json({ post: post });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


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

    const user = await User.findById(creator);
    if (!user) {
        throw new Error('User not found');
    }

    // Add post to user's posts array
    user.posts?.push(newPost._id);
    await user.save();


    // Fetch the new post from the database with populated creator field
    const populatedPost = await Post.findById(newPost._id).populate('creator');

    io.emit("newPost", populatedPost)

    // Send the response with the populated post
    return res.status(201).json({ data: populatedPost });

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

    const postCreatorID = postToDelete.creator._id;

    // Check if user is trying to delete post that was not made by him
    if (!postCreatorID?.equals(currentUser)) {
        return res.status(400).json({ message: "User can delete only his posts!" })
    }

    const postCreator = await User.findById(postCreatorID)
    const postToDeleteIndex = postCreator?.posts?.findIndex(post => post._id === postToDelete._id);

    let filteredPosts;
    if (postToDeleteIndex) {
        filteredPosts = postCreator?.posts?.splice(postToDeleteIndex, 1)
    }

    // Update posts in post creator's document
    await postCreator?.updateOne({
        posts: filteredPosts
    })

    // All checks passed, delete post
    await postToDelete.deleteOne()

    io.emit("deletePost", postToDelete)

    res.status(200).json({ message: "Post deleted successfully" });

});
