const request = require('supertest');
let server;
const { Category } = require('../../models/category');
const {User} = require('../../models/user');

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
    describe('POST /',()=>{
        let token;
        let name;

        const execute = async ()=>{
            return await request(server)
                            .post('/api/categories')
                            .set('x-auth-token',token)
                            .send({name})
        }

        beforeEach(()=>{
            token = new User().generateAuthToken();
            name = 'dasturlash';
        });

        it('should return 401 if user is not logged in', async () => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        });

        it('should return 400 if categories name is less than 3 characters', async () => {
            name = '12';
            const res = await execute();
            expect(res.status).toBe(400);
        });

        it('should return 400 if categories name is more than 50 characters', async () => {
            name = new Array(52).join('c');
            const res = await execute();
            expect(res.status).toBe(400);
        });

        it('should save the category if it is valid', async () => {
            await execute();
            const category = new Category({name: 'dasturlash'});
            expect(category).not.toBeNull();
        });

        it('should return the category if it is valid', async ()=>{
            const res = await execute();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'dasturlash');
        });
    });
    
});