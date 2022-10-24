const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    coverPhoto: { type: String },
    bio: { type: String },
    address: { type: String },
    saved: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
