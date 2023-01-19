const express = require("express")
const router = express.Router();
const {updateUserProfile, updateRecruiterLogo, updateRecruiterAbout} = require("../controllers/userController")

router.post("/update-user-profile", updateUserProfile);
router.post("/update-recruiter-logo", updateRecruiterLogo);
router.post("/update-recruiter-about", updateRecruiterAbout);

module.exports = router;