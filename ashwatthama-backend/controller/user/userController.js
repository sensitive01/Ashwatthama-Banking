const SavingsAccount = require("../../model/user/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

    if (!firstName || !lastName || !email || !contactNumber) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["firstName", "lastName", "email", "contactNumber"],
      });
    }

    // File uploads (Cloudinary URLs)
    const idProofFile = req.files?.idProofFile?.[0]?.path || null;
    const addressProofFile = req.files?.addressProofFile?.[0]?.path || null;
    const photoFile = req.files?.photoFile?.[0]?.path || null;
    const paymentProofFile = req.files?.paymentProofFile?.[0]?.path || null;

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

    console.log("Generating unique identifiers...");

    // ✅ Generate unique account number
    let accountNumber;
    let isAccountUnique = false;

    while (!isAccountUnique) {
      const generatedAcc =
        "ASH" + Math.floor(1000000000 + Math.random() * 9000000000);
      const existingAcc = await SavingsAccount.findOne({
        accountNumber: generatedAcc,
      });
      if (!existingAcc) {
        accountNumber = generatedAcc;
        isAccountUnique = true;
      }
    }

    // ✅ Generate unique 6-digit customer ID
    let customerId;
    let isCustomerUnique = false;

    while (!isCustomerUnique) {
      const generatedCust = Math.floor(100000 + Math.random() * 900000); // 6 digits
      const existingCust = await SavingsAccount.findOne({
        customerId: generatedCust,
      });
      if (!existingCust) {
        customerId = generatedCust;
        isCustomerUnique = true;
      }
    }

    console.log("Generated Account Number:", accountNumber);
    console.log("Generated Customer ID:", customerId);

    // ✅ Generate random 8-character password
    const plainPassword = Math.random().toString(36).slice(-8);

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // ✅ Create new savings account entry
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
      accountNumber,
      customerId,
      password: hashedPassword,
    });

    await newAccount.save();
    console.log("Account created successfully:", newAccount._id);

    // ✅ Send email with account details
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"MyBank" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your New Savings Account Details",
      html: `
        <h2>Welcome ${firstName} ${lastName}!</h2>
        <p>Your savings account has been successfully created.</p>
        <p><strong>Customer ID:</strong> ${customerId}</p>
        <p><strong>Account Number:</strong> ${accountNumber}</p>
        <p><strong>Temporary Password:</strong> ${plainPassword}</p>
        <p>Please log in and change your password immediately for security.</p>
        <br/>
        <p>Thank you,<br/>MyBank Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Account created successfully! Credentials sent via email.",
      data: {
        accountId: newAccount._id,
        customerId,
        accountNumber,
        email,
      },
    });
  } catch (error) {
    console.error("Error saving form:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

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

const updateCustomerData = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    console.log("Updating customer data...");
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

    // Handle uploaded files
    const idProofFile = req.files?.idProofFile?.[0]?.path;
    const addressProofFile = req.files?.addressProofFile?.[0]?.path;
    const photoFile = req.files?.photoFile?.[0]?.path;
    const paymentProofFile = req.files?.paymentProofFile?.[0]?.path;

    // Build update object dynamically
    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(aadharNumber && { aadharNumber }),
      ...(contactNumber && { contactNumber }),
      ...(email && { email }),
      ...(idProofType && { idProofType }),
      ...(idProofNumber && { idProofNumber }),
      ...(addressLine && { addressLine }),
      ...(area && { area }),
      ...(city && { city }),
      ...(state && { state }),
      ...(pincode && { pincode }),
      ...(landmark && { landmark }),
      ...(addressProofType && { addressProofType }),
      ...(addressProofNumber && { addressProofNumber }),
      ...(occupationType && { occupationType }),
      ...(nomineeName && { nomineeName }),
      ...(nomineeContact && { nomineeContact }),
      ...(nomineeRelation && { nomineeRelation }),
      ...(idProofFile && { idProofFile }),
      ...(addressProofFile && { addressProofFile }),
      ...(photoFile && { photoFile }),
      ...(paymentProofFile && { paymentProofFile }),
    };

    // Update the customer in DB
    const updatedCustomer = await SavingsAccount.findOneAndUpdate(
      { _id: customerId },
      { $set: updateData },
      { new: true } // return the updated document
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      success: true,
      message: "Customer data updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer data:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const verifyUserLogin = async (req, res) => {
  try {
    const { loginType, Credentials, password } = req.body;

    // Check if all required fields are present
    if (!loginType || !Credentials || !password) {
      return res.status(400).json({
        success: false,
        message: "Login type, credentials, and password are required.",
      });
    }

    let userData;

    // Determine which field to search
    if (loginType === "userId") {
      userData = await SavingsAccount.findOne({ customerId: Credentials });
      if (!userData) {
        return res.status(401).json({
          success: false,
          message: "No user found with this Customer ID.",
        });
      }
    } else if (loginType === "accountNumber") {
      userData = await SavingsAccount.findOne({ accountNumber: Credentials });
      if (!userData) {
        return res.status(401).json({
          success: false,
          message: "No user found with this Account Number.",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid login type. Must be 'customerId' or 'accountNumber'.",
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please try again.",
      });
    }

    // Check if profile is active
    // if (!userData.isProfileActive) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Your account is not active. Please contact support.",
    //   });
    // }

    // If everything is valid, return success
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      userId: userData._id,
    });
  } catch (err) {
    console.error("Error in user login:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

const getCustomerName = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await SavingsAccount.findOne(
      { _id: customerId },
      { firstName: 1, isPasswordChanged: 1, _id: 0 } // only return firstName
    );

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({
      success: true,
      firstName: customer.firstName,
      isPasswordChanged: customer.isPasswordChanged,
    });
  } catch (err) {
    console.error("Error fetching customer name:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCustomerFullData = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await SavingsAccount.findOne(
      { _id: customerId },
      { password: 0 } // only return firstName
    );

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (err) {
    console.error("Error fetching customer name:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const customerChangePassword = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { newPassword, currentPassword } = req.body;

    // Find the customer
    const customer = await SavingsAccount.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    customer.password = hashedPassword;
    if (!customer.isPasswordChanged) {
      customer.isPasswordChanged = true;
    }
    await customer.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  updateCustomerData,
  customerChangePassword,
  getCustomerFullData,
  getCustomerName,
  verifyUserLogin,
  createSavingsAccount,
};
