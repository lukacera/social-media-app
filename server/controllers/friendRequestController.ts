import { Request, Response } from "express";
const asyncHandler = require("express-async-handler")
import { Types } from "mongoose";
import User from "../models/User"
import { userType } from "../types/userType";
// @desc  Send friend request to other user by username
// @route POST "/api/users/:username/friendRequest"

export const sendFriendRequest = asyncHandler(async (req: Request, res: Response) => {
    const username = req.params.username;
    //const user: userType = User.findOne({username: username})
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

