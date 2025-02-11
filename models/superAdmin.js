const mongoose = require('mongoose');
const raffleItemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    resource_link: { type: String },
    logo: { type: File },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('adminRaffleItem', raffleItemSchema);
  