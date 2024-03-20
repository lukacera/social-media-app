import { Response } from "express";
const asyncHandler = require("express-async-handler")
import User from "../models/User"
import CustomRequest from "../config/customRequest";

// @desc  Send friend request to other user by username
// @route POST "/api/users/:username/friendRequest"

export const sendFriendRequest = asyncHandler(async (req: CustomRequest, res: Response) => {

    const username = req.params.username;

    // Get currentUser by JWT, from protect middleware
    const currentUser = req.user;

    // Find user in DB by username
    const targetUser = await User.findOne({ username: username })

    // Variable that will track if either current user and target user are friends or current user
    // already sent request to targetUser
    let isRequestSent: boolean = false;
    let areFriends: boolean = false
    if (currentUser.username === targetUser?.username) {
        return res.status(400).json({ error: "User cannot be friends with himself!" })
    }
    if (!targetUser?.username) {
        return res.status(400).json({ error: "Target user not found" })
    }


    // Check if user that is logged in already sent a request to targetUser
    if (targetUser.friendRequests) {
        for (const request of targetUser.friendRequests) {
            if (request === currentUser.username) {
                isRequestSent = true;
                break;
            }
        }
    }

    // Check if user that is logged is already friends with targetUser 
    if (targetUser.friends && !isRequestSent) {
        for (const friend of targetUser.friends) {
            if (friend === currentUser.username) {
                areFriends = true;
                break;
            }
        }
    }

    if (!areFriends && !isRequestSent) {
        await User.updateOne(
            { username: targetUser.username },
            { $push: { friendRequests: currentUser.username } }
        )
        res.status(201).json({
            message: `User ${currentUser.username} successfully sent request to ${targetUser?.username}`
        })
    }
    else if (areFriends && !isRequestSent) {
        res.status(400).json({
            message: `User ${currentUser.username} is already friends with ${targetUser?.username}`
        })
    } else {
        res.status(400).json({
            message: `User ${currentUser.username} already sent a request to ${targetUser?.username}`
        })
    }

})

// @desc  Delete received friend request
// @route DELETE "/api/users/:username/deleteSentRequest"

export const deleteReceivedFriendRequest = asyncHandler(async (req: CustomRequest, res: Response) => {
    const username = req.params.username;

    // Find targetUser in DB by username
    const targetUser = await User.findOne({ username: username });

    if (!targetUser) {
        return res.status(404).json({ message: "Target user not found" });
    }

    // Get the target user from the protect middleware
    const currentUser = req.user;

    // Check if the current user received a request from the target user
    if (currentUser?.friendRequests?.includes(targetUser.username)) {
        await User.updateOne(
            { username: currentUser.username },
            { $pull: { friendRequests: targetUser.username } }
        );
        return res.status(200).json({
            message: `User ${targetUser.username} successfully deleted their friend request for ${currentUser?.username}`
        });
    }

    // If the target user never sent a request to the current user, return status 400
    return res.status(400).json({
        message: `Request was not deleted, because ${targetUser.username} never sent a friend request to ${currentUser?.username}`
    });
});


// @desc  Delete sent friend request
// @route DELETE "/api/users/:username/deleteSentFriendRequest"

export const deleteSentFriendRequest = asyncHandler(async (req: CustomRequest, res: Response) => {

    const username = req.params.username;

    // Find user in DB by username
    const targetUser = await User.findOne({ username: username })

    if (!targetUser) {
        return res.status(404).json({ message: "Target user not found" })
    }

    // Get currentUser from protect middleware
    const currentUser = req.user

    // Check if user sent request to targetUser
    if (targetUser?.friendRequests?.includes(currentUser.username)) {
        await User.updateOne(
            { username: targetUser.username },
            { $pull: { friendRequests: currentUser.username } }
        );
        return res.status(200).json({
            message: `User ${currentUser.username} successfully deleted his friend request for ${targetUser?.username}`
        });
    }

    // If user never sent a request to targetUser, return status 400
    return res.status(400).json({
        message: `Request was not deleted, because ${currentUser.username} never sent friend request to ${targetUser?.username}`
    });
});


// @desc  Accept friend request
// @route POST "/api/users/:username/acceptFriendRequest"

export const acceptFriendRequest = asyncHandler(async (req: CustomRequest, res: Response) => {
    const username = req.params.username
    const targetUser = await User.findOne({ username: username })
    const currentUser = req.user
    if (!targetUser) {
        return res.status(400).json({
            message: "Current user cannot accept requests from invalid users!"
        })
    }
    await User.updateOne({ username: currentUser.username },
        {
            $push: { friends: targetUser.username },
            $pull: { friendRequests: targetUser.username }
        })
    await User.updateOne({ username: targetUser.username },
        { $push: { friends: currentUser.username } })


    return res.status(200).json({
        message: `User ${currentUser.username} successfully accepted friend request from ${targetUser?.username}`
    });
})