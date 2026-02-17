const {registerUser, loginUser} = require('../services/authService');
const User = require('../models/User');
const {createAccessToken} = require('../utils/token');
const jwt = require('jsonwebtoken')

const signup = async(req,res)=>{
    try {
        console.log("BODY RECEIVED:", req.body); 
    const {name,email,password, organizationName} = req.body;

    if(!name || !email || !password || !organizationName)
        return res.status(400).json({message: "Missing fields" })

    if(password.length < 6)
        return res.status(400).json({ message: "Weak password" })

    const user = await registerUser({name, email, password, organizationName});

    res.status(201).json({
        message:"User created",
        userId:user._id
    })
   }catch(err){
    res.status(400).json({message:err.message});
   }
};
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length < 2)
      return res.status(400).json({ message: "Invalid name" });

    req.user.name = name;
    await req.user.save();

    res.json({
      message: "Profile updated",
      name: req.user.name
    });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

const login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const { accessToken } = await loginUser({ email, password });

    console.log("LOGIN SUCCESS");

    res.json({ accessToken });

  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(400).json({ message: err.message });
  }
};




const logoutAll = async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id, {
        $inc:{tokenVersion:1}
    });
    res.sendItem(200);
};
const me = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    organization: req.user.organization
  });
};


module.exports = {signup,login,logoutAll,me, updateProfile};