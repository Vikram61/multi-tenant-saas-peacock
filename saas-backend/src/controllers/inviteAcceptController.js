const bcrypt = require("bcrypt");
const User = require("../models/User");
const Invitation = require("../models/Invitation");
const { createAccessToken, createRefreshToken } = require("../utils/token");

exports.acceptInvite = async (req, res) => {
  try {
    const { token } = req.params;
    const { name, password } = req.body;

    if (!name || !password)
      return res.status(400).json({ message: "Missing fields" });

    // 1️⃣ find invite
    const invite = await Invitation.findOne({ token });
    if (!invite)
      return res.status(400).json({ message: "Invalid invite" });

    // 2️⃣ check if user already exists
    let user = await User.findOne({ email: invite.email });

    if (user)
      return res.status(400).json({ message: "User already registered" });

    // 3️⃣ create user in organization
    const hashed = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email: invite.email,
      password: hashed,
      organization: invite.organization,
      role: invite.role
    });

    // 4️⃣ delete invite (single use)
    await invite.deleteOne();

    // 5️⃣ login immediately
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("jid", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });

    res.json({ accessToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Join failed" });
  }
};
