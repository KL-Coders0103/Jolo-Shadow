import request from "supertest";
import app from "../../app";

describe("POST /projects", () => {
  let accessToken = "";

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "lovesh@test.com",
        password: "Password@123",
      });

    accessToken =
      response.body.data.accessToken;
  });

  it("should create project", async () => {
    const response = await request(app)
      .post("/api/v1/projects")
      .set(
        "Authorization",
        `Bearer ${accessToken}`,
      )
      .send({
        projectName: "Jolo Shadow",
        priority: "HIGH",
      });

    expect(response.status).toBe(201);
  });
});