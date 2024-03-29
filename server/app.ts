const express = require("express");
import allowCors from "./config/allowCors";
import { Application, Request, Response } from "express";
const app: Application = express();

require("dotenv").config();
import { connectToDB } from "./config/connectDB";

// Routers
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import postRouter from "./routes/postRouter";

import { Server, Socket } from "socket.io";
import { createServer } from "http";

// Middlewares
connectToDB();
app.use(allowCors);

app.use("/uploads", express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.get("/home", (req: Request, res: Response) => {
    res.status(200).end();
});

// If the app did not recognize the route till this point, it means it's a 404
app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Page does not exist");
});

// Socket.io
const httpServer = createServer(app); // Attach Express app to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173",
            "https://social-media-app-kohl-seven.vercel.app",
        ]
    }
});

io.on("connection", (socket: Socket) => {

    console.log("User connected!");

    socket.on("disconnect", () => {
        console.log("A user disconnected!");
    });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    console.log("Server is live!");
});

export { app, io };
