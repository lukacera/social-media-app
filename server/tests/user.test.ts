import request from "supertest";
import app from "../app";
import { ObjectId, Types } from "mongoose";
import { Request, Response } from 'express';
// Types of data
import { userType } from "../types/userType";
// Models
import User from "../models/User"

import { newUser, deleteUser } from "../controllers/userController";



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
    beforeEach(async () => {
        // Clear the User collection
        await User.deleteMany({});
    });
    afterEach(() => {
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
    afterEach(() => {
        jest.restoreAllMocks();
    });


    // TEST GET METHOD FOR USER

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

    // TEST PATCH ( edit existing documents ) METHOD FOR USER

    it("EDIT user's profile, bad ID", async () => {
        // Wrong id

    })
    it("EDIT user's profile, good ID", async () => {
        // Good id
        const userId = new Types.ObjectId();
        const response = await request(app).patch(`/profiles/${userId}`);
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ "status": "Edited!!" })
    })

    // TEST DELETE METHOD FOR USER

    // 1. CLIENT REQUESTS TO DELETE USER THAT IS NONEXISTENT IN DB
    it("DELETE user's profile, FAIL", async () => {

        const userId = "invalidUserID";
        jest.spyOn(User, 'deleteOne').mockRejectedValueOnce("Invalid user ID");

        const response = await request(app).delete(`/profiles/${userId}`);

        expect(response.status).toBe(404);
    });

    // 2. CLIENT REQUESTS TO DELETE USER THAT IS IN DB
    describe("DELETE user's profile, SUCCESS", () => {
        let userIdToDelete: Types.ObjectId;
        beforeAll(() => {
            userIdToDelete = new Types.ObjectId();
        });
        it("deletes user from DB", async () => {
            const req = { params: { id: userIdToDelete } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
        });
    })


    // TEST POST METHOD FOR USER

    // 1. ADDING NEW USER, WITHOUT ALL REQUIRED PARAMATERS, FAIL SAVING TO DB
    describe('newUser function', () => {
        it('should respond with error status if required parameters are missing, FAIL', async () => {
            const incompleteUserData: Partial<userType> = {
                // Missing required parameters, function fails because of it
                age: 30,
                password: 'password123',
                username: 'johndoe'
            };

            // Mock request and response objects
            const req = { body: incompleteUserData } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            await newUser(req, res);

            // Expect status 404 (or appropriate error status) and error message in response
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error while adding new User from DB' });
        });
    });

    // 2. ADDING NEW USER, WITH ALL REQUIRED PARAMATERS, BUT USERNAME IS ALREADY TAKEN
    describe('newUser function', () => {
        // Add user with that username in db so it fails
        beforeAll(async () => {
            await User.create({
                name: 'Test',
                surname: 'User',
                age: 30,
                birthday: new Date(),
                password: 'testPassword',
                username: 'Ceraa04',
                avatar: '',
            });
        });
        afterAll(async () => {
            await User.deleteOne({ username: "Ceraa04" })
        })
        it('provide all fields for user, but FAIL because of username ', async () => {
            const completeUser: userType = {
                name: "Luka",
                surname: "Ceranic",
                username: "Ceraa04", // username is already taken
                age: 28,
                password: "somePassword"
            }

            const req = { body: completeUser } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            await newUser(req, res);

            // Status 201, user has been saved to DB
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ error: "Username is already taken" });
        });
    });
    // 3. ADDING NEW USER, WITH ALL REQUIRED PARAMATERS, SAVING TO DB IS SUCCESS
    describe('newUser function', () => {
        afterAll(async () => {
            await User.deleteOne({ username: "RandomUsername4324534534" })
        })
        it('provide all fields for user, SUCCESS ', async () => {
            const completeUser: userType = {
                name: "Luka",
                surname: "Ceranic",
                username: "RandomUsername4324534534", // Username that is not taken
                age: 28,
                password: "somePassword"
            }

            // Mock request and response, so i can test them later on
            const req = { body: completeUser } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            await newUser(req, res);

            // Status 201, user has been saved to DB
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
        });
    });
})