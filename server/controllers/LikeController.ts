import { Response } from "express"

const asyncHandler = require("express-async-handler")
import CustomRequest from "../config/customRequest";
import Post from "../models/Post";
import { io } from "../app";
// @desc Like post
// @route POST api/posts/:postId/likePost

export const likePost = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).select("likes")

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Check if there is currentUser, which is inherited from protect middleware
    const currentUser = req.user
    if (!currentUser) {
        return res.status(400).json({ message: "Current user not found!" })
    }

    // Push currentUser's id into post's likes, if he did not like it already
    if (currentUser._id && !post.likes.includes(currentUser._id)) {
        post.likes.push(currentUser._id);
        await post.save()

        io.emit("like")
        return res.status(200).json({ message: 'Post liked successfully', post });

    } else {  // User already liked the post, return 401 Unauthorized
        return res.status(401).json({ message: "User already liked this post!" });
    }

})

// @desc Unlike post
// @route DELETE api/posts/:postId/likePost

export const unlikePost = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).select("likes")

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Check if there is currentUser, which is inherited from protect middleware
    const currentUser = req.user
    if (!currentUser) {
        return res.status(400).json({ message: "Current user not found!" })
    }
    // Get index of user in likes array
    const likedIndex = post.likes.findIndex(userId => userId.equals(currentUser._id));

    // If user was not found in array, likedIndex is -1
    if (likedIndex === -1) {
        return res.status(401).json({
            message: "User did not like this post, so there is no like to remove!"
        });
    } else {

        post.likes.splice(likedIndex, 1);
        await post.save();
        io.emit("unlike")

        return res.status(200).json({ message: 'Post like removed successfully', post });

    }
})
