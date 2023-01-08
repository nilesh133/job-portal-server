const express = require("express");
const { sendMessage, fetchRecruiterMessages, fetchAllRecruiterMessages } = require("../controllers/messagesController");
const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/fetch-recruiter-messages/:recruiter_id", fetchRecruiterMessages);
router.get("/fetch-all-recruiter-messages", fetchAllRecruiterMessages);

module.exports = router;