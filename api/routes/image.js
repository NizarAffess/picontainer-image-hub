const {
  createImage,
  getCreateRoute,
  updateImage,
  deleteImage,
  getImage,
  getImages,
} = require("../controllers/image");

const router = require("express").Router();

router.get("/", getCreateRoute);
router.get("/images", getImages);
router.get("/image/:id", getImage);
router.post("/image/create", createImage);
router.put("/image/:id", updateImage);
router.delete("/image/:id", deleteImage);

module.exports = router;
