import { Response } from "express"

const asyncHandler = require("express-async-handler")
import CustomRequest from "../config/customRequest";
import Comment from "../models/Comment";
import Post from "../models/Post";


// @desc Create new comment
// @route POST /api/posts/:postId/createNewComment

export const createNewComment = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).select("_id comments");

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Extract the text of the comment from the request body    
    const text = req.body.text
    if (!text) return res.status(404).json({ message: "Comments must have some text!" })


    // Check if there is currentUser, which is inherited from protect middleware
    const currentUser = req.user
    if (!currentUser) {
        return res.status(400).json({ message: "Current user not found!" })
    }

    // All checks passed, create comment
    const newComment = await Comment.create({
        creator: currentUser._id,
        text: text,
        post: postId,
        commentCreatedAt: Date.now()
    })

    const updatedComments = [...post.comments, newComment._id]; // Add new comment ID to existing comments
    await post.updateOne({ comments: updatedComments });
    return res.status(201).json({
        message: "New comment created!",
        comment: newComment,
        postComments: updatedComments
    })
})