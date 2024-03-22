const express = require("express");
import allowCors from "./config/allowCors";
import { Application, Request, Response } from "express";
const app: Application = express()
require("dotenv").config()
import { connectToDB } from "./config/connectDB";

// Routers
import userRouter from "./routes/userRouter"
import authRouter from "./routes/authRouter"
import postRouter from "./routes/postRouter"



// Middlewares
connectToDB()

app.use("/uploads", express.static('uploads'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.get("/home", (req: Request, res: Response) => {
    res.status(200).end()
});
app.use(allowCors);


// If app did not recognize route till this point, it means it's 404
app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Page does not exists")
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is live!")
})

export default app