import request from "supertest";
import app from "../app";
import User from "../models/User";
import { generateToken } from "../controllers/authController";
import { Types } from "mongoose";
import { userType } from "../types/userType";

interface customType extends userType {
    _id: Types.ObjectId
}
let currentUser: customType;
let targetUser: userType;
let token: string
describe("Accept friend request", () => {

    // 1. CASE, CURRENT USER SUCCESSFULLY ACCEPTS FRIEND REQUEST FROM TARGET USER
    describe("Accept incoming friend request, success", () => {

        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn",
                friendRequests: ["RandomUseer2"],
                friends: []
            })
            targetUser = await User.create({
                age: 44,
                name: "Bryce",
                surname: "Nolan",
                password: "34trhgfb",
                username: "RandomUseer2",
                friends: []
            })
            token = generateToken(currentUser._id)

        })

        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {

            const response = await request(app)
                .post(`/api/users/${targetUser.username}/acceptFriendRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                message: `User ${currentUser.username} successfully accepted friend request from ${targetUser.username}`
            })

            // Check if both current user and target user have each other in their friends array
            // & that friend request from targetUser is no longer in currentUser's friend requests
            const updatedCurrentUser = await User.findOne({ username: currentUser.username })
            expect(updatedCurrentUser?.friends).toEqual([`${targetUser.username}`])
            expect(updatedCurrentUser?.friendRequests).toEqual([])

            const updatedTargetUser = await User.findOne({ username: targetUser.username });
            expect(updatedTargetUser?.friends).toEqual([`${currentUser.username}`])
        })
    })

    // 2. CASE, CURRENT USER DOES NOT HAVE PENDING REQUEST FROM TARGET USER
    describe("No incoming request from target user, fail case", () => {

        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn",
                friendRequests: [],
                friends: []
            })
            token = generateToken(currentUser._id)

        })

        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post("/api/users/failCas345e/acceptFriendRequest")
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(400)
            expect(response.body).toEqual({
                message: "Current user cannot accept requests from invalid users!"
            })
        })
    })
    // 3. CASE, UNAUTHORIZED USER TRIES TO ACCEPT FRIEND REQUEST, FAIL CASE
    describe("Unauthorized user tries to accept friend request, fail case", () => {

        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn",
                friendRequests: [],
                friends: []
            })
            token = "wrongToken"
        })

        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post("/api/users/failCas345e/acceptFriendRequest")
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body).toEqual({
                error: "Not authorized"
            })
        })
    })

})