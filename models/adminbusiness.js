const mongoose = require('mongoose');
const businessSchema = new mongoose.Schema({
    business_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    business_name: { type: String, required: true },
    description: { type: String },
    question_main: { type: String },
    questions_learn_earn: [{
      question: String,
      optionA: String,
      optionB: String,
      optionC: String,
      explanation: String,
      correct: String
    }],
    video_tile: String,
    video_url: { type: String },
    title: String,
    logo: { type: String },
    winners: [{_id: false, user: mongoose.Schema.Types.ObjectId,  award: Number}],
    attendance_confirm: { type: Boolean, default: false },
    award_limit: Number,
    awarded_total: Number,
    deleted: { type: Boolean, default: false}
  }, { timestamps: true });
  
module.exports = mongoose.model('adminBusiness', businessSchema);