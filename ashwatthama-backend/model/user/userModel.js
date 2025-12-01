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
    idProofFile: String, 
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
    password: String,
    customerId:{type:String},
    avlBalance:{type:Number,default:0},
    accountNumber: String,
    
    isVisible: { type: Boolean, default: true },
    isPasswordChanged:{type:Boolean,default:false},
    isProfileActive: { type: Boolean, default: false },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavingsAccount", savingsAccountSchema);
