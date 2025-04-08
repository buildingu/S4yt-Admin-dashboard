const express = require('express');
const router = express.Router();

const {
    getWinners,
    saveWinners,
    deleteWinners
} = require("../controllers/playerController")

router.get('/winners/:businessId', getWinners);
router.post('/winners/:businessId', saveWinners);
router.delete('/winners/:businessId/:userId', deleteWinners);

module.exports = router;