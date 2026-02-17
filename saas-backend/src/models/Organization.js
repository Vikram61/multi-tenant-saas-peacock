const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    plan : {
        type: String,
        enum :["FREE", "PRO","TEAM"],
        default : "FREE"
    },
    memberCount : {
        type: Number,
        default : 1
    },
    projectCount: {
  type: Number,
  default: 0
}
},{timestamps:true});

module.exports = new mongoose.model("Organization", organizationSchema);