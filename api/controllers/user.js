const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      const { username, email, _id } = user._doc;
      res.status(201).json({
        message: `${user.username} successfully created`,
        user: {
          username,
          email,
          _id,
          token: generateToken(_id),
        },
      });
    }
  } catch (error) {
    console.log("Error while creating user: ", error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const { username, email, password, _id } = user._doc;
    const comparedPassword = await bcrypt.compare(req.body.password, password);
    if (user && comparedPassword) {
      res.status(200).json({
        message: `${user.username} Successfully logged in`,
        user: {
          username,
          email,
          _id,
          token: generateToken(_id),
        },
      });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log("Error while logging in: ", error);
    res.status(500).json(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser };
