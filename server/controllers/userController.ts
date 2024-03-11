import { Request, Response } from "express";
import { Types } from "mongoose";

export const getProfile = (req: Request, res: Response) => {
    const id = req.params.id
    if (!Types.ObjectId.isValid(id)) {
        res.status(404).end()
    } else {
        res.status(200).end()
    }
}

export const editProfile = (req: Request, res: Response) => {
    const id = req.params.id
    if (!Types.ObjectId.isValid(id)) {
        res.status(404).end()
    } else {
        res.status(200).end()
    }
}
export const deleteProfile = (req: Request, res: Response) => {
    const id = req.params.id
    if (!Types.ObjectId.isValid(id)) {
        res.status(404).end()
    } else {
        res.status(204).end()
    }
}

