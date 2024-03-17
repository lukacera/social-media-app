import request from "supertest";
import app from "../app";
import User from "../models/User";
import { userType } from "../types/userType";
import { generateToken } from "../controllers/authController";


describe("Check send friend request", () => {

    // 1. CASE, SUCCESSFUL FRIEND REQUEST TO TARGET USER
    describe("Send request to user that current user did not send request yet", () => {
        const mockTargetUserData_success: userType = {
            name: 'Celia',
            surname: 'Jeanette',
            age: 34,
            password: 'testPassword',
            username: 'DennisHarvey',
            friendRequests: []
        };
        const mockCurrentUserData_success: userType = {
            name: "Lyons",
            age: 50,
            password: "hdfg23245",
            surname: "Okgo",
            username: "Emilyhatrri"
        }

        let currentUser: any
        let targetUser: userType
        let token: string

        // Initialize users before running test
        beforeAll(async () => {
            currentUser = await User.create(mockCurrentUserData_success)
            targetUser = await User.create(mockTargetUserData_success)
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
        const mockTargetUser_data_requestSentAlready: userType = {
            name: 'Celia',
            surname: 'Jeanette',
            age: 34,
            password: 'testPassword',
            username: 'DennisHarvey',
            friendRequests: ["Emilyhatrri"]
        };
        const mockCurrentUser_data_requestSentAlready: userType = {
            name: "Lyons",
            age: 50,
            password: "hdfg23245",
            surname: "Okgo",
            username: "Emilyhatrri"
        }

        let mockCurrentUser_requestSentAlready: any
        let mockTargetUser_requestSentAlready: userType
        let token: string

        // Initialize users before running test
        beforeAll(async () => {
            mockCurrentUser_requestSentAlready = await User.create(mockCurrentUser_data_requestSentAlready)
            mockTargetUser_requestSentAlready = await User.create(mockTargetUser_data_requestSentAlready)
            token = generateToken(mockCurrentUser_requestSentAlready._id)
        })

        // Delete users after test is completed
        afterAll(async () => {
            await User.deleteOne({ username: mockTargetUser_data_requestSentAlready.username })
            await User.deleteOne({ username: mockCurrentUser_data_requestSentAlready.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post(`/api/users/${mockTargetUser_requestSentAlready.username}/friendRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.body).toEqual({ "message": `User ${mockCurrentUser_data_requestSentAlready.username} already sent a request to ${mockTargetUser_requestSentAlready.username}` })
            expect(response.status).toBe(400)
        })
    })


    // 3. CASE, FRIEND REQUEST FAILED, CURRENT USER IS ALREADY FRIENDS WITH TARGET USER
    describe("Send request to user that current user sent request already", () => {
        const mockTargetUser_data_alreadyFriends: userType = {
            name: 'Celia',
            surname: 'Jeanette',
            age: 34,
            password: 'testPassword',
            username: 'DennisHarvey',
            friends: ["Emilyhatrri"]
        };
        const mockCurrentUser_data_alreadyFriends: userType = {
            name: "Lyons",
            age: 50,
            password: "hdfg23245",
            surname: "Okgo",
            username: "Emilyhatrri"
        }

        let mockCurrentUser_alreadyFriends: any
        let mockTargetUser_alreadyFriends: userType
        let token: string

        // Initialize users before running test
        beforeAll(async () => {
            mockCurrentUser_alreadyFriends = await User.create(mockCurrentUser_data_alreadyFriends)
            mockTargetUser_alreadyFriends = await User.create(mockTargetUser_data_alreadyFriends)
            token = generateToken(mockCurrentUser_alreadyFriends._id)
        })

        // Delete users after test is completed
        afterAll(async () => {
            await User.deleteOne({ username: mockCurrentUser_data_alreadyFriends.username })
            await User.deleteOne({ username: mockTargetUser_data_alreadyFriends.username })
        })

        it("Run test", async () => {
            const response = await request(app)
                .post(`/api/users/${mockTargetUser_data_alreadyFriends.username}/friendRequest`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.body).toEqual({ "message": `User ${mockCurrentUser_data_alreadyFriends.username} is already friends with ${mockTargetUser_data_alreadyFriends.username}` })
            expect(response.status).toBe(400)
        })
    })
})
