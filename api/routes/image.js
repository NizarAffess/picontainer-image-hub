const {
  createImage,
  getCreateRoute,
  updateImage,
  deleteImage,
  getImage,
  getImages,
} = require("../controllers/image");
const { protect } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", protect, getCreateRoute);
router.get("/images", protect, getImages);
router.get("/image/:id", protect, getImage);
router.post("/image/create", protect, createImage);
router.put("/image/:id", protect, updateImage);
router.delete("/image/:id", protect, deleteImage);

module.exports = router;
