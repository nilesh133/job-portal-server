const express = require("express");
const router = express.Router();
const {registerValidation, registerRecruiter, registerUser, recruiterLogin, userLogin, loginValidation, logout} = require("../controllers/authController")

router.post("/register-recruiter", registerValidation, registerRecruiter);
router.post("/register-user", registerValidation, registerUser);
router.post("/recruiter-login", loginValidation, recruiterLogin);
router.post("/user-login", loginValidation, userLogin);
router.post("/logout", logout)

module.exports = router;