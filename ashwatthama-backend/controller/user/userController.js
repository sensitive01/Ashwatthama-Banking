const SavingsAccount = require("../../model/user/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const { otpEmailTemplate } = require("../../utils/emailTemplates");
const sendEmail = require("../../utils/sendEmail");
const contactModel = require("../../model/user/contactModel");

const otpStore = {};

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

    // ✅ Basic required field validation
    if (!firstName || !lastName || !email || !contactNumber) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["firstName", "lastName", "email", "contactNumber"],
      });
    }

    // ✅ Check if email or mobile number is already registered
    const existingUser = await SavingsAccount.findOne({
      $or: [{ email }, { contactNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
        details: {
          emailExists: existingUser.email === email,
          contactExists: existingUser.contactNumber === contactNumber,
        },
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
        user: process.env.EMAIL_USER_BANKING,
        pass: process.env.EMAIL_PASS_BANKING,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Ashwatthama Core Banking" <${process.env.EMAIL_USER_BANKING}>`,
      to: email,
      subject: "🎉 Welcome to Ashwatthama Core Banking - Your Account is Ready!",
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold;">🏦 Ashwatthama Core Banking</h1>
                  <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Your Trusted Banking Partner</p>
                </td>
              </tr>

              <!-- Success Banner -->
              <tr>
                <td style="background-color: #e8f5e9; padding: 20px 30px; border-bottom: 3px solid #4caf50;">
                  <table width="100%">
                    <tr>
                      <td width="50">
                        <div style="width: 40px; height: 40px; background-color: #4caf50; border-radius: 50%; text-align: center; line-height: 40px; color: #ffffff; font-size: 24px;">✓</div>
                      </td>
                      <td style="padding-left: 15px;">
                        <h2 style="margin: 0; color: #2e7d32; font-size: 18px;">Account Created Successfully!</h2>
                        <p style="margin: 5px 0 0 0; color: #558b2f; font-size: 13px;">Welcome to Ashwatthama Core Banking</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  
                  <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 20px;">Dear ${firstName} ${lastName},</h3>
                  <p style="margin: 0 0 25px 0; color: #555; font-size: 15px; line-height: 1.6;">Congratulations! Your savings account has been successfully created. We're thrilled to have you with us.</p>

                  <!-- Account Details Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff5f5; border: 2px solid #d32f2f; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px;">
                        <h4 style="margin: 0 0 15px 0; color: #d32f2f; font-size: 16px; text-align: center; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">📋 Your Account Details</h4>
                        
                        <div style="padding: 10px; background-color: #f9f9f9; border-radius: 5px; margin-bottom: 12px;">
                          <div style="color: #666; font-size: 12px; font-weight: 600; margin-bottom: 5px;">CUSTOMER ID</div>
                          <div style="color: #2c3e50; font-size: 16px; font-weight: bold; font-family: 'Courier New', monospace;">${customerId}</div>
                        </div>

                        <div style="padding: 10px; background-color: #f9f9f9; border-radius: 5px; margin-bottom: 12px;">
                          <div style="color: #666; font-size: 12px; font-weight: 600; margin-bottom: 5px;">ACCOUNT NUMBER</div>
                          <div style="color: #2c3e50; font-size: 16px; font-weight: bold; font-family: 'Courier New', monospace;">${accountNumber}</div>
                        </div>

                        <div style="padding: 10px; background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 5px;">
                          <div style="color: #856404; font-size: 12px; font-weight: 600; margin-bottom: 5px;">🔒 TEMPORARY PASSWORD</div>
                          <div style="color: #2c3e50; font-size: 16px; font-weight: bold; font-family: 'Courier New', monospace; background-color: #ffffff; padding: 8px; border-radius: 4px; display: inline-block;">${plainPassword}</div>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Security Warning -->
                  <div style="background-color: #fff3cd; border-left: 4px solid #ff9800; border-radius: 6px; padding: 15px; margin-bottom: 25px;">
                    <table width="100%">
                      <tr>
                        <td width="30" style="font-size: 24px; vertical-align: top;">⚠️</td>
                        <td style="padding-left: 10px;">
                          <h4 style="margin: 0 0 8px 0; color: #f57c00; font-size: 14px; font-weight: bold;">Important Security Notice</h4>
                          <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5;"><strong>Please change your password immediately after your first login.</strong> This temporary password is for initial access only.</p>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Next Steps -->
                  <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <h4 style="margin: 0 0 15px 0; color: #d32f2f; font-size: 16px;">🚀 Next Steps</h4>
                    <ol style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 1.8;">
                      <li>Log in using your Customer ID and temporary password</li>
                      <li><strong>Change your password immediately</strong></li>
                      <li>Complete your profile setup</li>
                      <li>Start banking!</li>
                    </ol>
                  </div>

                  <!-- Login Button -->
                  <div style="text-align: center; margin-bottom: 25px;">
                    <a href="https://yoursite.com/login" style="display: inline-block; background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 6px; font-size: 15px; font-weight: bold;">🔐 Login to Your Account</a>
                  </div>

                  <!-- Support -->
                  <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">Need help? We're here for you!</p>
                    <p style="margin: 0; color: #d32f2f; font-size: 13px; font-weight: 600;">📧 support@ashwatthama.com | 📞 1-800-BANKING</p>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #2c3e50; padding: 25px; text-align: center;">
                  <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px; font-weight: 600;">Thank you for choosing Ashwatthama Core Banking</p>
                  <p style="margin: 0 0 15px 0; color: #bdc3c7; font-size: 12px;">This email contains sensitive information. Do not share your credentials with anyone.</p>
                  <div style="border-top: 1px solid #4a5568; padding-top: 15px;">
                    <p style="margin: 0; color: #95a5a6; font-size: 11px;">© ${new Date().getFullYear()} Ashwatthama Core Banking. All rights reserved.</p>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
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
      { password: 0 } // only return firstName
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
      userData: customer
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


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_BANKING,
        pass: process.env.EMAIL_PASS_BANKING,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER_BANKING,
        to: customer.email,
        subject: "Password Changed Successfully",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
              }
              .header {
                background-color: #C41E3A;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                padding: 30px 20px;
                background-color: #f9f9f9;
              }
              .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Changed Successfully</h1>
              </div>
              <div class="content">
                <p>Dear <strong>${customer.firstName || 'Valued Customer'}</strong>,</p>
                
                <p>Your password has been changed successfully on ${new Date().toLocaleString()}.</p>
                
                <p><strong>If you did not make this change, please contact our support team immediately.</strong></p>
                
                <p>For security reasons, we recommend that you:</p>
                <ul>
                  <li>Never share your password with anyone</li>
                  <li>Use a unique password for your account</li>
                  <li>Change your password regularly</li>
                </ul>
                
                <p>If you have any questions or concerns, please don't hesitate to reach out to us.</p>
                
                <p>Best regards,<br>Ashwatthama Core Banking Team</p>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>&copy; ${new Date().getFullYear()}Ashwatthama Core Banking. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Password change email sent successfully to:", customer.email);
    } catch (emailError) {
      console.error("Error sending password change email:", emailError);

    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const sendOtpForAccountVerification = async (req, res) => {
  try {
    const { identifierType, identifier } = req.body;

    if (!identifierType || !identifier) {
      return res.status(400).json({
        success: false,
        message: "Identifier type and value are required",
      });
    }

    // Step 1: Find user
    let user;
    if (identifierType === "customerId") {
      user = await SavingsAccount.findOne({ customerId: identifier });
    } else if (identifierType === "mobile") {
      user = await SavingsAccount.findOne({ contactNumber: identifier });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid identifier type. Use 'customerId' or 'mobile'.",
      });
    }

    // Step 2: Handle user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found for the provided details",
      });
    }

    // Step 3: Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Step 4: Store OTP with expiry (5 minutes)
    otpStore[user.email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // Step 5: Send OTP via email using reusable function
    await sendEmail(
      user.email,
      "Account Verification OTP",
      otpEmailTemplate(user.firstName, otp)
    );

    // Step 6: Respond
    res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${user.email}`,
      email: user.email,
    });
  } catch (err) {
    console.error("Error in sendOtpForAccountVerification:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while sending OTP",
      error: err.message,
    });
  }
};

const verifyOtpForAccountVerification = async (req, res) => {
  try {
    console.log(req.body);
    const { identifierType, identifier, otp } = req.body; // use body for POST

    if (!identifierType || !identifier || !otp) {
      return res.status(400).json({
        success: false,
        message: "Identifier type, identifier, and OTP are required",
      });
    }

    // 1️⃣ Find user based on identifier type
    let user;
    if (identifierType === "customerId") {
      user = await SavingsAccount.findOne({ customerId: identifier });
    } else if (identifierType === "mobile") {
      user = await SavingsAccount.findOne({ contactNumber: identifier });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid identifier type. Use 'customerId' or 'mobile'.",
      });
    }

    // 2️⃣ Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found for the provided details",
      });
    }

    // 3️⃣ Check if OTP exists for this user's email
    const storedOtp = otpStore[user.email];
    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "No OTP found or it has expired. Please request a new OTP.",
      });
    }

    // 4️⃣ Check if OTP is expired
    if (Date.now() > storedOtp.expiresAt) {
      delete otpStore[user.email]; // remove expired OTP
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    console.log(parseInt(otp), storedOtp.otp);

    // 5️⃣ Verify OTP
    if (parseInt(otp) !== storedOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // 6️⃣ OTP verified successfully → remove it from store
    delete otpStore[user.email];

    // ✅ Send success response
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      email: user.email,
      customerId: user.customerId,
    });
  } catch (err) {
    console.error("Error in verifyOtpForAccountVerification:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while verifying OTP",
      error: err.message,
    });
  }
};

const resetPasswordForAccountLogin = async (req, res) => {
  try {
    const { identifierType, identifier, newPassword } = req.body;
    console.log(identifierType, identifier, newPassword)

    // 1️⃣ Validate inputs
    if (!identifierType || !identifier || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Identifier type, identifier, and new password are required",
      });
    }

    // 2️⃣ Find the user
    let user;
    if (identifierType === "customerId") {
      user = await SavingsAccount.findOne({ customerId: identifier });
    } else if (identifierType === "mobile") {
      user = await SavingsAccount.findOne({ contactNumber: identifier });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid identifier type. Use 'customerId' or 'mobile'.",
      });
    }

    // 3️⃣ Handle user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found for the provided details",
      });
    }

    // 4️⃣ Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5️⃣ Update the password and mark as changed
    user.password = hashedPassword;
    user.isPasswordChanged = true;
    await user.save();

    // 6️⃣ Send success response
    res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
      customerId: user.customerId,
    });
  } catch (err) {
    console.error("Error in changing the password for login:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while resetting password",
      error: err.message,
    });
  }
};

const userSubmitContactUsForm = async (req, res) => {
  try {
    console.log("am in contact submit");

    const { formData } = req.body;

    // Save form data to DB
    const newContactData = await contactModel.create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: newContactData,
    });

  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      success: false,
      message: "Error submitting contact form",
      error: err.message,
    });
  }
};























module.exports = {
  resetPasswordForAccountLogin,
  verifyOtpForAccountVerification,
  sendOtpForAccountVerification,
  updateCustomerData,
  customerChangePassword,
  getCustomerFullData,
  getCustomerName,
  verifyUserLogin,
  createSavingsAccount,
  userSubmitContactUsForm
};
