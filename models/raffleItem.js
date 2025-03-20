const { model, Schema } = require("mongoose");

const raffleItemSchema = new Schema(
  {
    raffle_partner: { type: Schema.Types.ObjectId, ref: "RafflePartner" },
    raffle_partner_name: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    image_src: { type: String, required: true },
    stock: { type: Number, required: true },
    resource_link: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  { strict: false }
);

const RaffleItemModel = model("RaffleItem", raffleItemSchema);

module.exports = RaffleItemModel;
