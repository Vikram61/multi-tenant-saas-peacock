const crypto = require("crypto");
const Invitation = require("../models/Invitation");

const createInvitation = async (email, organizationId, role) => {

  const token = crypto.randomBytes(32).toString("hex");

  const invitation = await Invitation.create({
    email: email.toLowerCase(),
    organization: organizationId,
    role,
    token,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
  });

  return invitation;
};

module.exports = { createInvitation };
