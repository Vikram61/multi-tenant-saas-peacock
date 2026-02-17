const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireTenant } = require('../middleware/tenantMiddleware');
const Organization = require('../models/Organization');
const User = require('../models/User');
const router = express.Router();
const { allowRoles } = require("../middleware/roleMiddleware");
const { checkMemberLimit } = require("../middleware/planMiddleware");
const { upgradePlan } = require("../controllers/orgController");
const { createInvitation } = require("../services/inviteService");
const { updateRole, removeMember } = require("../controllers/memberController");

router.get('/me',requireAuth, requireTenant, async(req,res)=>{
    const org = await Organization.findById(req.tenantId).select("name plan memberCount projectCount");
    res.json(org);
})
router.get(
  "/members",
  requireAuth,
  requireTenant,
  async (req, res) => {
    const users = await User.find({ organization: req.tenantId })
      .select("name email role createdAt");

    res.json(users);
  }
);

router.post(
  "/upgrade",
  requireAuth,
  requireTenant,
  allowRoles("OWNER"),
  upgradePlan
);

/**
 * Invite a member to organization
 * Only OWNER / ADMIN allowed
 * Enforces plan member limit
 */
router.post(
  "/invite",
  requireAuth,
  requireTenant,
  allowRoles("OWNER", "ADMIN"),
  checkMemberLimit,
  async (req, res) => {
    try {
      const { email, role } = req.body;

      // validation
      if (!email)
        return res.status(400).json({ message: "Email is required" });

      // default role safety
      const assignedRole = role || "MEMBER";

      // prevent privilege escalation
      if (!["MEMBER", "ADMIN"].includes(assignedRole))
        return res.status(400).json({ message: "Invalid role" });

      // create invite
      const normalizedEmail = email.toLowerCase().trim();
const invite = await createInvitation(normalizedEmail, req.tenantId, assignedRole);


      return res.status(201).json({
        message: "Invitation created",
        token: invite.token,   // later will be emailed
        role: assignedRole
      });

    } catch (err) {
      console.error("INVITE ERROR:", err.message);
      return res.status(500).json({ message: "Failed to create invitation" });
    }
  }
);


// change role
router.patch(
  "/members/:id/role",
  requireAuth,
  requireTenant,
  allowRoles("OWNER", "ADMIN"),
  updateRole
);

// remove member
router.delete(
  "/members/:id",
  requireAuth,
  requireTenant,
  allowRoles("OWNER"),
  removeMember
);


module.exports = router;
