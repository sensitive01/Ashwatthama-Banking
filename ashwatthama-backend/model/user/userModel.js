const mongoose = require("mongoose");

const savingsAccountSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    aadharNumber: String,
    contactNumber: String,
    email: String,
    idProofType: String,
    idProofNumber: String,
    idProofFile: String, // will store file path
    addressLine: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    landmark: String,
    addressProofType: String,
    addressProofNumber: String,
    addressProofFile: String,
    photoFile: String,
    occupationType: String,
    nomineeName: String,
    nomineeContact: String,
    nomineeRelation: String,
    paymentProofFile: String,
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavingsAccount", savingsAccountSchema);
