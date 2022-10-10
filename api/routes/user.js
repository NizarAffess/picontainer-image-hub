const { registerUser } = require("../controllers/user");

const router = require("express").Router();

router.post("/user/register", registerUser);

module.exports = router;
