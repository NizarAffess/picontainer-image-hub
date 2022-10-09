const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("Image", ImageSchema);
