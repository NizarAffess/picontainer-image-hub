const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
let PORT = process.env.PORT || 8083;

const app = express();
connectDB();

app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json({ message: "Home page route" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
