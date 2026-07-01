import request from "supertest";
import app from "../../app";

describe(
  "Attendance Check Out",
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
      "should check out successfully",
      async () => {

        const response =
          await request(app)
            .patch(
              "/api/v1/attendance/check-out",
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