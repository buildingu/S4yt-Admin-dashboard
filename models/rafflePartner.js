const { Schema, mongoose } = require("mongoose");

const rafflePartnerSchema = new Schema({
  logo: { type: String, required: true },
  organization_name: { type: String, required: true },
  resource_link: { type: String, required: true },
  resource_category: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("RafflePartner", rafflePartnerSchema);
