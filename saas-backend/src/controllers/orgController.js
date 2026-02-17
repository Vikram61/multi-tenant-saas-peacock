const Organization = require("../models/Organization");

exports.upgradePlan = async (req, res) => {
  const { plan } = req.body;

  if (!["FREE", "PRO", "TEAM"].includes(plan))
    return res.status(400).json({ message: "Invalid plan" });

  const org = await Organization.findByIdAndUpdate(
    req.tenantId,
    { plan },
    { new: true }
  );

  res.json({
    message: "Plan upgraded",
    plan: org.plan
  });
};
