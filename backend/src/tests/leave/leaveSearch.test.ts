import request from "supertest";
import app from "../../app";

describe(
  "Leave Search",
  () => {

    let accessToken = "";

    beforeAll(async () => {

      const login =
        await request(app)
          .post("/api/v1/auth/login")
          .send({
            email:
              "lovesh@test.com",

            password:
              "Password@123",
          });

      accessToken =
        login.body.data
          .accessToken;
    });

    it(
      "should search leaves",
      async () => {

        const response =
          await request(app)
            .get(
              "/api/v1/leaves/search?page=1&limit=10",
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