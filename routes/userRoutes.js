const express = require("express")
const router = express.Router();
const {updateUserProfile} = require("../controllers/userController")

router.post("/update-user-profile", updateUserProfile);

module.exports = router;