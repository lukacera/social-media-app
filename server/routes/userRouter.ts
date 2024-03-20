import { Router } from "express";

// Controllers functions
import { sendFriendRequest, acceptFriendRequest, deleteReceivedFriendRequest, deleteSentFriendRequest } from "../controllers/friendRequestController";
import { getUser, editUser, getAllusers, updateUserImg } from "../controllers/userController";
const express = require("express");
const router: Router = express.Router()
import { upload } from "../config/multerConfig"
import { protect } from "../middlewares/authMiddleware";

// ROUTE FOR GETTING ALL USERS
router
    .route("/")
    .get(getAllusers)


// ROUTES FOR HANDLING CRUD FOR SINGLE USER
router
    .route("/:username")
    .get(getUser)
    .patch(protect, editUser)


// ROUTE FOR UPDATING USER'S PROFILE IMAGE
router
    .route("/:username/updateImg")
    .patch(protect, upload.single("profileImg"), updateUserImg)


// ROUTES FOR HANDLING USER'S FRIEND REQUESTS

router
    .route("/:username/friendRequest")
    .post(protect, sendFriendRequest)


router
    .route("/:username/deleteReceivedRequest")
    .delete(protect, deleteReceivedFriendRequest)


router
    .route("/:username/deleteSentRequest")
    .delete(protect, deleteSentFriendRequest)


router
    .route("/:username/acceptFriendRequest")
    .post(protect, acceptFriendRequest)


export default router;