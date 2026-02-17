const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const { requireTenant } = require("../middleware/tenantMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const asyncHandler = require("express-async-handler");

const { upgradePlan } = require("../services/billingService");

router.post(
  "/upgrade",
  requireAuth,
  requireTenant,
  allowRoles("OWNER"),
  asyncHandler(async (req, res) => {
    const org = await upgradePlan(req.tenantId);
    res.json({
      message: "Upgraded to PRO",
      plan: org.plan
    });
  })
);

module.exports = router;
