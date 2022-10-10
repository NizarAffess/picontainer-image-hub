const User = require("../models/user");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    if (user) {
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .json({ message: `${user.username} successfully created`, rest });
    }
  } catch (error) {
    console.log("Error while creating user: ", error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser };
