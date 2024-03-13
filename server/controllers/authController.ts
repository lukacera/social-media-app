import { Request, Response } from "express"
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

import User from "../models/User"
import { userType } from "../types/userType"
import { Types } from "mongoose";


// @desc GENERATE JWT

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10d"
    })
}

// @desc  Create new user and add it to DB
// @route POST "/api/auth/signUp"

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { age, name, surname, password, username } = req.body
    // Check if username is taken, if it's not, make new user
    if (!age || !name || !surname || !username || !password) {
        return res.status(400).json({ message: "Please provide all info for user!" })
    }

    // Check if the username is already taken by some other USER
    const usernameTaken = await User.findOne({ username: username })
    if (!usernameTaken) {

        // HASH PASSWORD
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt)

        const user = new User<userType>({
            age: age,
            name: name,
            surname: surname,
            password: hashedPassword,
            username: username,
            avatar: req.body.avatar || ""
        })

        await user.save()
        res.status(201).json({
            message: "User created successfully",
            hashedPassword: hashedPassword,
            token: generateToken(user._id)
        })
        return
    }

    // 409 status means that there was a conflict( username is already taken )
    res.status(409).json({ error: "Username is already taken" });
})

// @desc  Create new user and add it to DB
// @route POST "/api/auth/login"

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await User.findOne({ username: username })

    // If user is found and password is correct(using compare function
    // from bycrypt), log user in
    if (user && (await bycrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            username: "User's username is:" + user.username,
            token: generateToken(user._id)
        })
        return
    }

    res.status(400).json({ error: "Invalid credentials!" })
})