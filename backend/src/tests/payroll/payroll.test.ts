import request from "supertest";
import app from "../../app";

describe("Payroll APIs", () => {
  let token: string;

  let employeeId: string;
  let salaryStructureId: string;

  let bonusId: string;
  let deductionId: string;

  let payrollId: string;

  beforeEach(async () => {
    /**
     * Reuse your existing helper
     *
     * Login Admin
     * Create Employee
     * Create Salary Structure
     * Create Approved Bonus
     * Create Approved Deduction
     */

    token = "";

    employeeId = "";
    salaryStructureId = "";
  });

  describe("Generate Payroll", () => {
    it("should generate payroll", async () => {
      const res = await request(app)
        .post("/api/v1/payroll/generate")
        .set("Authorization", `Bearer ${token}`)
        .send({
          employeeId,
          month: 7,
          year: 2026,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);

      expect(res.body.data.employeeId).toBe(employeeId);

      payrollId = res.body.data._id;
    });

    it("should prevent duplicate payroll generation", async () => {
      await request(app)
        .post("/api/v1/payroll/generate")
        .set("Authorization", `Bearer ${token}`)
        .send({
          employeeId,
          month: 7,
          year: 2026,
        });

      const res = await request(app)
        .post("/api/v1/payroll/generate")
        .set("Authorization", `Bearer ${token}`)
        .send({
          employeeId,
          month: 7,
          year: 2026,
        });

      expect(res.status).toBe(400);
    });

    it("should reject invalid employee", async () => {
      const res = await request(app)
        .post("/api/v1/payroll/generate")
        .set("Authorization", `Bearer ${token}`)
        .send({
          employeeId: "64b111111111111111111111",
          month: 7,
          year: 2026,
        });

      expect(res.status).toBe(404);
    });
  });

  describe("Approval Flow", () => {
    beforeEach(async () => {
      const payroll = await request(app)
        .post("/api/v1/payroll/generate")
        .set("Authorization", `Bearer ${token}`)
        .send({
          employeeId,
          month: 7,
          year: 2026,
        });

      payrollId = payroll.body.data._id;
    });

    it("should approve payroll", async () => {
      const res = await request(app)
        .patch(`/api/v1/payroll/${payrollId}/approve`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      expect(res.body.data.status).toBe("APPROVED");
    });

    it("should lock payroll", async () => {
      await request(app)
        .patch(`/api/v1/payroll/${payrollId}/approve`)
        .set("Authorization", `Bearer ${token}`);

      const res = await request(app)
        .patch(`/api/v1/payroll/${payrollId}/lock`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      expect(res.body.data.isLocked).toBe(true);
    });

    it("should unlock payroll", async () => {
      await request(app)
        .patch(`/api/v1/payroll/${payrollId}/approve`)
        .set("Authorization", `Bearer ${token}`);

      await request(app)
        .patch(`/api/v1/payroll/${payrollId}/lock`)
        .set("Authorization", `Bearer ${token}`);

      const res = await request(app)
        .patch(`/api/v1/payroll/${payrollId}/unlock`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      expect(res.body.data.isLocked).toBe(false);
    });

    it("should mark payroll as paid", async () => {
      await request(app)
        .patch(`/api/v1/payroll/${payrollId}/approve`)
        .set("Authorization", `Bearer ${token}`);

      const res = await request(app)
        .patch(`/api/v1/payroll/${payrollId}/pay`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      expect(res.body.data.status).toBe("PAID");
    });
  });

  describe("History", () => {
    it("should fetch payroll history", async () => {
      const res = await request(app)
        .get(`/api/v1/payroll/history/${employeeId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe("Reports", () => {
    it("should fetch monthly report", async () => {
      const res = await request(app)
        .get("/api/v1/payroll/reports/monthly")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
    });

    it("should fetch yearly report", async () => {
      const res = await request(app)
        .get("/api/v1/payroll/reports/yearly")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
    });

    it("should fetch department report", async () => {
      const res = await request(app)
        .get("/api/v1/payroll/reports/departments")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
    });

    it("should fetch salary expense report", async () => {
      const res = await request(app)
        .get("/api/v1/payroll/reports/expense")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
    });
  });

  describe("Export", () => {
    it("should export excel", async () => {
      const res = await request(app)
        .get("/api/v1/payroll/export/excel")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      expect(
        res.header["content-type"],
      ).toContain(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
    });

    it("should export pdf", async () => {
      const res = await request(app)
        .get("/api/v1/payroll/export/pdf")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      expect(
        res.header["content-type"],
      ).toContain("application/pdf");
    });
  });
});