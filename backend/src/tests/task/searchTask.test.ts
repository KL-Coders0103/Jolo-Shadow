import request from "supertest";
import app from "../../app";

describe(
  "Task Search",
  () => {

    let accessToken = "";

    beforeAll(async () => {

      const response =
        await request(app)
          .post("/api/v1/auth/login")
          .send({
            email:
              "lovesh@test.com",

            password:
              "Password@123",
          });

      accessToken =
        response.body.data
          .accessToken;
    });

    it(
      "should search tasks",
      async () => {

        const response =
          await request(app)
            .get(
              "/api/v1/tasks/search?search=api",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            );

        expect(
          response.status,
        ).toBe(200);
      },
    );
  },
);