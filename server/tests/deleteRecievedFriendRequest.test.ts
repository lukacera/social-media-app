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

describe("Check received delete request", () => {

    // 1. CASE, DELETE REQUEST FROM USER THAT IS IN DB, SUCCESS CASE
    describe("Delete friend request, success", () => {
        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn",
                friendRequests: ["Jokkop"]
            })
            targetUser = await User.create({
                age: 44,
                name: "Bryce",
                surname: "Nolan",
                password: "34trhgfb",
                username: "Jokkop"
            })
            token = generateToken(currentUser._id)
        })
        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })
        it("Run test", async () => {
            const response = await request(app)
                .delete(`/api/users/${targetUser.username}/deleteReceivedRequest`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                message: `User ${targetUser.username} successfully deleted their friend request for ${currentUser.username}`
            })

            const updatedCurrentUser = await User.findOne({ username: currentUser.username });
            expect(updatedCurrentUser?.friendRequests).toEqual([]);
        })
    })

    // 2. CASE, TRY TO DELETE REQUEST TO USER, BUT REQUEST WAS NEVER SENT
    describe("Delete friend request, but targetUser never sent request to currentUser, fail case", () => {

        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn",
                friendRequests: []
            })
            // Initialize targetUser with no friend requests
            targetUser = await User.create({
                age: 44,
                name: "Bryce",
                surname: "Nolan",
                password: "34trhgfb",
                username: "Jokkop",
            })
            token = generateToken(currentUser._id)
        })

        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .delete(`/api/users/${targetUser.username}/deleteReceivedRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(400)
            expect(response.body).toEqual({
                message: `Request was not deleted, because ${targetUser.username} never sent a friend request to ${currentUser.username}`
            })
        })
    })

    // 3. CASE, TRY TO DELETE REQUEST TO INVALID USER
    describe("Delete friend request, but targetUser is invalid, fail case", () => {

        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn"
            })
            token = generateToken(currentUser._id)
        })

        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .delete(`/api/users/${targetUser.username}/deleteReceivedRequest`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(404)
            expect(response.body).toEqual({
                message: "Target user not found"
            })
        })
    })

    // 4. CASE, INVALID JWT
    describe("Delete friend request, but authorization failed, fail case", () => {

        beforeAll(async () => {
            targetUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn"
            })
            token = "wrongToken"
        })

        afterAll(async () => {
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .delete(`/api/users/${targetUser.username}/deleteReceivedRequest`)
                .set("Authorization", `Bearer ${token}`)

            // 401 status code if authorization failed
            expect(response.status).toBe(401)
        })
    })

    // 5. CASE, NO TOKEN PROVIDED
    describe("Delete friend request, but there is no currentUser, fail case", () => {

        beforeAll(async () => {
            targetUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn"
            })
        })

        afterAll(async () => {
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .delete(`/api/users/${targetUser.username}/deleteReceivedRequest`)

            // 401 status code if authorization failed
            expect(response.status).toBe(401)
        })
    })
})

