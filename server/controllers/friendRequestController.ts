import { Request, Response } from "express";
import { Types } from "mongoose";


export const sendFriendRequest = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
        res.status(404).end()
    } else {
        res.status(500).end()
    }
}
export const deleteFriendRequest = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
        res.status(404).end()
    } else {
        res.status(204).end()
    }
};

