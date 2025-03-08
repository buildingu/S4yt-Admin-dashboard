const { Document, model, Schema, Types } = require("mongoose");
const userRoles = ["Admin", "Player", "Business"];
const userEducation = ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"];
const coinSources = ["register", "referral", "chest"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    name: { type: String, default: null, minlength: 2, maxlength: 128 },
    education: {
      type: String,
      enum: userEducation,
    },
    school: { type: String, default: null },
    password: { type: String, required: true },
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
    chests_submitted: { type: Map, of: Number },
    is_email_verified: { type: Boolean, default: false },
    email_verification_token: { type: String, default: null },
    reset_password_token: { type: String, default: null },
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
