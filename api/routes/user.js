const {
  registerUser,
  loginUser,
  getProfile,
  addProfileInfo,
} = require("../controllers/user");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/cloudinary");

const router = require("express").Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put(
  "/user/profile",
  protect,
  upload.fields([{ name: "photo" }, { name: "coverPhoto" }]),
  addProfileInfo
);
router.get("/user/profile", protect, getProfile);

module.exports = router;
