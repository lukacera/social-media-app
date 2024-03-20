import { Request, Response } from "express";
import User from "../models/User";
import { userType } from "../types/userType";
import CustomRequest from "../config/customRequest";
const asyncHandler = require("express-async-handler")

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

    // User can't change his password
    if (updates.password || updates.username) {
        return res.status(400).json({ message: "User cannot change his password or username" })
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

// @desc Update user's profile image
// @route PATCH "/api/users/:username/updateImg" 

export const updateUserImg = asyncHandler(async (req: CustomRequest, res: Response) => {

    // Extract necessary data from the request
    const username = req.params.username;

    if (req.user.username !== username) {
        return res.status(401).json({ message: "User can only edit his profile picture!" })
    }

    // Uploaded file data
    const file = req.file;

    // Check if a file was uploaded
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Update the user's profile image field directly in the database
    await User.updateOne({ username }, { avatar: file.path });

    // Respond with a success message
    res.status(200).json({ message: 'Profile image updated successfully' });

});


