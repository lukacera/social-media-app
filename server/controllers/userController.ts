import { Request, Response } from "express";
import { Query, Types, isValidObjectId, UpdateWriteOpResult } from "mongoose";
// User model
import User from "../models/User";

// User type
import { userType } from "../types/userType";

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
    if (isValidObjectId(id)) {
        const targetUser = await User.findById(id) // Try to find user in DB
        if (!targetUser) {
            res.status(404).json({ error: "User not found" })
            return
        }
        res.status(200).json({  // If he is founded, return him to client
            user: targetUser
        })
    } else { // If id is not ObjectID

        res.status(404).json({ error: "ID for GETTING USER from DB is invalid" });
    }
}

// EDIT USER FROM DB
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

// MAKE NEW USER AND INSERT IT INTO DB

export const newUser = async (req: Request, res: Response) => {
    try {
        const { age, name, surname, password, username } = req.body

        // Check if username is taken, if it's not, make new user
        const usernameTaken = await User.findOne({ username: username })
        if (!usernameTaken) {
            const user = new User<userType>({
                age: age,
                name: name,
                surname: surname,
                password: password,
                username: username,
                avatar: req.body.avatar || ""
            })
            await user.save()

            res.status(201).json({ message: "User created successfully" })
            return
        }
        // 409 status means that there was a conflict( username is already taken )
        res.status(409).json({ error: "Username is already taken" });

    } catch (error) {
        console.log("Error occured on adding newUser to DB")
        res.status(404).json({ error: "Error while adding new User from DB" })
    }
}

// DELETING USER FROM DB
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

