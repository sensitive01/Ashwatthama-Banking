const Admin = require("../../model/admin/adminModel");
const UserModel = require("../../model/user/userModel");
const contactSchema = require("../../model/user/contactModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const initializeAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });
      await newAdmin.save();
      console.log("✅ Default admin created:", newAdmin.email);
    } else {
      console.log("ℹ️ Admin already exists:", existingAdmin.email);
    }
  } catch (error) {
    console.error("❌ Error initializing admin:", error);
  }
};

// ✅ Admin Login
const adminVerification = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required." });
    }

    const admin = await Admin.findOne({ email: userEmail });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }

    const isPasswordMatch = await bcrypt.compare(userPassword, admin.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { email: admin.email, role: "admin" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "2h" }
    );

    console.log("✅ Admin login successful");
    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      token,
    });
  } catch (err) {
    console.error("❌ Error in admin verification:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during admin verification.",
      error: err.message,
    });
  }
};

const getUserFormData = async (req, res) => {
  try {
    const userData = await UserModel.find({ isVisible: true });
    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    console.error("Error in getting the user form data:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get user form data" });
  }
};

const getIndividualUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserModel.findOne({ _id: id });

    if (!userData) {
      // If no user found
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send user data if found
    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    console.error("Error fetching individual user data:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteUserData = async (req, res) => {
  try {
    const { id } = req.params;

    const userData = await UserModel.findByIdAndUpdate(
      id,
      { isVisible: false },
      { new: true } // returns the updated document
    );

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User marked as inactive", data: userData });
  } catch (err) {
    console.error("Error updating the user visibility:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getAllEnquiries = async (req, res) => {
  try {
    const enquiryData = await contactSchema.find();

    return res.status(200).json({
      success: true,
      message: "Enquiries fetched successfully",
      data: enquiryData
    });

  } catch (err) {
    console.log("Error in getting all enquiries", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: err.message
    });
  }
};











module.exports = {
  getAllEnquiries,
  deleteUserData,
  getIndividualUserData,
  getUserFormData,
  adminVerification,
  initializeAdmin,
};
