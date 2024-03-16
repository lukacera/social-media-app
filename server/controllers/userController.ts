import { Request, Response } from "express";
import { isValidObjectId, UpdateWriteOpResult } from "mongoose";
// User model
import User from "../models/User";

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

// @desc  Edit user from DB by ID
// @route PATCH "/api/users/:userID"

export const editUser = async (req: Request, res: Response) => {
    const updates = req.body;
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return res.status(500).json({ error: "Id that client sent is not valid ObjectId!" });
    }
    else {
        if (!updates) {
            return res.status(200).json({ message: "No updates were provided." });
        }
        const result: UpdateWriteOpResult = await User.updateOne(
            { _id: id },
            { $set: updates });

        // Check if there is document with that id
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Couldn't find document with that Id to edit" });
        }

        // Successfully updated
        return res.status(200).json({ message: "Update succesful" });
    }
};


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

