const mongoose = require("mongoose");
const User = require("../models/User");
const Invitation = require("../models/Invitation");
const Organization = require("../models/Organization");
const Project = require("../models/Project");


const acceptInvitation = async ({ token, name, password }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("TOKEn received",token)
    const invite = await Invitation.findOne({ token }).session(session);
    if (!invite) throw new Error("Invalid invitation");
    if (invite.expiresAt < new Date()) throw new Error("Invitation expired");

    const existingUser = await User.findOne({ email: invite.email }).session(session);
    if (existingUser) {
      const err = new Error("ACCOUNT_EXISTS_LOGIN");
      err.code = "ACCOUNT_EXISTS_LOGIN";
      throw err;
    }

    // create user (NO HASH HERE)
    const user = new User({
      name,
      email: invite.email,
      password:password,
      role: invite.role,
      organization: invite.organization
    });

    await user.save({ session });

    await Organization.findByIdAndUpdate(
      invite.organization,
      { $inc: { memberCount: 1 } },
      { session }
    );
// Add user to all organization projects
await Project.updateMany(
  { organization: invite.organization },
  { $addToSet: { members: user._id } },
  { session }
);

    await Invitation.deleteOne({ _id: invite._id }).session(session);

    await session.commitTransaction();
    session.endSession();

    return user;

  } catch (err) {
if (existingUser) {
  const err = new Error("ACCOUNT_EXISTS_LOGIN");
  err.code = "ACCOUNT_EXISTS_LOGIN";
  throw err;
}

  }
};


module.exports = { acceptInvitation };
