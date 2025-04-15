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
}, 15000);

describe("Get all routes without authentication", () => {
  test("Responds with 200 to /", async () => {
    const res = await request.get("/");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("Responds with 200 to /rooms", async () => {
    const res = await request.get("/rooms");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("Responds with 200 to /bookings", async () => {
    const res = await request.get("/bookings");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});

describe("Get all routes that require authentication", () => {
  test("Responds with 401 to /staff when not authenticated", async () => {
    const res = await request.get("/staff");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });

  test("Responds with 401 to /users when not authenticated", async () => {
    const res = await request.get("/users");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });
});

describe("Get single items by ID", () => {
  describe("GET /rooms/:id", () => {
    test("Responds with 200 for a valid room ID", async () => {
      const allRooms = await request.get("/rooms");
      const roomId = allRooms.body[0]?._id;

      if (!roomId) {
        throw new Error("No room ID found to test with.");
      }

      const res = await request.get(`/rooms/${roomId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id", roomId);
    });

    test("Responds with 400 for invalid room ID", async () => {
      const res = await request.get("/rooms/invalid-id");
      expect(res.statusCode).toBe(400);
    });

    test("Responds with 404 for non-existent room ID", async () => {
      const res = await request.get("/rooms/507f191e810c19729de860ea");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /bookings/:id", () => {
    test("Responds with 200 for a valid booking ID", async () => {
      const allBookings = await request.get("/bookings");
      const bookingId = allBookings.body[0]?._id;

      if (!bookingId) {
        throw new Error("No booking ID found to test with.");
      }

      const res = await request.get(`/bookings/${bookingId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id", bookingId);
    });

    test("Responds with 400 for invalid booking ID", async () => {
      const res = await request.get("/bookings/invalid-id");
      expect(res.statusCode).toBe(400);
    });

    test("Responds with 404 for non-existent booking ID", async () => {
      const res = await request.get("/bookings/507f191e810c19729de860ea");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /staff/:id", () => {
    test("Responds with 401 for unauthenticated staff request", async () => {
      const res = await request.get("/staff/507f191e810c19729de860ea");
      expect(res.statusCode).toBe(401);
    });
  });

  describe("GET /users/:id", () => {
    test("Responds with 401 for unauthenticated user request", async () => {
      const res = await request.get("/users/507f191e810c19729de860ea");
      expect(res.statusCode).toBe(401);
    });
  });
});

describe("Get all rooms available", () => {
  test("Responds with 200 and a list of available rooms", async () => {
    const res = await request.get("/rooms/available");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Responds with 404 when no available rooms are found", async () => {
    const res = await request.get("/rooms/available");
    if (res.statusCode === 404) {
      expect(res.body).toHaveProperty("message", "No available rooms found.");
    } else {
      expect(res.statusCode).toBe(200);
    }
  });
});
