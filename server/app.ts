const express = require("express");
const app = express()
require("dotenv").config()
import { Request, Response } from "express";
const cors = require("cors")
const mongoose = require("mongoose")


app.use(cors())
app.use(express.json())

const mongoDB: string = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/mydatabase"

mongoose.connect(mongoDB)
    .then(() => console.log("Connected to db!"))
    .catch((error: Error) => console.error("Error connecting to db:", error));

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Ok")
});
app.get("/profiles", (req: Request, res: Response) => {
    res.status(200).send("Ok")
});
app.get("/profiles/:id", (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send(id)
})
const PORT = process.env.PORT || 5000;


export default app