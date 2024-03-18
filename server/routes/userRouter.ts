import { Router } from "express";

// Controllers functions
import { deleteFriendRequest, sendFriendRequest } from "../controllers/friendRequestController";
import { getUser, deleteUser, editUser, getAllusers } from "../controllers/userController";
const express = require("express");
const router: Router = express.Router()


router
    .route("/")
    .get(getAllusers)


router
    .route("/:username")
    .get(getUser)
    .patch(editUser)
    .delete(deleteUser)


export default router;