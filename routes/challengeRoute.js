const express = require('express');
const router = express.Router();

const {
    createChallenge,
    updateChallenge
} = require("../controllers/challengeController")

router.post('/challenge/:businessId', createChallenge);
router.put('/challenge/:businessId', updateChallenge);


module.exports = router;