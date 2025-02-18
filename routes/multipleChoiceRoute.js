const express = require('express');
const router = express.Router();
const {
    getMultipleChoice,
    updateMultipleChoice,
    createMultipleChoice,
    deleteMultipleChoice,
} = require('../controllers/multipleChoiceController');


router.get('/multiple-choice/:id', getMultipleChoice);
router.put('/multiple-choice/:id', updateMultipleChoice);
router.post('/multiple-choice/', createMultipleChoice);
router.delete('/multiple-choice/:id', deleteMultipleChoice);

module.exports = router;