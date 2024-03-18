import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import User from "../models/User";
import { userType } from "../types/userType";
const asyncHandler = require("express-async-handler")

interface CustomRequest extends Request {
    user: userType
}
// @desc  Get all users from DB
// @route GET "/api/users"

export const getAllusers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users: users
        })
    } catch (error) {
        console.error("Error while getting all users: " + error)
        res.status(400).json({ error: "Error while getting all users from DB" });
    }
}

// @desc  Get user from DB by username
// @route GET "/api/users/:username"

export const getUser = async (req: Request, res: Response) => {
    const username = req.params.username;
    if (username) {
        try {
            const targetUser = await User.findOne({ username: username }) // Try to find user in DB
                .populate("friends")
                .populate("friendRequests")

            if (!targetUser) {
                res.status(404).json({ error: "User not found" })
                return
            }
            res.status(200).json({  // If he is founded, return him to client
                user: targetUser
            })
        } catch (error) {
            console.log("Error while getting user from DB! " + error)
        }

    } else { // Username not provided
        res.status(404).json({ error: "OPERATION FOR GETTING USER FROM DB FAILED" });
    }
}

// @desc  Edit currentUser
// @route PATCH "/api/users/:username"

export const editUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    const updates: userType = req.body;
    const currentUser = req.user;


    // Check if client is trying to edit user that exists in DB

    const usernameParams = req.params.username;
    const userFromParams = await User.findOne({ username: usernameParams })
    if (!userFromParams) {
        return res.status(400).json({ message: "User not found" })
    }

    // User cannot change his password
    if (updates.password) {
        return res.status(400).json({ message: "User cannot change his password" })
    }

    // Check if user wants to update his username with same username
    if (updates.username && updates.username === currentUser.username) {
        console.log(updates.username)
        return res.status(400).json({ message: "User tried to update his username with the same username" })
    }

    // Check if username that user wants to update his profile with is already taken
    if (updates.username) {
        const isUsernameTaken = await User.findOne({ username: updates.username })
        console.log(isUsernameTaken)
        if (isUsernameTaken) {
            return res.status(400).json({ message: "Username is already taken!" })
        }
    }


    // Check if client is trying to edit only his profile
    if (userFromParams?.username !== currentUser.username) {
        return res.status(400).json({ message: "Current user can edit only his profile" });
    }

    // Check if updates were provided
    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No updates were provided" });
    }

    // Update user
    const result = await User.updateOne(
        { username: currentUser.username },
        { $set: updates });


    // Check if update failed
    if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Update failed! No documents were updated!" });
    }

    // Successfully updated
    return res.status(200).json({ message: "Update succesful" });
});


// @desc  Delete user from DB by id
// @route DELETE "/api/users/:userID"

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (isValidObjectId(id)) {
            await User.deleteOne({ "_id": id });

            // Status code for deleting is 204, request has been successful,
            // but nothing is sent back
            res.status(204).json({ message: `User with id: ${id} is successfully deleted` });
            return
        }
        // If id is not type of ObjectId
        res.status(404).json({ error: "Id is not ObjectId!" });

    } catch (error) {
        res.status(404).json({ error: "Error while deleting User from DB" });
    }
}

