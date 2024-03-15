import { Router } from "express";

// Controllers functions
import { deleteFriendRequest, sendFriendRequest } from "../controllers/friendRequestController";
import { getUser, deleteUser, editUser, getAllusers } from "../controllers/userController";
const express = require("express");
const router: Router = express.Router()

// ROUTE FOR HANDLING /PROFILES
router
    .route("/")
    .get(getAllusers)


// ROUTES FOR HANDLING USER'S User
router
    .route("/:username")
    .get(getUser)
    .patch(editUser)
    .delete(deleteUser)



// ROUTES FOR HANDLING FRIEND REQUEST
router
    .route("/:username/friend-request")
    .post(sendFriendRequest)
    .delete(deleteFriendRequest)


export default router;