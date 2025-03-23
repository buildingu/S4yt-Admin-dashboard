const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], enum: ['superadmin', 'business'], default: ['business'] },
  deleted: { type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model('adminUser', userSchema);