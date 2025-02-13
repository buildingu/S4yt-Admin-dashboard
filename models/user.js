const mongoose = require('mongoose');
const coinTransactionSchema = require('./coinTransactions');

const userSchema = new mongoose.Schema({
  city: { type: String, default: null },
  country: { type: String, default: null },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  education: {
    type: String,
    enum: ['Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12',
      'Other']
  },
  name: { type: String, default: null, minlength: 2, maxlength: 128 },
  password: { type: String, required: true },
  chests_submitted: { type: Map, of: Boolean },
  region: { type: String, default: null },
  is_email_verified: { type: Boolean, default: false },
  email_verification_token: { type: String, default: null },
  reset_password_token: { type: String, default: null },
  token_version: { type: Number, default: 0 },
  role: {
    type: String,
    enum: [
      'Admin',
      'Player',
      'Business'
    ] ,
    required: true
  },
  coins: { type: Number, default: 0 },
  coin_transactions: [coinTransactionSchema],
  referral_code: { type: String, default: null },
  accepted_referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AcceptedReferral' }],
  kicked: { type: Boolean, default: false },
  banned_until: { type: Date, default: null },
  show_instructions: { type: Boolean, default: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  strict: false, 
  collection: 'users' 
});
module.exports = mongoose.model('users', userSchema);