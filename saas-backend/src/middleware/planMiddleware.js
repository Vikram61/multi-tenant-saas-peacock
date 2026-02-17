const Project = require("../models/Project");
const User = require("../models/User");
const Organization = require("../models/Organization");

/**
 * MEMBER LIMIT (Free plan: max 3 users)
 */
const checkMemberLimit = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.tenantId);
    if (!org) return res.status(404).json({ message: "Organization not found" });

    if (org.plan === "PRO") return next();

    const memberCount = await User.countDocuments({
      organization: req.tenantId
    });

    if (memberCount >= 3) {
      return res.status(403).json({
        message: "Free plan allows only 3 members. Upgrade to invite more."
      });
    }

    next();
  } catch (err) {
    console.error("MEMBER LIMIT ERROR:", err.message);
    res.status(500).json({ message: "Plan validation failed" });
  }
};

/**
 * PROJECT LIMIT (Free plan: max 5 projects)
 */
const checkProjectLimit = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.tenantId);
    if (!org) return res.status(404).json({ message: "Organization not found" });

    if (org.plan === "PRO") return next();

    const projectCount = await Project.countDocuments({
      organization: req.tenantId
    });

    if (projectCount >= 5) {
      return res.status(403).json({
        message: "Free plan allows only 5 projects. Upgrade to continue."
      });
    }

    next();
  } catch (err) {
    console.error("PROJECT LIMIT ERROR:", err.message);
    res.status(500).json({ message: "Plan validation failed" });
  }
};

module.exports = { checkMemberLimit, checkProjectLimit };
