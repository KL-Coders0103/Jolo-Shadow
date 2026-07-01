import request from "supertest";
import app from "../../app";

describe(
  "Apply Leave",
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
      "should apply leave",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/v1/leaves",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            )
            .send({
              type:
                "CASUAL",

              startDate:
                "2026-07-20",

              endDate:
                "2026-07-22",

              reason:
                "Family function",
            });

        expect(
          response.status,
        ).toBe(201);
      },
    );
  },
);