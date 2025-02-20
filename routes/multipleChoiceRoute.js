const express = require('express');
const router = express.Router();
const {
    getMultipleChoice,
    updateMultipleChoice,
    createMultipleChoice,
    deleteMultipleChoice,
    getMultipleChoiceCount
} = require('../controllers/multipleChoiceController');


router.get('/multiple-choice/:id', getMultipleChoice);
router.get('/multiple-choice-count/:id', getMultipleChoiceCount);
router.put('/multiple-choice/:id', updateMultipleChoice);
router.post('/multiple-choice/:id', createMultipleChoice);
router.delete('/multiple-choice/:id', deleteMultipleChoice);

module.exports = router;