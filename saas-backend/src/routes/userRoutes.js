const { changePassword } = require("../controllers/userController");
const {requireAuth} = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.patch("/password", requireAuth, changePassword);

module.exports = router;
