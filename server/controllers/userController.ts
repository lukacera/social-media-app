import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/User";

// GETTING ALL USERS FROM DB
export const getAllusers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users: users
        })
    } catch (error) {
        console.log("Error while getting all users: " + error)
        res.status(404).json({ error: "Error while getting all users from DB" });
    }
}

// GETTING USER FROM DB
export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const targetUser = await User.findById(id)

        res.status(200).json({
            user: targetUser
        })
    } catch (error) {
        console.log("Error while getting User: " + error)
        res.status(404).json({ error: "Error while getting the User from DB" });
    }
}

export const editUser = (req: Request, res: Response) => {
    const id = req.params.id
    if (!Types.ObjectId.isValid(id)) {
        res.status(404).end()
    } else {
        res.status(200).json({
            "status": "Edited!!"
        })
    }
}

// DELETING USER FROM DB
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ "_id": id });

        // Status code for deleting is 204, request has been successful,
        // but nothing was sent back
        res.status(204).end();
    } catch (error) {
        console.log("Error occurred while trying to delete User from DB! ", error);
        res.status(404).json({ error: "Error while deleting the User from DB" });
    }
}

