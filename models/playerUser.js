const { model, Schema } = require("mongoose");
const userRoles = ["Admin", "Player", "Business"];
const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    name: { type: String, default: null, minlength: 2, maxlength: 128 },
    school: { type: String, default: null },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: userRoles,
      required: true,
    },
    coins: { type: Number, default: 0 },
    kicked: { type: Boolean, default: false },
    banned_until: { type: Date, default: null },
    attend_meeting: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  },
  { strict: false }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
