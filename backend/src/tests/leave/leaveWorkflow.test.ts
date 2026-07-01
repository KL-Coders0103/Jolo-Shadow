import request from "supertest";
import app from "../../app";

describe(
  "Leave Workflow",
  () => {

    let accessToken = "";
    let leaveId = "";

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

      const leave =
        await request(app)
          .post("/api/v1/leaves")
          .set(
            "Authorization",
            `Bearer ${accessToken}`,
          )
          .send({
            type:
              "CASUAL",

            startDate:
              "2026-08-01",

            endDate:
              "2026-08-02",

            reason:
              "Vacation",
          });

      leaveId =
        leave.body.data._id;
    });

    it(
      "should approve leave",
      async () => {

        const response =
          await request(app)
            .patch(
              `/api/v1/leaves/${leaveId}/approve`,
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

    it(
      "should cancel leave",
      async () => {

        const response =
          await request(app)
            .patch(
              `/api/v1/leaves/${leaveId}/cancel`,
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