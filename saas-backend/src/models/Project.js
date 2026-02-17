const mongoose = require("mongoose");

const projectMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    enum: ["ADMIN", "EDITOR", "VIEWER"],
    default: "VIEWER"
  }
}, { _id: false });


const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: String,

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    index: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  members: [projectMemberSchema]

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
