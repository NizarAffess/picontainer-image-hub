const {
  createImage,
  getCreateRoute,
  updateImage,
  deleteImage,
  getImage,
  getImages,
  saveImage,
} = require("../controllers/image");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/cloudinary");
const router = require("express").Router();

router.get("/", protect, getCreateRoute);
router.get("/images", protect, getImages);
router.get("/image/:id", protect, getImage);
router.post("/image/create", protect, upload.single("url"), createImage);
router.put("/image/:id", protect, upload.single("url"), updateImage);
router.put("/image/:id/save", protect, saveImage);
router.delete("/image/:id", protect, deleteImage);

module.exports = router;
