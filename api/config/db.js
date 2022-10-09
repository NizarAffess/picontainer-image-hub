const mongoose = require("mongoose");

const connectDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Erro while connecting to MongoDB", error);
  }
};

module.exports = connectDB;
