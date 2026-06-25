import request from "supertest";

import app from "../../app";

describe(
  "POST /teams",
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
      "should create team",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/v1/teams",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            )
            .send({
              teamName:
                "Engineering",

              description:
                "Core Team",
            });

        expect(
          response.status,
        ).toBe(201);
      },
    );
  },
);