const bcrypt = require("bcrypt");
const User = require("../models/User");

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findById(userId).select("+password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match)
      return res.status(401).json({ message: "Incorrect current password" });

    // IMPORTANT — assign plain password ONLY
    user.password = newPassword;

    // invalidate sessions
    user.tokenVersion += 1;

    await user.save(); // pre-save hook hashes

    return res.json({ message: "Password updated" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = changePassword;
