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

const login = async (req, res) => {
  try {
    console.log("STEP 1 - request received");

    const { email, password } = req.body;

    console.log("STEP 2 - before service");

    const { accessToken, refreshToken } = await loginUser({ email, password });

    console.log("STEP 3 - tokens created");

    res.cookie("jid", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    console.log("STEP 4 - cookie set");

    res.json({ accessToken });

    console.log("STEP 5 - response sent");

  } catch (err) {
    console.log("ERROR:", err);
    res.status(400).json({ message: "Invalid credentials" });
  }
};

const refresh = async(req,res)=>{
      console.log("RAW COOKIE HEADER:", req.headers.cookie);
  console.log("PARSED COOKIES:", req.cookies);
try {
    console.log("Cookies received:", req.cookies);

    const token = req.cookies.jid;
    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "No token" });
    }

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    console.log("Decoded payload:", payload);

    const user = await User.findById(payload.userId);
    console.log("DB user:", user?.id, "tokenVersion:", user?.tokenVersion);

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      console.log("Token version mismatch");
      return res.status(401).json({ message: "Invalid token version" });
    }

    const accessToken = createAccessToken(user);

    return res.json({ accessToken });
  } catch (err) {
    console.log("REFRESH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid refresh token" });
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

module.exports = {signup,login,refresh,logoutAll,me};