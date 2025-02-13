const mongoose = require('mongoose');

const coinTransactionSchema = new mongoose.Schema({
    source: { type: String, required: true },
    count: { type: Number, required: true }
  }, { _id : false , strict: false, collection: 'Cointransactions' });

  module.exports = coinTransactionSchema;