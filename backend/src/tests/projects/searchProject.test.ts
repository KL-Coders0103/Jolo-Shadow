import request from "supertest";

import app from "../../app";

describe(
  "GET /api/v1/projects/search",
  () => {
    let accessToken = "";

    beforeAll(async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "lovesh@test.com",
          password: "Password@123",
        });

      accessToken =
        response.body.data.accessToken;
    });

    it(
      "should search projects",
      async () => {
        const response =
          await request(app)
            .get(
              "/api/v1/projects/search?search=test",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            );

        expect(
          response.status,
        ).toBe(200);

        expect(
          response.body.success,
        ).toBe(true);
      },
    );

    it(
      "should filter by status",
      async () => {
        const response =
          await request(app)
            .get(
              "/api/v1/projects/search?status=ACTIVE",
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
      "should filter by priority",
      async () => {
        const response =
          await request(app)
            .get(
              "/api/v1/projects/search?priority=HIGH",
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
      "should paginate projects",
      async () => {
        const response =
          await request(app)
            .get(
              "/api/v1/projects/search?page=1&limit=10",
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