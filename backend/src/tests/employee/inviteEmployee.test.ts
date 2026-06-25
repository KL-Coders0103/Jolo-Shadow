import request from "supertest";

import app from "../../app";

describe(
  "POST /api/v1/employees/invite",
  () => {

    let accessToken = "";

    beforeAll(async () => {

      const response =
        await request(app)
          .post(
            "/api/v1/auth/login",
          )
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
      "should invite employee",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/v1/employees/invite",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            )
            .send({
              email:
                "employee@test.com",

              role:
                "EMPLOYEE",
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