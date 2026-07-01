import request from "supertest";
import app from "../../app";

describe(
  "Attendance Check In",
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
      "should check in successfully",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/v1/attendance/check-in",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            )
            .send({
              workMode:
                "OFFICE",

              notes:
                "Working from office",
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