import request from "supertest";
import app from "../../app";

describe("POST /tasks", () => {
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

  it(
    "should create task",
    async () => {

      const response =
        await request(app)
          .post("/api/v1/tasks")
          .set(
            "Authorization",
            `Bearer ${accessToken}`,
          )
          .send({
            title: "Build API",
            projectId:
              process.env.TEST_PROJECT_ID,
          });

      expect(
        response.status,
      ).toBe(201);
    },
  );
});