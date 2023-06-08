const app = require('../../app')
const request = require('supertest')
const mongoose = require('mongoose')
const { User } = require('../../models')
require('dotenv').config()

const {DB_HOST_TEST, PORT} = process.env

describe("test auth_login router", ()=>{
    let server;

    beforeAll(()=>{
        server = app.listen(PORT);
        mongoose.connect(DB_HOST_TEST)
    });
    afterAll(async ()=>{
        server.close();
        await mongoose.connection.close()
    });
    beforeEach(()=>{
       
    });
    afterEach(async ()=>{
        // await User.deleteMany({});
    });

    test("login func", async()=>{
        const loginData={
            "email": "example7@example.com",
            "password": "examplepassword"
        };

        const response = await request(app).post('/users/login').send(loginData);
        expect(response.statusCode).toBe(200)
        // console.log(response.body.user)
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBeDefined();
        expect(response.body.user.subscription).toBeDefined();
        expect(typeof response.body.user.email).toBe('string');
        expect(typeof response.body.user.subscription).toBe('string');
    })

})