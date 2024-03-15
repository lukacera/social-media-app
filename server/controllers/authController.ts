import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
const bycrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

import User from "../models/User"
import { userType } from "../types/userType"
import { Types } from "mongoose";


// @desc GENERATE JWT TOKEN

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET || "", {
        expiresIn: "1d"
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
            username: username
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
    if (!username || !password) return res.status(400).json({ error: "Please provide all credentials!" })
    const user = await User.findOne({ username: username })

    if (user) {
        // Returns boolean
        const checkPassword = await bycrypt.compare(password, user.password);

        // If password is not correct, return status 400
        if (!checkPassword) {
            return res.status(400).json({
                error: "Password is incorrect"
            })
        }

        // Everything is correct, send data
        res.status(200).json({
            userData: {
                _id: user.id,
                name: user.name,
                surname: user.surname,
                username: user.username,
                token: generateToken(user._id)
            }

        })
        return
    }
    // Username not found
    res.status(400).json({ error: "Invalid username" })
})


// Extend request with user, that is added with protect middleware
interface CustomRequest extends Request {
    user: unknown
}

// @desc Send all info about user that is logged in with json
// @route "/api/auth/myProfile"

export const getMyProfile = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    res.status(200).json({ usersData: req.user })
})