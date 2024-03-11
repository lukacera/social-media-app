import request from "supertest";
import app from "../app";
import { Types } from "mongoose";
// Types of data

// Models
import User from "../models/User"

describe('Check "/" route', () => {
    it('It loads home page !', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ "user": "user" })
    });
});
describe('Check "/profiles" route', () => {
    afterEach(() => {
        // Restore the original implementation of User.find after each test
        jest.restoreAllMocks();
    });
    it('Loads profiles!', async () => {
        // Mocking the User.find method to return dummy data
        const mockProfiles = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
        jest.spyOn(User, 'find').mockResolvedValueOnce(mockProfiles);

        // Making a request to the route
        const response = await request(app).get('/profiles');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ profiles: mockProfiles });
    });
});

// Correct id
const correctId = new Types.ObjectId();

describe('Check "/profiles/:id" route', () => {
    it('GET method single profile, false ID', async () => {
        // Wrong id
        const userId = 'sampleUserId';
        const response = await request(app).get(`/profiles/${userId}`);
        expect(response.status).toBe(500)
    });
    it('GET method single profile, good ID', async () => {
        // Good id
        const userId = "id12";
        const response = await request(app).get(`/profiles/${userId}`);
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ "status": "ok" });
    });

    it("EDIT user's profile, bad ID", async () => {
        // Wrong id
        const userId = 'sampleUserId';
        const response = await request(app).patch(`/profiles/${userId}`);
        expect(response.status).toBe(404)
    })
    it("EDIT user's profile, good ID", async () => {
        // Good id
        const userId = correctId;
        const response = await request(app).patch(`/profiles/${userId}`);
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ "status": "Edited!!" })
    })

    it("DELETE user's profile, bad ID", async () => {
        // Wrong id
        const userId = 'sampleUserId';
        const response = await request(app).delete(`/profiles/${userId}`);
        expect(response.status).toBe(404)
    });
    it("DELETE user's profile, bad ID", async () => {
        // Good id
        const userId = correctId;
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
        const userId = correctId;
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
        const userId = correctId;
        const response = await request(app).delete(`/profiles/${userId}/friend-request`)
        expect(response.status).toBe(204)
    })
})