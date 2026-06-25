import request from "supertest";

import app from "../../app";

describe(
  "GET /employees",
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
      "should fetch employees",
      async () => {

        const response =
          await request(app)
            .get(
              "/api/v1/employees",
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