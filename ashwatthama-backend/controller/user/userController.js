const SavingsAccount = require("../../model/user/userModel");
const createSavingsAccount = async (req, res) => {
  try {
    console.log("Welcome to savings account");
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const {
      firstName,
      lastName,
      aadharNumber,
      contactNumber,
      email,
      idProofType,
      idProofNumber,
      addressLine,
      area,
      city,
      state,
      pincode,
      landmark,
      addressProofType,
      addressProofNumber,
      occupationType,
      nomineeName,
      nomineeContact,
      nomineeRelation,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !contactNumber) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["firstName", "lastName", "email", "contactNumber"],
      });
    }

    // Extract uploaded Cloudinary URLs
    const idProofFile = req.files?.idProofFile?.[0]?.path || null;
    const addressProofFile = req.files?.addressProofFile?.[0]?.path || null;
    const photoFile = req.files?.photoFile?.[0]?.path || null;
    const paymentProofFile = req.files?.paymentProofFile?.[0]?.path || null;

    // Check if required files are uploaded
    if (!idProofFile || !addressProofFile || !photoFile || !paymentProofFile) {
      return res.status(400).json({
        message: "Missing required files",
        uploadedFiles: {
          idProofFile: !!idProofFile,
          addressProofFile: !!addressProofFile,
          photoFile: !!photoFile,
          paymentProofFile: !!paymentProofFile,
        },
      });
    }

    console.log("Creating new savings account...");

    const newAccount = new SavingsAccount({
      firstName,
      lastName,
      aadharNumber,
      contactNumber,
      email,
      idProofType,
      idProofNumber,
      idProofFile,
      addressLine,
      area,
      city,
      state,
      pincode,
      landmark,
      addressProofType,
      addressProofNumber,
      addressProofFile,
      photoFile,
      occupationType,
      nomineeName,
      nomineeContact,
      nomineeRelation,
      paymentProofFile,
    });

    await newAccount.save();

    console.log("Account created successfully:", newAccount._id);

    res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
      data: newAccount,
    });
  } catch (error) {
    console.error("Error saving form:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry",
        field: Object.keys(error.keyPattern)[0],
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createSavingsAccount,
};
