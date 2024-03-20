import { Response } from "express";
import Post from "../models/Post";
const asyncHandler = require("express-async-handler")
import CustomRequest from "../config/customRequest";
import { getAllDocuments } from "./genericController";


// @desc Create new post
// @route "/api/posts/createPost"

export const createPost = asyncHandler(async (req: CustomRequest, res: Response) => {
    const creator = req.user._id;
    const { text } = req.body;
    const img = req.file

    // Create a new post instance
    const newPost = new Post({
        creator: creator,
        text: text,
        img: img?.path || "",
        postCreatedAt: new Date()
    });

    // Save the new post to the database
    await newPost.save();

    // Fetch the new post from the database with populated creator field
    const populatedPost = await Post.findById(newPost._id).populate('creator');

    // Send the response with the populated post
    res.status(201).json({ data: populatedPost });

});

// @desc Get all posts
// @route "/api/posts/getAllPosts"

export const getAllPosts = getAllDocuments(Post, "creator")