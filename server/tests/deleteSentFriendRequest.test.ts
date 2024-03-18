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

describe("Check delete request", () => {

    // 1. CASE, DELETE REQUEST TO USER THAT IS IN DB, SUCCESS CASE
    describe("Delete friend request, success", () => {
        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn"
            })
            targetUser = await User.create({
                age: 44,
                name: "Bryce",
                surname: "Nolan",
                password: "34trhgfb",
                username: "Jokkop",
                friendRequests: ["Johnnn"]
            })
            token = generateToken(currentUser._id)
        })
        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })
        it("Run test", async () => {
            const response = await request(app)
                .delete(`/api/users/${targetUser.username}/deleteSentRequest`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                message: `User ${currentUser.username} successfully deleted his friend request for ${targetUser.username}`
            })

            const updatedTargetUser = await User.findOne({ username: targetUser.username });
            expect(updatedTargetUser?.friendRequests).toEqual([]);
        })
    })

    // 2. CASE, TRY TO DELETE REQUEST TO USER, BUT REQUEST WAS NEVER SENT
    describe("Delete friend request, but no request was ever sent to targetUser, fail case", () => {

        beforeAll(async () => {
            currentUser = await User.create({
                age: 44,
                name: "Jonathan",
                surname: "Smith",
                password: "randomPassword",
                username: "Johnnn"
            })
            // Initialize targetUser with no friend requests
            targetUser = await User.create({
                age: 44,
                name: "Bryce",
                surname: "Nolan",
                password: "34trhgfb",
                username: "Jokkop",
                friendRequests: []
            })
            token = generateToken(currentUser._id)
        })

        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .delete(`/api/users/${targetUser.username}/deleteSentRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(400)
            expect(response.body).toEqual({
                message: `Request was not deleted, because ${currentUser.username} never sent friend request to ${targetUser.username}`
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
                .delete(`/api/users/${targetUser.username}/deleteSentRequest`)
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
                .delete(`/api/users/${targetUser.username}/deleteSentRequest`)
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
                .delete(`/api/users/${targetUser.username}/deleteSentRequest`)

            // 401 status code if authorization failed
            expect(response.status).toBe(401)
        })
    })
})

