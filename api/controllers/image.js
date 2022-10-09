const Image = require("../models/image");

const getCreateRoute = (req, res) => {
  res.status(200).json({ message: "Create image page" });
};

const createImage = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ message: "Please add an image title" });
    }
    const image = await Image.create(req.body);
    res.status(200).json(image);
  } catch (error) {
    console.log("Error while creating image: ", error);
    res.status(500).json(error);
  }
};


module.exports = { createImage, getCreateRoute };
