const express = require('express');
const router = express.Router();

const {
    getBusinessById, 
    updateBusiness, 
    deleteBusiness
} = require("../controllers/businessController")


router.get('/business/:id', getBusinessById);
router.put('/business/:id', updateBusiness);
router.delete('/business/:id', deleteBusiness);

module.exports = router;