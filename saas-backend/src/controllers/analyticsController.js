const User = require("../models/User");
const Project = require("../models/Project");
const Organization = require("../models/Organization");

exports.getOverview = async (req, res) => {
  try {
    const orgId = req.tenantId;

    const [memberCount, projectCount, roleStats, org] = await Promise.all([

      User.countDocuments({ organization: orgId }),

      Project.countDocuments({ organization: orgId }),

      User.aggregate([
        { $match: { organization: orgId } },
        { $group: { _id: "$role", count: { $sum: 1 } } }
      ]),

      Organization.findById(orgId).select("plan")
    ]);

    res.json({
      members: memberCount,
      projects: projectCount,
      roleDistribution: roleStats,
      plan: org.plan
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to load analytics" });
  }
};
