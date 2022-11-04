const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const imageRoutes = require("./routes/image");
const userRoutes = require("./routes/user");
let PORT = process.env.PORT || 8083;

const app = express();
connectDB();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use("/api", imageRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
