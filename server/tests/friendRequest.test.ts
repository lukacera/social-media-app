import request from "supertest";
import app from "../app";
import User from "../models/User";

describe("Check send friend request", () => {
    describe("Sends friend request to username that is existing", () => {
        const userData = {
            name: 'Test',
            surname: 'User',
            age: 30,
            birthday: new Date(),
            password: 'testPassword',
            username: 'testUsername123',
            avatar: ''
        };
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
