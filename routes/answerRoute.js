const express = require('express');
const router = express.Router();

const {
    getBusinessAnswers,
    updateAnswerRatings
} = require("../controllers/answerController")

router.get("/answers/:businessId", getBusinessAnswers)
router.post("/answers/:answerId", updateAnswerRatings)

module.exports = router;