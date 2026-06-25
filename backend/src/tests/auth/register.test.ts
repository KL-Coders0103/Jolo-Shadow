import request from "supertest";
import app from "../../app";

describe(
  "POST /api/v1/auth/register",
  () => {
    it(
      "should register a user",
      async () => {
        const response =
          await request(app)
            .post(
              "/api/v1/auth/register",
            )
            .send({
              firstName: "Lovesh",

              lastName: "Bodhani",

              email:
                "test@test.com",

              password:
                "Password@123",

              companyName:
                "Jolo",

              industry:
                "Software",
            });

        expect(
          response.status,
        ).toBe(201);

        expect(
          response.body.success,
        ).toBe(true);
      },
    );
  },
);