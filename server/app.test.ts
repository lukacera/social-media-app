import request from "supertest";
import app from "./app";
// Types of data
import { userType } from "./types/userType";
import { commentType } from "./types/commentType";
import { postType } from "./types/postType";

describe('/', () => {
    it('It loads home page !', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200);
    });
});
describe('/profiles', () => {
    it('Loads profiles!', async () => {
        const response = await request(app).get('/profiles')
        expect(response.status).toBe(200);
    });
});
describe('/profiles/:id', () => {
    it('GET method single profile', async () => {
        const userId = 'sampleUserId';
        const response = await request(app).get(`/profiles/${userId}`);
        expect(response.status).toBe(200);
    });
    it("EDIT user's profile", async () => {
        const userId = 'sampleUserId';
        const response = await request(app).patch(`/profiles/${userId}`);
        expect(response.status).toBe(200);
    })
    it("DELETE user's profile", async () => {
        const userId = 'sampleUserId';
        const response = await request(app).delete(`/profiles/${userId}`);
        expect(response.status).toBe(204);
    });

});