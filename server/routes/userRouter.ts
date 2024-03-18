import { Router } from "express";

// Controllers functions
import { deleteFriendRequest, sendFriendRequest, acceptFriendRequest } from "../controllers/friendRequestController";
import { getUser, deleteUser, editUser, getAllusers } from "../controllers/userController";
const express = require("express");
const router: Router = express.Router()
import { protect } from "../middlewares/authMiddleware";

// ROUTES FOR HANDLING USER'S FRIEND REQUESTS
router
    .route("/:username/friendRequest")
    .post(protect, sendFriendRequest)
    .delete(protect, deleteFriendRequest)

router
    .route("/:username/acceptFriendRequest")
    .post(protect, acceptFriendRequest)

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




export default router;