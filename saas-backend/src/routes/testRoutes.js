const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
const {requireTenant} = require('../middleware/tenantMiddleware');
const { allowRoles } = require("../middleware/roleMiddleware");
router.get('/me',requireAuth, requireTenant, (req,res)=>{
    res.json({user:req.user, tenant: req.tenantId})
})
router.get(
  "/owner-only",
  requireAuth,
  requireTenant,
  allowRoles("OWNER"),
  (req, res) => {
    res.json({ message: "Owner access granted" });
  }
);
module.exports = router;