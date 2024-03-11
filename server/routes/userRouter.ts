import { Router } from "express";
import { Request, Response } from "express";
import { Types } from "mongoose";
// Controllers functions
import { deleteFriendRequest, sendFriendRequest } from "../controllers/friendRequestController";
import { getProfile, deleteProfile, editProfile } from "../controllers/userController";
const express = require("express");
const router: Router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Success!")
})

router
    .route("/:id")
    .get(getProfile)
    .patch(editProfile)
    .delete(deleteProfile)

// ROUTES FOR HANDLING FRIEND REQUEST
router
    .route("/:id/friend-request")
    .post(sendFriendRequest)
    .delete(deleteFriendRequest)

export default router;