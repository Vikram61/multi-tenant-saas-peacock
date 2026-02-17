const User = require("../models/User");
const ROLES = require("../constants/roles");
const Project = require("../models/Project");
const Organization = require("../models/Organization");

// GET /members
exports.getMembers = async (req, res) => {
  const members = await User.find({ organization: req.tenantId })
    .select("_id name email role createdAt");

  res.json(members);
};


// PATCH /members/:id/role
exports.updateRole = async (req, res) => {
  const { role } = req.body;

  if (!Object.values(ROLES).includes(role))
    return res.status(400).json({ message: "Invalid role" });

  const targetUser = await User.findOne({
    _id: req.params.id,
    organization: req.tenantId
  });

  if (!targetUser)
    return res.status(404).json({ message: "User not found in organization" });

  // Owner protection
  if (targetUser.role === ROLES.OWNER)
    return res.status(403).json({ message: "Cannot modify owner role" });

  targetUser.role = role;
  await targetUser.save();

  res.json({ message: "Role updated" });
};


// DELETE /members/:id


exports.removeMember = async (req, res) => {
  const member = await User.findById(req.params.id);

  if (!member)
    return res.status(404).json({ message: "Member not found" });

  if (member.organization.toString() !== req.tenantId.toString())
    return res.status(403).json({ message: "Not in your organization" });

  if (member.role === "OWNER")
    return res.status(400).json({ message: "Cannot remove owner" });

  // detach user from workspace
  member.organization = undefined;
  member.role = "NO_ORG";

  await member.save();

  await Organization.findByIdAndUpdate(req.tenantId, {
    $inc: { memberCount: -1 }
  });

  res.json({ message: "Member removed" });
};

