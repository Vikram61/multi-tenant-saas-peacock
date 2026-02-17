const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const { requireTenant } = require("../middleware/tenantMiddleware");
const { getOverview } = require("../controllers/analyticsController");

router.get("/overview", requireAuth, requireTenant, getOverview);

module.exports = router;
