import request from "supertest";
import app from "../app";
import { Types } from "mongoose";
// Types of data

// Models
import User from "../models/User"

describe('Check "/home" route', () => {
    it('It loads home page, FAIL!', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(404);
    });
    it('It loads home page, SUCCESS!', async () => {
        const response = await request(app).get('/home')
        expect(response.status).toBe(200);
    });
});
describe('Check "/profiles" route', () => {
    afterEach(() => {
        // Restore the original implementation after each test
        jest.restoreAllMocks();
    });
    // 1. CLIENT REQUESTS ALL USERS FROM DB
    it('Loads all users, SUCCESS!', async () => {
        const mockUsers = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
        jest.spyOn(User, 'find').mockResolvedValueOnce(mockUsers);

        const response = await request(app).get('/profiles');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ users: mockUsers });
    });
    // 2. DB FAILS TO GET ALL USERS TO CLIENT
    it('Loads all users, FAIL!', async () => {
        const mockUsers = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
        jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Failed to get all users!'));

        const response = await request(app).get('/profiles');
        expect(response.status).toBe(404);
    });
});


describe('Check "/profiles/:id" route', () => {

    // 1. CLIENT REQUESTS TO GET USER THAT IS NONEXISTING IN DB
    it('GET method single profile, 404', async () => {
        // Wrong id
        const userId = 'sampleUserId';
        const response = await request(app).get(`/profiles/${userId}`);
        expect(response.status).toBe(404)
    });

    // 2. CLIENT REQUESTS FOR USER THAT IS IN DB
    it('GET method single profile, 200', async () => {

        const userId = new Types.ObjectId();
        const targetUser = { name: "Luka", age: 99 }
        jest.spyOn(User, 'findById').mockResolvedValueOnce(targetUser);

        const response = await request(app).get(`/profiles/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ user: targetUser });
    });

    it("EDIT user's profile, bad ID", async () => {
        // Wrong id
        const userId = 'sampleUserId';
        const response = await request(app).patch(`/profiles/${userId}`);
        expect(response.status).toBe(404)
    })
    it("EDIT user's profile, good ID", async () => {
        // Good id
        const userId = new Types.ObjectId();
        const response = await request(app).patch(`/profiles/${userId}`);
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ "status": "Edited!!" })
    })

    // 1. CLIENT REQUESTS TO DELETE USER THAT IS NONEXISTENT IN DB
    it("DELETE user's profile, FAIL", async () => {

        const userId = "invalidUserID";
        jest.spyOn(User, 'deleteOne').mockRejectedValueOnce(new Error("Invalid user ID"));

        const response = await request(app).get(`/profiles/${userId}`);

        expect(response.status).toBe(404);
    });

    // 2. CLIENT REQUESTS TO DELETE USER THAT IS IN DB
    it("DELETE user's profile, SUCCESS", async () => {
        const userId = new Types.ObjectId()
        // Delete returns acknowledged and deletedCount
        jest.spyOn(User, 'deleteOne').mockResolvedValueOnce({
            acknowledged: true,
            deletedCount: 1
        });
        const response = await request(app).delete(`/profiles/${userId}`);
        expect(response.status).toBe(204)
    });
});


describe('Handle friend requests', () => {
    it("Sends friend request with false ID", async () => {
        // Wrong id
        const userId = 'kdfks324324';
        const response = await request(app).post(`/profiles/${userId}/friend-request`)
        expect(response.status).toBe(404)
    })
    it("Sends friend request, good ID", async () => {
        // Good id
        const userId = new Types.ObjectId();
        const response = await request(app).post(`/profiles/${userId}/friend-request`)
        expect(response.status).toBe(201);
    })


    it("Deletes friend request, bad ID", async () => {
        // Wrong id
        const userId = 'kdfks324324';
        const response = await request(app).delete(`/profiles/${userId}/friend-request`)
        expect(response.status).toBe(404);
    })
    it("Deletes friend request, good ID", async () => {
        // Good id
        const userId = new Types.ObjectId();
        const response = await request(app).delete(`/profiles/${userId}/friend-request`)
        expect(response.status).toBe(204)
    })
})