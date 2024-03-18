import request from "supertest";
import app from "../app";
import User from "../models/User";
import { userType } from "../types/userType";
import { generateToken } from "../controllers/authController";
import { Types } from "mongoose";


interface customType extends userType {
    _id: Types.ObjectId
}
let currentUser: customType;
let targetUser: userType;
let token: string


describe("Check send friend request", () => {

    // Extend userType with ObjectId, used for generating JWT

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
    describe("Send request to user that currentUser is already friends with", () => {

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



