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

userRoute.put(
  "/update-customer-full-data/:customerId",
  upload.fields([
    { name: "idProofFile", maxCount: 1 },
    { name: "addressProofFile", maxCount: 1 },
    { name: "photoFile", maxCount: 1 },
    { name: "paymentProofFile", maxCount: 1 },
  ]),
  userController.updateCustomerData
);

userRoute.post("/verify-login",userController.verifyUserLogin);
userRoute.get("/get-customer-name/:customerId",userController.getCustomerName);
userRoute.get("/get-customer-full-data/:customerId",userController.getCustomerFullData);
userRoute.put("/change-customer-password/:customerId",userController.customerChangePassword);
userRoute.post("/send-otp-for-account-verification",userController.sendOtpForAccountVerification);
userRoute.post("/verify-otp-for-account-verification",userController.verifyOtpForAccountVerification);
userRoute.post("/reset-password-for-account-login",userController.resetPasswordForAccountLogin);
userRoute.post("/user-submit-contact-us-form",userController.userSubmitContactUsForm);

module.exports = userRoute;
