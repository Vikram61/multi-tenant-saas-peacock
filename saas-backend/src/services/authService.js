const User = require('../models/User');
const bcrypt = require('bcrypt');
const {createAccessToken} = require('../utils/token');


const mongoose = require("mongoose");
const Organization = require("../models/Organization");

const registerUser = async ({ name, email, password, organizationName }) => {
    console.log("service received",  {name, email, password, organizationName })
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    email = email.toLowerCase().trim();

    const existing = await User.findOne({ email }).select("+password");
    if (existing) throw new Error("Invalid credentials");

    // create owner user temporarily (no org yet)
    const user = new User({
      name,
      email,
      password,
      role: "OWNER_TEMP"
    });

    await user.save({ session });

    //create organization
    const organization = new Organization({
    name: organizationName,
    owner: user._id,
    memberCount: 1
    });

    await organization.save({ session });


    //attach organization to user
    user.organization = organization._id;
    user.role = "OWNER";
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return user;

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};




const loginUser = async({email,password})=>{
    email = email.toLowerCase().trim()
    const user = await User.findOne({email}).select("+password");
    console.log("Entered password:", password);
    console.log("Stored hash:", user?.password);
    if(!user)
        throw new Error("Invalid Credentials");
    const isMatch = await user.comparePassword(password);
    console.log("password match",isMatch)
    if(!isMatch) throw new Error("Invalid Credentials");
    const accessToken = createAccessToken(user);

    return {user,accessToken}
}

module.exports = {registerUser, loginUser};