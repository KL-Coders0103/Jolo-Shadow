import request from "supertest";
import path from "path";

import app from "../../app";

describe(
  "Upload APIs",
  () => {

    let accessToken = "";

    beforeAll(async () => {

      const response =
        await request(app)
          .post("/api/v1/auth/login")
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
      "should upload single file",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/v1/uploads/single",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            )
            .attach(
              "file",
              path.resolve(
                __dirname,
                "../fixtures/test.png",
              ),
            );

        expect(
          response.status,
        ).toBe(201);
      },
    );

    it(
      "should fetch files",
      async () => {

        const response =
          await request(app)
            .get(
              "/api/v1/uploads",
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