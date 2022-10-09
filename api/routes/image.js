const {
  createImage,
  getCreateRoute,
  updateImage,
  deleteImage,
  getImage,
} = require("../controllers/image");

const router = require("express").Router();

router.get("/", getCreateRoute);
router.get("/image/:id", getImage);
router.post("/image/create", createImage);
router.put("/image/:id", updateImage);
router.delete("/image/:id", deleteImage);

module.exports = router;
