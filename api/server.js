const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const imageRoutes = require("./routes/image");
let PORT = process.env.PORT || 8083;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
