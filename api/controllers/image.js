const Image = require("../models/image");

const getCreateRoute = (req, res) => {
  res.status(200).json({ message: "Create image page" });
};

const createImage = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ message: "Please add an image title" });
    }
    const { title, description, url } = req.body;
    const image = await Image.create({
      title,
      description,
      url,
      user: req.user.id, // The User ref is required
    });
    res.status(200).json(image);
  } catch (error) {
    console.log("Error while creating image: ", error);
    res.status(500).json(error);
  }
};

const updateImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      res.status(400).json({ message: "Image not found" });
    }
    console.log("LINE 33, image.user: ", image?.user.toString());
    if (image.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedImage);
  } catch (error) {
    console.log("Error while updating image: ", error);
    res.status(500).json(error);
  }
};

const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      res.status(400).json({ message: "Image not found" });
    }
    if (image.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Image successfully deleted", id: deletedImage._id });
  } catch (error) {
    console.log("Error while deleting image: ", error);
    res.status(500).json(error);
  }
};

const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      res.status(400).json({ message: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    console.log("Error while getting image: ", error);
    res.status(500).json(error);
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id });
    if (!images) {
      res.status(400).json({ message: "No images found" });
    }
    res.status(200).json(images);
  } catch (error) {
    console.log("Error while getting images: ", error);
    res.status(500).json(error);
  }
};

module.exports = {
  createImage,
  getCreateRoute,
  updateImage,
  deleteImage,
  getImage,
  getImages,
};
