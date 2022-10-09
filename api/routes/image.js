const { createImage, getCreateRoute } = require("../controllers/image");

const router = require("express").Router();

router.get("/", getCreateRoute);
router.post("/image/create", createImage);

module.exports = router;
