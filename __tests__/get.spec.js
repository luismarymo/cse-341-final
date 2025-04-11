const app = require("../server");
const mongodb = require("../data/database");
const supertest = require("supertest");
const { expect, beforeAll, describe, test } = require("@jest/globals");
const request = supertest(app);

beforeAll((done) => {
    mongodb.initDb((err) => {
        if (err) {
            done(err);
        } else {
            done();
        }
    });
},  15000);

describe("Get all routes without authentication", () => {
    test("Responds to /", async () => {
        const res = await request.get("/");
        expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
        expect(res.statusCode).toBe(200);
    })

    test("Responds to /rooms", async () => {
        const res = await request.get("/rooms");
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
    });

    test("Responds to /bookings", async () => {
        const res = await request.get("/bookings");
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
    });
});

describe("Get All routes that require authentication", () => {
    test("Responds to /staff when not authenticated", async () => {
        const res = await request.get("/staff");
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(401);
    });

    test("Responds to /users when not authenticated", async () => {
        const res = await request.get("/users");
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(401);
    });
});