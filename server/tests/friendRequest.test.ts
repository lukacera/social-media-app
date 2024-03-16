import request from "supertest";
import app from "../app";
import User from "../models/User";
import { userType } from "../types/userType";
describe("Check send friend request", () => {
    describe("Sends friend request to user that is existing and still not friends", () => {
        const userData: userType = {
            name: 'Celia',
            surname: 'Jeanette',
            age: 34,
            password: 'testPassword',
            username: 'DennisHarvey'
        };
        const currentUserData: userType = {
            name: "Lyons",
            age: 50,
            password: "hdfg23245",
            surname: "Okgo",
            username: "Emilyhatrri",
            friendRequests: []
        }
        let username: string
        beforeAll(async () => {
            const user = await User.create(userData)
            username = user.username
        })
        afterAll(async () => {
            await User.deleteOne({ username: username })
        })
        it("Run test", async () => {
            const response = await request(app).post(`/api/users/${username}/friendRequest`);
            expect(response.status).toBe(200)
        })
    })

})
