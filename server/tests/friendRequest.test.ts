import request from "supertest";
import app from "../app";
import User from "../models/User";
import { userType } from "../types/userType";
import { generateToken } from "../controllers/authController";
import { Types } from "mongoose";


describe("Check send friend request", () => {

    // Extend userType with ObjectId, used for generating JWT
    interface customType extends userType {
        _id: Types.ObjectId
    }
    let currentUser: customType;
    let targetUser: userType;
    let token: string
    // 1. CASE, SUCCESSFUL FRIEND REQUEST TO TARGET USER
    describe("Send request to user that current user did not send request yet", () => {

        // Initialize users before running test
        beforeAll(async () => {
            currentUser = await User.create({
                name: "Lyons",
                age: 50,
                password: "hdfg23245",
                surname: "Okgo",
                username: "Emilyhatrri"
            })
            targetUser = await User.create({
                name: 'Celia',
                surname: 'Jeanette',
                age: 34,
                password: 'testPassword',
                username: 'DennisHarvey',
                friendRequests: []
            })
            token = generateToken(currentUser._id)
        })

        // Delete users after test is completed
        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post(`/api/users/${targetUser.username}/friendRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.body).toEqual({ "message": `User ${currentUser.username} successfully sent request to ${targetUser.username}` })
            expect(response.status).toBe(201)
        })
    })


    // 2. CASE, FRIEND REQUEST FAILED, CURRENT USER ALREADY SENT REQUEST TO TARGET USER
    describe("Send request to user that current user sent request already", () => {

        // Initialize users before running test
        beforeAll(async () => {
            currentUser = await User.create({
                name: "Lyons",
                age: 50,
                password: "hdfg23245",
                surname: "Okgo",
                username: "Emilyhatrri"
            })
            targetUser = await User.create({
                name: 'Celia',
                surname: 'Jeanette',
                age: 34,
                password: 'testPassword',
                username: 'DennisHarvey',
                friendRequests: ["Emilyhatrri"]
            })
            token = generateToken(currentUser._id)
        })

        // Delete users after test is completed
        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post(`/api/users/${targetUser.username}/friendRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.body).toEqual({ "message": `User ${currentUser.username} already sent a request to ${targetUser.username}` })
            expect(response.status).toBe(400)
        })
    })


    // 3. CASE, FRIEND REQUEST FAILED, CURRENT USER IS ALREADY FRIENDS WITH TARGET USER
    describe("Send request to user that current user sent request already", () => {

        // Mock users before test
        beforeAll(async () => {
            currentUser = await User.create({
                name: "Lyons",
                age: 50,
                password: "hdfg23245",
                surname: "Okgo",
                username: "Emilyhatrri"
            }
            )
            targetUser = await User.create({
                name: 'Celia',
                surname: 'Jeanette',
                age: 34,
                password: 'testPassword',
                username: 'DennisHarvey',
                friends: ["Emilyhatrri"]
            })
            token = generateToken(currentUser._id)
        })

        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
            await User.deleteOne({ username: targetUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post(`/api/users/${targetUser.username}/friendRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.body).toEqual({ "message": `User ${currentUser.username} is already friends with ${targetUser.username}` })
            expect(response.status).toBe(400)
        })
    })

    // 4. CASE, THERE IS NO USER THAT IS LOGGED IN, STATUS CODE 401
    describe("Send request, but no user is logged in, 401 code", () => {
        it("Run test", async () => {
            const response = await request(app)
                .post(`/api/users/randomUser/friendRequest`)
            expect(response.status).toBe(401)
        })

    })

    // 5. CASE, THERE IS NO USER WITH USERNAME FROM PARAMS(TARGET USER)
    describe("Send request, but target user is not found in DB", () => {

        beforeAll(async () => {
            currentUser = await User.create({
                name: "Lyons",
                age: 50,
                password: "hdfg23245",
                surname: "Okgo",
                username: "Emilyhatrri"
            }
            )
            token = generateToken(currentUser._id)
        })
        afterAll(async () => {
            await User.deleteOne({ username: currentUser.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post(`/api/users/EnigmaticEtherealExplorer124325/friendRequest`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(400)
            expect(response.body).toEqual({ error: "Target user not found" })
        })
    })
})


describe("Check delete request", () => {
    interface customType extends userType {
        _id: Types.ObjectId
    }
    let currentUser: customType;
    let targetUser: userType;
    let token: string

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
                .delete(`/api/users/${targetUser.username}/friendRequest`)
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
                .delete(`/api/users/${targetUser.username}/friendRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(400)
            expect(response.body).toEqual({
                message: `Request was not deleted, because ${currentUser.username} never sent friend request to ${targetUser.username}`
            })
        })
    })

    // 3. CASE, TRY TO DELETE REQUEST TO INVALID USER
    describe("Delete friend request, but no request was ever sent to targetUser, fail case", () => {

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
                .delete(`/api/users/${targetUser.username}/friendRequest`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(404)
            expect(response.body).toEqual({
                message: "Target user not found"
            })
        })
    })

    // 4. CASE, INVALID JWT
    describe("Delete friend request, but no request was ever sent to targetUser, fail case", () => {

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
                .delete(`/api/users/${targetUser.username}/friendRequest`)
                .set("Authorization", `Bearer ${token}`)

            // 401 status code if authorization failed
            expect(response.status).toBe(401)
        })
    })

    // 5. CASE, NO TOKEN PROVIDED
    describe("Delete friend request, but no request was ever sent to targetUser, fail case", () => {

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
                .delete(`/api/users/${targetUser.username}/friendRequest`)

            // 401 status code if authorization failed
            expect(response.status).toBe(401)
        })
    })
})