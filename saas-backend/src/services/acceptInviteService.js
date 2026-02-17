const mongoose = require("mongoose");
const User = require("../models/User");
const Invitation = require("../models/Invitation");
const Organization = require("../models/Organization");

const acceptInvitation = async ({ token, name, password }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const invite = await Invitation.findOne({ token }).session(session);

    if (!invite) throw new Error("Invalid invitation");

    if (invite.expiresAt < new Date())
      throw new Error("Invitation expired");

    const existingUser = await User.findOne({ email: invite.email }).session(session);
    if (existingUser) throw new Error("User already exists");

    // create user inside organization
    const user = new User({
      name,
      email: invite.email,
      password,
      role: invite.role,
      organization: invite.organization
    });

    await user.save({ session });

    // increment member count
    await Organization.findByIdAndUpdate(
      invite.organization,
      { $inc: { memberCount: 1 } },
      { session }
    );

    // delete invitation
    await Invitation.deleteOne({ _id: invite._id }).session(session);

    await session.commitTransaction();
    session.endSession();

    return user;

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

module.exports = { acceptInvitation };
