const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
