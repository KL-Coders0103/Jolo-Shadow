import request from "supertest";

import app from "../../app";

describe("Payslip APIs", () => {
  let token: string;

  let payrollId: string;

  let payslipId: string;

  beforeEach(async () => {
    /**
     * Reuse your existing helper.
     *
     * Login Admin
     * Create Employee
     * Create Salary Structure
     * Generate Payroll
     */

    token = "";

    payrollId = "";
  });

  describe("Generate Payslip", () => {
    it("should generate payslip", async () => {
      const res = await request(app)
        .post("/api/v1/payslips/generate")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          payrollId,
        });

      expect(res.status).toBe(201);

      expect(res.body.success).toBe(true);

      payslipId = res.body.data._id;
    });

    it("should reject duplicate payslip", async () => {
      await request(app)
        .post("/api/v1/payslips/generate")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          payrollId,
        });

      const res = await request(app)
        .post("/api/v1/payslips/generate")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          payrollId,
        });

      expect(res.status).toBe(400);
    });
  });

  describe("Download Payslip", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/payslips/generate")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          payrollId,
        });

      payslipId = res.body.data._id;
    });

    it("should download PDF", async () => {
      const res = await request(app)
        .get(
          `/api/v1/payslips/download/${payslipId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);
    });
  });

  describe("Email Payslip", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/payslips/generate")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          payrollId,
        });

      payslipId = res.body.data._id;
    });

    it("should email payslip", async () => {
      const res = await request(app)
        .post(
          `/api/v1/payslips/email/${payslipId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe("Payslip History", () => {
    it("should fetch history", async () => {
      const res = await request(app)
        .get("/api/v1/payslips/history")
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe("Search Payslips", () => {
    it("should search payslips", async () => {
      const res = await request(app)
        .get("/api/v1/payslips/search")
        .query({
          month: 7,
          year: 2026,
        })
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe("Get Payslip", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/payslips/generate")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          payrollId,
        });

      payslipId = res.body.data._id;
    });

    it("should get payslip by id", async () => {
      const res = await request(app)
        .get(
          `/api/v1/payslips/${payslipId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(res.body.data._id).toBe(
        payslipId,
      );
    });
  });
});