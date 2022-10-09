const asyncHandler = require("express-async-handler");
const Image = require("../models/image");

const getCreateRoute = (req, res) => {
  res.status(200).json({ message: "Create image page" });
};

const createImage = asyncHandler(async (req, res) => {
  console.log("LINE 9: ", req.body);
  if (!req.body.title) {
    res.status(400).json({ message: "Please add an image title" });
  }
  const image = await Image.create(req.body);
  res.status(200).json(image);
});

module.exports = { createImage, getCreateRoute };
