const request = require('supertest');
const { response } = require('./app');
const app = require('./app');

var auth = {};

// before each request, create a user and log them in
beforeEach(async () => {
    // const hashedPassword = await bcrypt.hash("secret", 1);
    // await db.query("INSERT INTO users (username, password) VALUES ('test', $1)", [
    //   hashedPassword
    // ]);
    const response = await request(app)
      .post("/api/admin/login")
      .send({
        email: "admin1@eng.pdn.ac.lk",
        password: "userPassword"
      });
    // take the result of the POST /users/auth which is a JWT
    // store it in the auth object
    auth.token = response.body.token;
    // store the id from the token in the auth object
    // auth.current_user_id = jsonwebtoken.decode(auth.token).user_id;
});

describe('Testing admin API calls...', () => {
    it('GET /api/admin/admins/all - read all admins --> array of admin objects', () => {
        return request(app)
        .get('/api/admin/admins/all')
        .set("authorization", 'BEARER ' + auth.token)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        name: expect.any(String),
                        email: expect.any(String),
                        isRegistered: expect.any(Boolean),
                        role: expect.any(String),
                        profile_picture: expect.any(String),
                        __v: expect.any(Number)
                    })
                ])
            )
        });
    });
});

describe('Testing admin API calls...', () => {
    it('GET /api/admin/admins/self - read self admin --> array of admin objects', () => {
        return request(app)
        .get('/api/admin/admins/self')
        .set("authorization", 'BEARER ' + auth.token)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    isRegistered: expect.any(Boolean),
                    role: expect.any(String),
                    profile_picture: expect.any(String),
                    __v: expect.any(Number)
                })
            )
        });
    });
});