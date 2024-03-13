import { Request, Response } from "express"
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

import User from "../models/User"
import { userType } from "../types/userType"


// @desc  Create new user and add it to DB
// @route POST "/api/auth/signUp"

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { age, name, surname, password, username } = req.body
    console.log("Req.body: " + req.body)
    // Check if username is taken, if it's not, make new user
    if (!age || !name || !surname || !username || !password) {
        return res.status(400).json({ message: "Please provide all info for user!" })
    }

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
})

// @desc  Create new user and add it to DB
// @route POST "/api/auth/login"


export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ name: "Bosko" })
    console.log(user)
    const accessToken = jwt.sign(user?.username, process.env.ACCESS_TOKEN_SECRET)
    res.json({
        message: "Login User!",
        user: user,
        accessToken: accessToken
    })
})