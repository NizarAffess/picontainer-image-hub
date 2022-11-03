const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

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
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(26).required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).max(26).required().label("Password"),
  });
  return schema.validate(data);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User, validate };
