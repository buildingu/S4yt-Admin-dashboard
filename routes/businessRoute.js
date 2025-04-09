const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }).single('logo');
const {
    getBusinesses,
    getBusinessById, 
    updateBusiness, 
    deleteBusiness,
} = require("../controllers/businessController")

router.get('/business/', getBusinesses);
router.get('/business/:id', getBusinessById);
router.put('/business/:id', upload, updateBusiness);
router.delete('/business/:id', deleteBusiness);


module.exports = router;