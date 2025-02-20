const mongoose = require('mongoose');
const superAdminSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    last_loggedin: {
      type: Date,
      default: Date.now, 
    },
    location: String,
    active: {
      type: Boolean,
      default: true, 
    },
  });

  const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
  module.exports = SuperAdmin;