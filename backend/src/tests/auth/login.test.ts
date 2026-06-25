import request from "supertest";
import app from "../../app";

describe(
  "POST /api/v1/auth/login",
  () => {

    beforeAll(async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send({
          firstName: "Login",

          lastName: "User",

          email: "login@test.com",

          password: "Password@123",

          companyName: "Login Company",

          industry: "Software",
        });
    });

    it(
      "should login successfully",
      async () => {

        const response =
          await request(app)
            .post("/api/v1/auth/login")
            .send({
              email: "login@test.com",

              password:
                "Password@123",
            });

        expect(
          response.status,
        ).toBe(200);

        expect(
          response.body.success,
        ).toBe(true);
      },
    );
  },
);