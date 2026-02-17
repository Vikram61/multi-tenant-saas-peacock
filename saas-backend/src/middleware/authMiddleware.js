const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    console.log(header);
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "No token" });

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log("decoded",decoded)
    // IMPORTANT — correct field
    const user = await User.findById(decoded.userId);
    console.log(user)
    if (!user)
      return res.status(401).json({ message: "User not found" });

    // token invalidation check
    if (user.tokenVersion !== decoded.tokenVersion)
      return res.status(401).json({ message: "Token expired" });

    req.user = user;
    req.tenantId = user.organization;

    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
