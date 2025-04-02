const express = require('express');
const router = express.Router();

const {
    getBusinesses,
    getBusinessById, 
    updateBusiness, 
    deleteBusiness,
    getBusinessAnswers,
} = require("../controllers/businessController")

router.get('/business/', getBusinesses);
router.get('/business/:id', getBusinessById);
router.put('/business/:id', updateBusiness);
router.delete('/business/:id', deleteBusiness);
router.get("/:businessId/answers", getBusinessAnswers)

module.exports = router;