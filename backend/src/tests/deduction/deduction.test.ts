import request from "supertest";

import app from "../../app";

describe("Deduction APIs", () => {
  let token: string;

  let employeeId: string;

  let deductionId: string;

  beforeEach(async () => {
    /**
     * Reuse your existing helper
     *
     * Login Admin
     * Create Employee
     */

    token = "";

    employeeId = "";
  });

  describe("POST /deductions", () => {
    it("should create PF deduction", async () => {
      const res = await request(app)
        .post("/api/v1/deductions")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Provident Fund",

          description: "Monthly PF",

          type: "PF",

          amount: 1800,

          month: 7,

          year: 2026,
        });

      expect(res.status).toBe(201);

      expect(res.body.success).toBe(true);

      expect(res.body.data.type).toBe(
        "PF",
      );

      deductionId =
        res.body.data._id;
    });

    it("should create Income Tax deduction", async () => {
      const res = await request(app)
        .post("/api/v1/deductions")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Income Tax",

          type: "INCOME_TAX",

          amount: 5000,

          month: 7,

          year: 2026,
        });

      expect(res.status).toBe(201);
    });

    it("should reject invalid employee", async () => {
      const res = await request(app)
        .post("/api/v1/deductions")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId:
            "64b111111111111111111111",

          title: "Penalty",

          type: "PENALTY",

          amount: 1000,

          month: 7,

          year: 2026,
        });

      expect(res.status).toBe(404);
    });
  });

  describe("Approval", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/deductions")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Penalty",

          type: "PENALTY",

          amount: 500,

          month: 7,

          year: 2026,
        });

      deductionId =
        res.body.data._id;
    });

    it("should approve deduction", async () => {
      const res = await request(app)
        .patch(
          `/api/v1/deductions/${deductionId}/approve`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(
        res.body.data.approved,
      ).toBe(true);
    });
  });

  describe("Search", () => {
    it("should search deductions", async () => {
      const res = await request(app)
        .get("/api/v1/deductions/search")
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

  describe("Analytics", () => {
    it("should fetch deduction analytics", async () => {
      const res = await request(app)
        .get(
          "/api/v1/deductions/analytics",
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe("Delete", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/deductions")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Delete Test",

          type: "CUSTOM",

          amount: 750,

          month: 8,

          year: 2026,
        });

      deductionId =
        res.body.data._id;
    });

    it("should delete deduction", async () => {
      const res = await request(app)
        .delete(
          `/api/v1/deductions/${deductionId}`,
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