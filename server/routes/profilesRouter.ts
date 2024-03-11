import { Router } from "express";
import { Request, Response } from "express";
const express = require("express");
const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Success!")
})

router
    .route("/:id")
    .get((req: Request, res: Response) => {
        const id = req.params.id
        res.status(200).send(id)
    })
    .patch((req: Request, res: Response) => {
        const id = req.params.id
        res.status(200).send(id)
    })
    .delete((req: Request, res: Response) => {
        const id = req.params.id
        res.status(204).send(id)
    })

export default router;