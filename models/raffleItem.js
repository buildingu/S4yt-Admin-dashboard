import { model, Schema } from "mongoose";

const raffleItemSchema = new Schema(
  {
    raffle_partner: { type: Schema.Types.ObjectId, ref: "RafflePartner" },
    name: { type: String, required: true },
    description: { type: String },
    image_src: { type: String, required: true },
    stock: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
  },
  { strict: false }
);

const RaffleItemModel = model("RaffleItem", raffleItemSchema);

export default RaffleItemModel;
