import { Router } from "express";

// Controllers functions
import { sendFriendRequest, acceptFriendRequest, deleteReceivedFriendRequest, deleteSentFriendRequest } from "../controllers/friendRequestController";
import { getUser, deleteUser, editUser, getAllusers, updateUserImg } from "../controllers/userController";
const express = require("express");
const router: Router = express.Router()
import { Multer, FileFilterCallback } from "multer";

import { protect } from "../middlewares/authMiddleware";
const multer = require("multer")


// Define required multer options for storage

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage: Multer = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        cb(null, "./uploads/");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// Filter files, so that only images are accepted
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload: Multer = multer({
    storage: storage,
    fileFilter: fileFilter
})


// ROUTE FOR GETTING ALL USERS
router
    .route("/")
    .get(getAllusers)


// ROUTES FOR HANDLING CRUD FOR SINGLE USER
router
    .route("/:username")
    .get(getUser)
    .patch(protect, editUser)
    .delete(deleteUser)


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