import request from "supertest";
import app from "../../app";

describe(
  "Task CRUD",
  () => {

    let accessToken = "";
    let taskId = "";

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

      const task =
        await request(app)
          .post("/api/v1/tasks")
          .set(
            "Authorization",
            `Bearer ${accessToken}`,
          )
          .send({
            title:
              "Test Task",

            projectId:
              process.env.TEST_PROJECT_ID,
          });

      taskId =
        task.body.data._id;
    });

    it(
      "should get tasks",
      async () => {

        const response =
          await request(app)
            .get(
              "/api/v1/tasks",
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
      "should update task",
      async () => {

        const response =
          await request(app)
            .patch(
              `/api/v1/tasks/${taskId}`,
            )
            .set(
              "Authorization",
              `Bearer ${accessToken}`,
            )
            .send({
              status:
                "IN_PROGRESS",
            });

        expect(
          response.status,
        ).toBe(200);
      },
    );

    it(
      "should delete task",
      async () => {

        const response =
          await request(app)
            .delete(
              `/api/v1/tasks/${taskId}`,
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