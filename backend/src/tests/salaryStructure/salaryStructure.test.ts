import request from "supertest";

import app from "../../app";

describe("Salary Structure APIs", () => {
  let token: string;

  let employeeId: string;

  let salaryStructureId: string;

  beforeEach(async () => {
    /**
     * Reuse your existing helper
     *
     * Create verified admin
     * Login
     * Create employee
     */

    token = "";

    employeeId = "";
  });

  describe("POST /salary-structures", () => {
    it("should create salary structure", async () => {
      const res = await request(app)
        .post("/api/v1/salary-structures")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          basicSalary: 50000,

          hra: 12000,

          allowances: 6000,

          pf: 1800,

          professionalTax: 200,

          incomeTax: 2500,

          otherDeductions: 500,
        });

      expect(res.status).toBe(201);

      expect(res.body.success).toBe(true);

      salaryStructureId =
        res.body.data._id;
    });

    it("should reject duplicate salary structure", async () => {
      await request(app)
        .post("/api/v1/salary-structures")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          basicSalary: 50000,
        });

      const res = await request(app)
        .post("/api/v1/salary-structures")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          basicSalary: 50000,
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/salary-structures")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          basicSalary: 60000,
        });

      salaryStructureId =
        res.body.data._id;
    });

    it("should get all salary structures", async () => {
      const res = await request(app)
        .get("/api/v1/salary-structures")
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(
        Array.isArray(res.body.data),
      ).toBe(true);
    });

    it("should get salary structure by id", async () => {
      const res = await request(app)
        .get(
          `/api/v1/salary-structures/${salaryStructureId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(
        res.body.data._id,
      ).toBe(salaryStructureId);
    });

    it("should search salary structures", async () => {
      const res = await request(app)
        .get(
          "/api/v1/salary-structures/search",
        )
        .query({
          employeeId,
        })
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);
    });
  });

  describe("PATCH", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/salary-structures")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          basicSalary: 45000,
        });

      salaryStructureId =
        res.body.data._id;
    });

    it("should update salary structure", async () => {
      const res = await request(app)
        .patch(
          `/api/v1/salary-structures/${salaryStructureId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          basicSalary: 75000,
        });

      expect(res.status).toBe(200);

      expect(
        res.body.data.basicSalary,
      ).toBe(75000);
    });
  });

  describe("DELETE", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/salary-structures")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          basicSalary: 50000,
        });

      salaryStructureId =
        res.body.data._id;
    });

    it("should delete salary structure", async () => {
      const res = await request(app)
        .delete(
          `/api/v1/salary-structures/${salaryStructureId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);
    });
  });
});