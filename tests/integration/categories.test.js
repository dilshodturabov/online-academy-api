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
                {name: 'dasturlash'},
                {name: 'Hacking'},
                {name: 'Tarmoqlar'},
            ]);
            const response = await request(server).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body.some(cat=>cat.name=='dasturlash')).toBeTruthy();
        });
    });
});