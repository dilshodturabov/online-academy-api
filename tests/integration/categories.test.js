const request = require('supertest');
let server;
const { Category } = require('../../models/category');

describe('/api/categories', () => {
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        server.close();
        await Category.deleteMany({});
    });
    describe('GET /', () => {
        it('should return all categories ', async () => {
            await Category.collection.insertMany([
                { name: 'dasturlash' },
                { name: 'Hacking' },
                { name: 'Tarmoqlar' },
            ]);
            const response = await request(server).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body.some(cat => cat.name == 'dasturlash')).toBeTruthy();
        });
    });
    describe('GET /:id', () => {
        it('should return a category if valid id given', async () => {
            const category = new Category({ name: 'Artificial Intelligence' });
            await category.save();

            const response = await request(server).get('/api/categories/' + category._id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'Artificial Intelligence');
        });
        it('should return a 404 status  if invalid id given', async () => {
            const response = await request(server).get('/api/categories/123');
            expect(response.status).toBe(404);
        });
    });
});