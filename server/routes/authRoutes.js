const express = require("express");
const router = express.Router();

const { register, login, getMe, logout } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const { registerValidationRules, loginValidationRules, validate } = require("../middleware/validators");

router.post("/register", authLimiter, registerValidationRules, validate, register);
router.post("/login", authLimiter, loginValidationRules, validate, login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;