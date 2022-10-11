const { registerUser, loginUser, getProfile } = require("../controllers/user");
const { protect } = require("../middleware/auth");

const router = require("express").Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/profile", protect, getProfile);

module.exports = router;
