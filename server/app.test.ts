import request from "supertest";
import app from "./app";

describe('GET /', () => {
    it('It loads home page !', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200);
    });
});
describe('GET /profiles', () => {
    it('Loads profiles!', async () => {
        const response = await request(app).get('/profiles')
        expect(response.status).toBe(200);
    });
});
describe('GET /profiles/:id', () => {
    it('It renders individual page', async () => {
        const userId = 'sampleUserId';
        const response = await request(app).get(`/profiles/${userId}`);
        expect(response.status).toBe(200);

    });
});