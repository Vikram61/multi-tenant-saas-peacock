const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const { requireTenant } = require("../middleware/tenantMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const { createInvitation } = require("../services/inviteService");

router.post(
  "/invite",
  requireAuth,
  requireTenant,
  allowRoles("OWNER", "ADMIN"),
  async (req, res) => {
    const { email, role } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });

    const invite = await createInvitation(email, req.tenantId, role);

    res.json({
      message: "Invitation created",
      token: invite.token   // later emailed
    });
  }
);

module.exports = router;
