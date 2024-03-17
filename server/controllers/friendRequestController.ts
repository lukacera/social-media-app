import { Request, Response } from "express";
const asyncHandler = require("express-async-handler")
import { Types } from "mongoose";
import User from "../models/User"
import { userType } from "../types/userType";




interface CustomRequest extends Request {
    user: {
        friendRequests: userType[],
        friends: userType[],
        username: string
    }
}

// @desc  Send friend request to other user by username
// @route POST "/api/users/:username/friendRequest"

export const sendFriendRequest = asyncHandler(async (req: CustomRequest, res: Response) => {
    const username = req.params.username;
    const currentUser = req.user;

    // Find user in DB by username, and populate friendRequests
    const targetUser = await User.findOne({ username: username })

    // Variable that will track if either current user and target user are friends or current user
    // already sent request to targetUser
    let isRequestSent: boolean = false;
    let areFriends: boolean = false
    if (currentUser.username === targetUser?.username) {
        return res.status(400).json({ error: "User cannot be friends with himself!" })
    }
    if (!targetUser?.username) {
        return res.status(400).json({ error: "Target user not found!" })
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
    if (currentUser.friends && !isRequestSent) {
        for (const friend of currentUser.friends) {
            if (friend.username === targetUser?.username) {
                areFriends = true;
                break;
            }
        }
    }

    if (!areFriends && !isRequestSent) {
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
// @desc  Get user from DB by username
// @route DELETE "/api/users/:username/friendRequest"
export const deleteFriendRequest = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
        res.status(404).end()
    } else {
        res.status(204).end()
    }
};

