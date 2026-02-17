const User = require("../models/User");
const ROLES = require("../constants/roles");


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
  const targetUser = await User.findOne({
    _id: req.params.id,
    organization: req.tenantId
  });

  if (!targetUser)
    return res.status(404).json({ message: "User not found" });

  if (targetUser.role === ROLES.OWNER)
    return res.status(403).json({ message: "Cannot remove owner" });

  await targetUser.deleteOne();

  res.json({ message: "Member removed" });
};
