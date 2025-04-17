const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  admin_business: { type: mongoose.Schema.Types.ObjectId, ref: 'adminbusiness' },
  deleted: { type: Boolean, required: true, default: false } 
}, {strict: false});

module.exports = mongoose.model('challenge', challengeSchema);
