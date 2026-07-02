import request from "supertest";
import mongoose from "mongoose";

import app from "../../app";

describe("Department APIs", () => {
  let token: string;

  let companyId: string;

  beforeEach(async () => {
    // Register/Login admin user

    const register = await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "Admin",
        lastName: "User",
        email: "admin@test.com",
        password: "Password@123",
      });

    // Verify OTP here if your auth requires it

    const login = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "admin@test.com",
        password: "Password@123",
      });

    token = login.body.data.accessToken;

    companyId = login.body.data.user.companyId;
  });

  describe("POST /departments", () => {
    it("should create department", async () => {
      const res = await request(app)
        .post("/api/v1/departments")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          name: "Engineering",
          code: "ENG",
          description: "Software Team",
        });

      expect(res.status).toBe(201);

      expect(res.body.success).toBe(true);

      expect(res.body.data.name).toBe(
        "Engineering",
      );
    });

    it("should reject duplicate department", async () => {
      await request(app)
        .post("/api/v1/departments")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          name: "Engineering",
          code: "ENG",
        });

      const res = await request(app)
        .post("/api/v1/departments")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          name: "Engineering",
          code: "ENG",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /departments", () => {
    it("should return all departments", async () => {
      const res = await request(app)
        .get("/api/v1/departments")
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(Array.isArray(res.body.data)).toBe(
        true,
      );
    });
  });

  describe("GET /departments/search", () => {
    it("should search departments", async () => {
      const res = await request(app)
        .get(
          "/api/v1/departments/search?name=Eng",
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);
    });
  });

  describe("Department CRUD", () => {
    let departmentId: string;

    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/departments")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          name: "HR",
          code: "HR",
        });

      departmentId = res.body.data._id;
    });

    it("should get department by id", async () => {
      const res = await request(app)
        .get(
          `/api/v1/departments/${departmentId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(res.body.data._id).toBe(
        departmentId,
      );
    });

    it("should update department", async () => {
      const res = await request(app)
        .patch(
          `/api/v1/departments/${departmentId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          description:
            "Updated Description",
        });

      expect(res.status).toBe(200);

      expect(
        res.body.data.description,
      ).toBe("Updated Description");
    });

    it("should delete department", async () => {
      const res = await request(app)
        .delete(
          `/api/v1/departments/${departmentId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);
    });
  });

  describe("Analytics", () => {
    it("should fetch analytics", async () => {
      const res = await request(app)
        .get(
          "/api/v1/departments/analytics",
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(res.body.success).toBe(true);
    });
  });
});