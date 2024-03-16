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
    const targetUser = await User.findOne({ username: username })
    // Variable that will track if either current user and target user are friends or current user
    // already sent request to targetUser
    let areFriends_isRequestSent: boolean = false;
    if (currentUser.username === targetUser?.username) {
        return res.status(400).json({ error: "User cannot be friends with himself!" })
    }
    if (!targetUser?.username) {
        return res.status(400).json({ error: "Target user not found!" })
    }
    // Check if user that is logged in already sent a request to targetUser 
    if (currentUser.friendRequests) {
        for (const request of currentUser.friendRequests) {
            if (request.username === targetUser?.username) {
                areFriends_isRequestSent = true;
                break;
            }
        }
    }

    // Check if user that is logged is already friends with targetUser 
    if (currentUser.friends && !areFriends_isRequestSent) {
        for (const friend of currentUser.friends) {
            if (friend.username === targetUser?.username) {
                areFriends_isRequestSent = true;
                break;
            }
        }
    }

    if (!areFriends_isRequestSent) {
        res.status(201).json({
            message: `User ${currentUser.username} successfully sent request to ${targetUser?.username}`
        })
    } else {
        res.status(400).json({
            message: `User ${currentUser.username} is not able to send request to ${targetUser?.username}`
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

