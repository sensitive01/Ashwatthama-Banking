const express = require("express");
const userRoute = express.Router();
const upload = require("../../middleware/uploadCloudinary");
const userController = require("../../controller/user/userController");

userRoute.post(
  "/send-form-data",
  upload.fields([
    { name: "idProofFile", maxCount: 1 },
    { name: "addressProofFile", maxCount: 1 },
    { name: "photoFile", maxCount: 1 },
    { name: "paymentProofFile", maxCount: 1 },
  ]),
  userController.createSavingsAccount
);

module.exports = userRoute;
