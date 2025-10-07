const mongoose = require("mongoose");
require("dotenv").config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD_ASWATHAMA,
  MONGO_DATABASE_NAME_ASWATHAMA,
} = require("./variable");

const dbConnect = () => {
  console.log("Welcome to database");
  mongoose
    .connect(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD_ASWATHAMA}@cluster0.jc8bypf.mongodb.net/${MONGO_DATABASE_NAME_ASWATHAMA}`,
      {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      }
    )
    .then(() => {
      console.log("Connected to the database Atlas");
    })
    .catch((err) => {
      console.error("Error in connecting the database", err);
    });
};

module.exports = dbConnect;
