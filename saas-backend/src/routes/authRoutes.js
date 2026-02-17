const express = require('express');
const router  = express.Router();
const {signup,login,refresh, me} = require('../controllers/authController');
const { acceptInvitation } = require("../services/acceptInviteService");
const {requireAuth} = require('../middleware/authMiddleware')
const User = require('../models/User');


router.post("/accept-invite", async (req, res) => {
  try {
    const { token, name, password } = req.body;

    if (!token || !name || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await acceptInvitation({ token, name, password });

    res.status(201).json({
      message: "Joined organization",
      userId: user._id
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/me", requireAuth, me);

router.post('/signup',signup);
router.post('/login',login);
router.post('/refresh',refresh);

module.exports = router;