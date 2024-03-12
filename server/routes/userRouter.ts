import { Router } from "express";
import { Request, Response } from "express";

// Controllers functions
import { deleteFriendRequest, sendFriendRequest } from "../controllers/friendRequestController";
import { getUser, deleteUser, editUser, getAllusers, newUser } from "../controllers/userController";
const express = require("express");
const router: Router = express.Router()

// ROUTE FOR HANDLING /PROFILES
router
    .route("/")
    .get(getAllusers)
    .post(newUser)

// ROUTES FOR HANDLING USER'S User

router
    .route("/:id")
    .get(getUser)
    .patch(editUser)
    .delete(deleteUser)

// ROUTES FOR HANDLING FRIEND REQUEST

router
    .route("/:id/friend-request")
    .post(sendFriendRequest)
    .delete(deleteFriendRequest)


export default router;