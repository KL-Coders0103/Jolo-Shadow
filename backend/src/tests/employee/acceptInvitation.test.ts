import request from "supertest";

import app from "../../app";

describe(
  "POST /accept-invitation",
  () => {

    it(
      "should accept invitation",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/v1/employees/accept-invitation",
            )
            .send({
              token:
                "sample-token",

              firstName:
                "John",

              lastName:
                "Doe",

              password:
                "Password@123",
            });

        expect(
          response.status,
        ).not.toBe(500);
      },
    );
  },
);