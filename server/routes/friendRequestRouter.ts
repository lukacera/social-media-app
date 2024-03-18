import { Router } from "express";
const express = require("express");
const router: Router = express.Router()

import { deleteFriendRequest, sendFriendRequest } from "../controllers/friendRequestController";
import { protect } from "../middlewares/authMiddleware";


// ROUTES FOR HANDLING USER'S FRIEND REQUESTS
router
    .route("/:username/friendRequest")
    .post(protect, sendFriendRequest)
    .delete(protect, deleteFriendRequest)

router
    .route("/:username/acceptFriendRequest")
    .post()


export default router