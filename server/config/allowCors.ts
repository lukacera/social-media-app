import { Request, Response, NextFunction, Application } from "express";
import authRouter from "../routes/authRouter";
import postRouter from "../routes/postRouter";
import userRouter from "../routes/userRouter";
const express = require("express");

const app: Application = express()
const allowCors = (fn: (req: Request, res: Response) => Promise<void> | void) => async (
    req: Request,
    res: Response,
) => {

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    await fn(req, res);
};

const handler = async (req: Request, res: Response) => {
    app.use("/api/users", userRouter)
    app.use("/api/auth", authRouter)
    app.use("/api/posts", postRouter)
    app.get("/home", (req: Request, res: Response) => {
        res.status(200).end()
    });
    res.end("Okkkkkkkk");
};

export default allowCors(handler);
