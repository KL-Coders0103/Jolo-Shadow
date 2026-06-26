import request from "supertest";

import app from "../../app";

describe(
  "Notification CRUD",
  () => {

    let accessToken = "";
    let notificationId = "";

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
      "should create notification",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/v1/notifications",
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            )
            .send({
              userId:
                process.env
                  .TEST_USER_ID,

              title:
                "Task Assigned",

              message:
                "You have a new task",

              type:
                "TASK_ASSIGNED",
            });

        notificationId =
          response.body.data._id;

        expect(
          response.status,
        ).toBe(201);
      },
    );

    it(
      "should get notifications",
      async () => {

        const response =
          await request(app)
            .get(
              "/api/v1/notifications/my",
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
      "should mark notification as read",
      async () => {

        const response =
          await request(app)
            .patch(
              `/api/v1/notifications/${notificationId}/read`,
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
      "should delete notification",
      async () => {

        const response =
          await request(app)
            .delete(
              `/api/v1/notifications/${notificationId}`,
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