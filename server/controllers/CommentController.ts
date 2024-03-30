import { Response } from "express"

const asyncHandler = require("express-async-handler")
import CustomRequest from "../config/customRequest";
import Comment from "../models/Comment";
import Post from "../models/Post";
import { io } from "../app";


// @desc Create new comment
// @route POST /api/posts/:postId/createNewComment

export const createComment = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).select("_id comments");

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Extract the text of the comment from the request body    
    const text = req.body.text
    if (!text) return res.status(400).json({ message: "Comments must have some text!" })


    // Check if there is currentUser, which is inherited from protect middleware
    const currentUser = req.user
    if (!currentUser) {
        return res.status(404).json({ message: "Current user not found!" })
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

    // Send info to client that new comment was made
    await newComment.populate({
        path: 'creator',
        select: ['username', 'avatar']
    })

    // Emit the new comment to the client
    io.emit("newComment", newComment);

    return res.status(201).json({
        message: "New comment created!",
        comment: newComment,
        postComments: updatedComments
    })
})

// @desc Delete new comment
// @route DELETE /api/posts/:postId/deleteComment

export const deleteComment = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;
    const { commentId } = req.body;

    // Find the post by ID and popualate creators of comments
    const post = await Post.findById(postId)
        .select("_id comments")
        .populate({
            path: "comments",
            populate: {
                path: "creator",
                model: "User",
                select: ["username", "avatar"]
            }
        });

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the comment exists in the post's comments array
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

    // If commentIndex is -1, it means that it's not found
    if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the current user is authorized to delete the comment
    const currentUser = req.user;

    // Check if user is trying to delete someone else's comment, which is forbidden
    if (!post.comments[commentIndex].creator._id?.equals(currentUser._id)) {
        return res.status(401).json({ error: 'User can delete only his comments!' });
    }

    // Delete the comment
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    // Delete the comment from the database
    const commentToDelete = await Comment.findById(commentId)

    await commentToDelete?.deleteOne()

    io.emit("deleteComment", commentToDelete);

    // Return success response
    return res.status(200).json({ message: 'Comment deleted successfully' });
});