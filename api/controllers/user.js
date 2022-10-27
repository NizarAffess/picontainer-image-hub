const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const { sendVerifEmail } = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ message: "User already exist" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = await Token.create({
      userId: user._id,
      token: generateToken(user._id),
    });
    const url = `${process.env.BASE_URL}/api/${user._id}/verify/${token.token}`;
    await sendVerifEmail(
      user.email,
      "Email verification",
      `Click on the following link to verify your email: \n${url}`
    );
    res.status(201).json({
      message: "An account verification email was sent to your account!",
    });
    return;
  } catch (error) {
    console.log("Error while creating user: ", error);
    res.status(500).json(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "Invalid url" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json({ message: "Invalid url" });

    await User.findByIdAndUpdate(user._id, { isVerified: true }, { new: true });
    await token.remove();
    res.status(301).redirect(process.env.REDIRECT_URL);
  } catch (error) {
    res.status(500).json({ message: "Error while verifying email", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "No user found with this email" });
      return;
    }
    const { username, email, password, _id, photo } = user._doc;
    const comparedPassword = await bcrypt.compare(req.body.password, password);
    if (user && comparedPassword) {
      if (!user.isVerified) {
        let token = await Token.find({ userId: _id });
        if (!token) {
          token = await Token.create({
            userId: _id,
            token: generateToken(_id),
          });
          const url = `${process.env.BASE_URL}/api/${user._id}/verify/${token.token}`;
          await sendVerifEmail(
            user.email,
            "Email verification",
            `Click on the following link to verify your email: \n${url}`
          );
        }
        res.status(400).json({
          message:
            "An account verification email was sent to your account! Please verify your account!",
        });
        return;
      }
      res.status(200).json({
        message: `${user.username} Successfully logged in`,
        user: {
          username,
          email,
          _id,
          photo,
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

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Returned from the middleware.
    if (user) {
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
      return;
    }
    res.status(400).json({ message: "No user found" });
  } catch (error) {
    console.log("Error while getting user: ", error);
    res.status(500).json(error);
  }
};

const addProfileInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      if (req.files) {
        if (req.files.photo) {
          req.body.photo = req.files.photo[0].path;
        }
        if (req.files.coverPhoto) {
          req.body.coverPhoto = req.files.coverPhoto[0].path;
        }
        console.log(req.files);
      }
      const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
      return;
    }
    res.status(400).json({ message: "No user found" });
  } catch (error) {
    console.log("Error while adding profile information: ", error);
    res.status(500).json(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  addProfileInfo,
  verifyEmail,
};
