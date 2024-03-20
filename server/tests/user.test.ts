import request from "supertest";
import app from "../app";
import { Request, Response } from 'express';
import User from "../models/User"
import { getUser } from "../controllers/userController";



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
describe('Check "/users/api" route', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    // 1. CLIENT REQUESTS ALL USERS FROM DB
    it('Loads all users, SUCCESS!', async () => {
        const mockUsers = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
        jest.spyOn(User, 'find').mockResolvedValueOnce(mockUsers);

        const response = await request(app).get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ users: mockUsers });
    });
    // 2. DB FAILS TO GET ALL USERS TO CLIENT
    it('Loads all users, FAIL!', async () => {
        const mockUsers = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
        jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Failed to get all users!'));

        const response = await request(app).get('/failURL');
        expect(response.status).toBe(404);
    });
});


describe('Check "/api/users/:id" route', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    // TEST GET METHOD FOR USER

    // 1. CLIENT REQUESTS TO GET USER THAT IS NONEXISTING IN DB
    it('GET method single user, 404', async () => {
        // Wrong id
        const userId = 'sampleUserId';
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(404)
    });

    // 2. CLIENT REQUESTS FOR USER THAT IS IN DB
    describe('GET method single user, 200', () => {
        const userData = {
            name: 'Test',
            surname: 'User',
            age: 30,
            birthday: new Date(),
            password: 'testPassword',
            username: 'BettieChandler',
            avatar: '',
        };

        let username: string;

        beforeAll(async () => {
            // Create a user record in the database, for testing
            const user = await User.create(userData);
            username = user.username;
        });

        // Delete that user record that was made in beforeAll
        afterAll(async () => {
            await User.deleteOne({ username: username })
        })
        it('GET method single user, 200', async () => {
            const req = { params: { username: username } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            await getUser(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
        });
    })
})