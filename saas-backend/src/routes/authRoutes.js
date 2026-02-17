const express = require('express');
const router  = express.Router();
const {signup,login, me, updateProfile} = require('../controllers/authController');
const { acceptInvitation } = require("../services/acceptInviteService");
const {requireAuth} = require('../middleware/authMiddleware')
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const Project = require('../models/Project');

const { createAccessToken } = require("../utils/token");


router.get("/me", requireAuth, me);
router.patch("/profile", requireAuth, updateProfile);

router.post('/signup',signup);
router.post('/login',login);
router.post("/join-existing", requireAuth, async (req, res) => {
  const { token } = req.body;

  const invite = await Invitation.findOne({ token });
  if (!invite) return res.status(400).json({ message: "Invalid invite" });

  if (invite.expiresAt < new Date())
    return res.status(400).json({ message: "Invite expired" });

  if (invite.email !== req.user.email)
    return res.status(403).json({ message: "This invite is for another email" });

  if (req.user.organization)
    return res.status(400).json({ message: "Already in organization" });

  req.user.organization = invite.organization;
  req.user.role = invite.role;
await Project.updateMany(
  { organization: invite.organization },
  { $addToSet: { members: req.user._id } }
);
  await req.user.save();
  await invite.deleteOne();

  res.json({ message: "Joined workspace" });
});

// CREATE ACCOUNT FROM INVITE (PUBLIC)
router.post("/accept-invite", async (req, res) => {
  try {
    const { token, name, password } = req.body;

    if (!token || !name || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await acceptInvitation({ token, name, password });

    return res.status(201).json({
      message: "Joined organization",
      userId: user._id
    });

  } catch (err) {

    // user already exists → login instead
    if (err.code === "ACCOUNT_EXISTS_LOGIN") {
      return res.status(409).json({
        code: "ACCOUNT_EXISTS_LOGIN",
        message: "Account exists. Please login to join workspace."
      });
    }

    return res.status(400).json({ message: err.message });
  }
});


module.exports = router;
