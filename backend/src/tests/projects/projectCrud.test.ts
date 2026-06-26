import request from "supertest";

import app from "../../app";

describe("Project CRUD APIs", () => {
  let accessToken = "";
  let projectId = "";

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "lovesh@test.com",
        password: "Password@123",
      });

    accessToken =
      loginResponse.body.data.accessToken;

    const createResponse = await request(app)
      .post("/api/v1/projects")
      .set(
        "Authorization",
        `Bearer ${accessToken}`,
      )
      .send({
        projectName: "Test Project",
        description: "Testing Project APIs",
        priority: "HIGH",
      });

    projectId =
      createResponse.body.data._id;
  });

  it("should fetch all projects", async () => {
    const response = await request(app)
      .get("/api/v1/projects")
      .set(
        "Authorization",
        `Bearer ${accessToken}`,
      );

    expect(response.status).toBe(200);

    expect(
      response.body.success,
    ).toBe(true);
  });

  it("should fetch project by id", async () => {
    const response = await request(app)
      .get(
        `/api/v1/projects/${projectId}`,
      )
      .set(
        "Authorization",
        `Bearer ${accessToken}`,
      );

    expect(response.status).toBe(200);

    expect(
      response.body.success,
    ).toBe(true);
  });

  it("should update project", async () => {
    const response = await request(app)
      .patch(
        `/api/v1/projects/${projectId}`,
      )
      .set(
        "Authorization",
        `Bearer ${accessToken}`,
      )
      .send({
        projectName:
          "Updated Test Project",

        status: "ACTIVE",

        progress: 50,
      });

    expect(response.status).toBe(200);

    expect(
      response.body.success,
    ).toBe(true);
  });

  it("should delete project", async () => {
    const response = await request(app)
      .delete(
        `/api/v1/projects/${projectId}`,
      )
      .set(
        "Authorization",
        `Bearer ${accessToken}`,
      );

    expect(response.status).toBe(200);

    expect(
      response.body.success,
    ).toBe(true);
  });
});