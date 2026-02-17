const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const { requireTenant } = require("../middleware/tenantMiddleware");
const allowRoles = require("../middleware/allowRoles");

const {
  getMembers,
  updateRole,
  removeMember
} = require("../controllers/memberController");


// all routes require logged in tenant
router.use(requireAuth, requireTenant);


// everyone in org can see members
router.get("/", getMembers);


// only admin & owner manage roles
router.patch("/:id/role", allowRoles("OWNER", "ADMIN"), updateRole);


// only owner can remove member
router.delete("/:id", allowRoles("OWNER"), removeMember);


module.exports = router;
