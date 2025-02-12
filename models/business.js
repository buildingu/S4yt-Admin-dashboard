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
    youtubeLink: { type: String },
    logo: { type: String },
    winners: [{ type: mongoose.Schema.Types.ObjectId }],
    attendance_confirm: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false}
  }, { timestamps: true });
  
module.exports = mongoose.model('adminBusiness', businessSchema);
  