const express = require("express");
const cors = require("cors")

import { Application, Request, Response } from "express";
const app: Application = express()
require("dotenv").config()


// DB connection function
import { connectToDB } from "./config/connectDB";
// Routers
import userRouter from "./routes/userRouter"
import authRouter from "./routes/authRouter"
import friendReqRouter from "./routes/friendRequestRouter"


connectToDB()

app.use(cors())

// Parse incoming client json requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Loading home page
app.get("/home", (req: Request, res: Response) => {
    res.status(200).end()
});

app.use("/api/users", friendReqRouter, userRouter)

app.use("/api/auth", authRouter)



// If app did not recognize route till this point, it means it's 404
app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Page does not exists")
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is live!")
})

export default app