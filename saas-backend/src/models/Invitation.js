const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  role: {
    type: String,
    enum: ["ADMIN", "MEMBER"],
    default: "MEMBER"
  },

  token: {
    type: String,
    required: true,
    unique: true
  },

  expiresAt: {
    type: Date,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Invitation", invitationSchema);
