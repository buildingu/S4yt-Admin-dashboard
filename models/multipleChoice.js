const mongoose = require('mongoose');

const multipleChoiceSchema = new mongoose.Schema({
    business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Adminbusinesses', required: true },
    question: {type: String, required: true},
    answers: {
      choices: { type: Map, of: String },
      correct: { type: String, required: true},
      explanation: String
    },
    deleted: { type: Boolean, default: false }
}, {strict: false})

module.exports = mongoose.model('MultipleChoice', multipleChoiceSchema);