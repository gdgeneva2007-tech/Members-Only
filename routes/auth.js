// routes/auth.js
// TEMPLATE: these routes never change between projects

const express = require("express");
const router = express.Router();
const {
  signupValidationRules,
  getSignupForm,
  postSignup,
  getLoginForm,
  postLogin,
  logout
} = require("../controllers/authController");
const { ensureGuest } = require("../middleware/auth");

router.get("/signup", ensureGuest, getSignupForm);
router.post("/signup", ensureGuest, signupValidationRules, postSignup);
router.get("/login", ensureGuest, getLoginForm);
router.post("/login", postLogin);
router.post("/logout", logout);

module.exports = router;