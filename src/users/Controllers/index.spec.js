const userController = require("./index");
const { removeAllCollections, dropAllCollections } = require("../../config/db");
const request = require("supertest");
const server = require("../../api/server");
const { db } = require("../../config/db");
let user1id, user2id, cookie1, cookie2;
describe("Users", () => {
  beforeAll(async () => {
    await db();
  });
  afterAll(async () => {
    await dropAllCollections();
  });
  describe("/auth/signup [POST]", () => {
    beforeAll(async () => {
      await request(server).post("/api/v1/auth/signup").send({
        firstname: "john",
        lastname: "jane",
        username: "admin",
        password: "DisxtAdmin01",
        age: 20,
      });
      await request(server).post("/api/v1/auth/signup").send({
        firstname: "john",
        lastname: "jane",
        username: "client",
        password: "DisxtClient01",
        age: 20,
      });
      const res = await request(server).post("/api/v1/auth/login").send({
        username: "client",
        password: "DisxtClient01"
      });

      user2id = res.body.data.id;
      cookie2 = res.headers["set-cookie"];
    });
    it("should fail if required fields are not given", async function () {
      const res = await request(server).post("/api/v1/auth/signup").send({});
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        error: [
          "username is required",
          "firstname is required",
          "lastname is required",
          "age is required",
          "password is required",
        ],
        status: 400,
      });
    });
    it("should fail if first name or last name is empty", async () => {
      const res = await request(server).post("/api/v1/auth/signup").send({
        username: "",
        firstname: "",
        lastname: "",
        age: 20,
        password: "123abc",
      });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: [
          "username is not allowed to be empty",
          "firstname is not allowed to be empty",
          "lastname is not allowed to be empty",
        ],
      });
    });
    it("should fail if first name or last name is not a string", async () => {
      const res = await request(server).post("/api/v1/auth/signup").send({
        firstname: 1,
        lastname: 2,
        age: 20,
        username: "bc1",
        password: "123abc",
      });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: ["firstname must be a string", "lastname must be a string"],
      });
    });
    it("should fail if username or password is empty", async () => {
      const res = await request(server).post("/api/v1/auth/signup").send({
        firstname: "jjj",
        lastname: "jbd",
        username: "",
        age: 0,
        password: "",
      });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: [
          "username is not allowed to be empty",
          "age must be a positive number",
          "age must be greater than or equal to 1",
          "password is not allowed to be empty",
        ],
      });
    });
    it("should fail if username or password has wrong format", async () => {
      const res = await request(server).post("/api/v1/auth/signup").send({
        firstname: "jjj",
        lastname: "jbd",
        username: "b",
        age: -10,
        password: "123",
      });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: [
          "username length must be at least 2 characters long",
          "age must be a positive number",
          "age must be greater than or equal to 1",
          "password with value 123 fails to match the 6-15 characters, combination of numbers and letters pattern",
        ],
      });
    });

    it("should signup user", async () => {
      const res = await request(server).post("/api/v1/auth/signup").send(
        {
          firstname: "jjj",
          lastname: "jbd",
          username: "b1",
          password: "123abc",
          age: 20,
        },
        10000
      );
      expect(res.status).toEqual(201);
      expect(res.body.data).toHaveProperty("firstname", "jjj");
      expect(res.body.data).toHaveProperty("lastname", "jbd");
      expect(res.body.data).toHaveProperty("username", "b1");
    });
    it("should fail if username already exists", async () => {
      const res = await request(server).post("/api/v1/auth/signup").send({
        firstname: "john",
        lastname: "jane",
        username: "admin",
        password: "achipelego1",
        age: 20,
      });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: "Username Already Exist",
      });
    });
  });

  describe("/auth/login [POST]", () => {
 
    it("should fail if username does not exist", async () => {
      const res = await request(server).post("/api/v1/auth/login").send({
        username: "jjj@n.com",
        password: "12345abcj",
      });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: "Invalid Credential",
      });
    });
    it("should fail if password is not correct", async () => {
      const res = await request(server).post("/api/v1/auth/login").send({
        username: "admin",
        password: "12345abcj",
      });
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: "Invalid Credential",
      });
    });
    it("should pass", async () => {
      const res = await request(server).post("/api/v1/auth/login").send({
        username: "admin",
        password: "DisxtAdmin01",
      });
      user1id = res.body.data.id
      cookie1= res.headers["set-cookie"]
      expect(res.status).toEqual(200);
    });
  });
  describe("/users/:id", () => {
    it("should fail to get another user if user is not admin", async () => {
      const res = await request(server).get(`/api/v1/users/${user1id}`).set("Cookie", cookie2)
      expect(res.status).toEqual(401)
      expect(res.body.error).toEqual("Unauthorized")
    });
    it("should get only details for self ", async () => {
      const res = await request(server).get(`/api/v1/users/${user2id}`).set("Cookie", cookie2)
      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveProperty("role","client")
      expect(res.body.data).toHaveProperty("_id",user2id)
    });
    it("should get other users if user is an admin", async () => {
      const res = await request(server).get(`/api/v1/users/${user2id}`).set("Cookie", cookie1)
      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveProperty("_id",user2id)
    });
  });
  describe("/users/:id [PATCH]", () => {
    it("should fail if there is userId is less than 2 characters", async () => {
      const res = await request(server)
        .patch("/api/v1/users/1")
        .send({
          role: "admin",
        })
        .set("Cookie", "");
      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual(["id length must be at least 2 characters long"],
      );
    });
    it("should fail if there is no cookieheader", async () => {
      const res = await request(server)
        .patch("/api/v1/users/156")
        .send({
          role: "admin",
        })
        .set("Cookie", "");
      expect(res.status).toEqual(401);
      expect(res.body).toEqual({
        status: 401,
        error: "You need to Login",
      });
    });
    it ("should fail if user is assigned a role not admin or client", async()=> {
      const res = await request(server)
        .patch("/api/v1/users/156")
        .send({
          role: "moderator",
        })
        .set("Cookie", cookie1);
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        status: 400,
        error: ["role must be one of [admin, client]"],
      });
    })
    it("should fail if user is not admin", async () => {
      const res = await request(server)
        .patch("/api/v1/users/156")
        .send({
          role: "admin",
        })
        .set("Cookie", cookie2);
      expect(res.status).toEqual(401);
      expect(res.body).toEqual({
        status: 401,
        error: "Unauthorized",
      });
    });
    
    it("should fail if user to be updated does not exist", async () => {
      const res = await request(server)
        .patch("/api/v1/users/156")
        .send({
          role: "admin",
        })
        .set("Cookie", cookie1);
      expect(res.status).toEqual(500);
    });

    it("should updateUser role", async () => {
      const res = await request(server)
        .patch(`/api/v1/users/${user2id}`)
        .send({
          role: "admin",
        })
        .set("Cookie", cookie1);
      expect(res.status).toEqual(200);
      expect(res.body.data).toHaveProperty("_id", `${user2id}`);
      expect(res.body.data).toHaveProperty("role", "admin");
    });
  });
  describe("logout", () => {
    it("should logout a logged in user", async () => {
      const res = await request(server)
      .get('/api/v1/auth/logout')
      .set('Cookie', cookie1);
    expect(res.headers['set-cookie']).toEqual(["token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT", "token=; Path=/"]);
    });
  });
});
