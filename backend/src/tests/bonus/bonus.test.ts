import request from "supertest";
import app from "../../app";

describe("Bonus APIs", () => {
  let token: string;

  let employeeId: string;

  let bonusId: string;

  beforeEach(async () => {
    /**
     * Reuse your existing helper.
     *
     * Login Admin
     * Create Employee
     */

    token = "";

    employeeId = "";
  });

  describe("POST /bonuses", () => {
    it("should create festival bonus", async () => {
      const res = await request(app)
        .post("/api/v1/bonuses")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Diwali Bonus",

          description:
            "Festival bonus",

          type: "FESTIVAL",

          amount: 10000,

          month: 10,

          year: 2026,
        });

      expect(res.status).toBe(201);

      expect(res.body.success).toBe(true);

      expect(
        res.body.data.type,
      ).toBe("FESTIVAL");

      bonusId =
        res.body.data._id;
    });

    it("should create performance bonus", async () => {
      const res = await request(app)
        .post("/api/v1/bonuses")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Performance Bonus",

          type: "PERFORMANCE",

          amount: 15000,

          month: 7,

          year: 2026,
        });

      expect(res.status).toBe(201);
    });

    it("should reject invalid employee", async () => {
      const res = await request(app)
        .post("/api/v1/bonuses")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId:
            "64b111111111111111111111",

          title: "Bonus",

          type: "CUSTOM",

          amount: 5000,

          month: 7,

          year: 2026,
        });

      expect(res.status).toBe(404);
    });
  });

  describe("Approval", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/bonuses")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Approval Bonus",

          type: "CUSTOM",

          amount: 6000,

          month: 7,

          year: 2026,
        });

      bonusId =
        res.body.data._id;
    });

    it("should approve bonus", async () => {
      const res = await request(app)
        .patch(
          `/api/v1/bonuses/${bonusId}/approve`,
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
    it("should search bonuses", async () => {
      const res = await request(app)
        .get("/api/v1/bonuses/search")
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
    it("should fetch analytics", async () => {
      const res = await request(app)
        .get(
          "/api/v1/bonuses/analytics",
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(
        res.body.success,
      ).toBe(true);
    });
  });

  describe("Delete", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/bonuses")
        .set(
          "Authorization",
          `Bearer ${token}`,
        )
        .send({
          employeeId,

          title: "Delete Bonus",

          type: "CUSTOM",

          amount: 2000,

          month: 8,

          year: 2026,
        });

      bonusId =
        res.body.data._id;
    });

    it("should delete bonus", async () => {
      const res = await request(app)
        .delete(
          `/api/v1/bonuses/${bonusId}`,
        )
        .set(
          "Authorization",
          `Bearer ${token}`,
        );

      expect(res.status).toBe(200);

      expect(
        res.body.success,
      ).toBe(true);
    });
  });
});