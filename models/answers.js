const mongoose = require('mongoose');
const answersSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    challenge_id: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
    rating: Number,
    submission_link: { type: String, required: true },
    timestamp: Date,
    deleted: { type: Boolean, default: false },
}, { strict: false });

module.exports = mongoose.model('answer', answersSchema);