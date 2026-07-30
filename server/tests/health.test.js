const request = require("supertest");
const app = require("../app");

describe("Health Check Endpoint", () => {
  test("GET /api/health should return API is running", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "API is running",
    });
  });
});