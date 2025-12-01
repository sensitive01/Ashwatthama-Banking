import React, { useState, useEffect } from "react";
import { sendFormData } from "../../api/service/axiosService";
import "./SavingsAccountForm.css";

const SavingsAccountForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    aadharNumber: "",
    contactNumber: "",
    email: "",
    idProofType: "",
    idProofNumber: "",
    idProofFile: null,
    addressLine: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressProofType: "",
    addressProofNumber: "",
    addressProofFile: null,
    photoFile: null,
    occupationType: "",
    nomineeName: "",
    nomineeContact: "",
    nomineeRelation: "",
    paymentProofFile: null,
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment modal states
  const [userUpiId, setUserUpiId] = useState("");
  const [showManualUpi, setShowManualUpi] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [timerActive, setTimerActive] = useState(false);
  const [upiErrors, setUpiErrors] = useState("");

  // UPI Verification states
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [upiAccountName, setUpiAccountName] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Payment status
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  const steps = [
    { id: 1, name: "Personal Info", icon: "fas fa-user" },
    { id: 2, name: "Identity", icon: "fas fa-id-card" },
    { id: 3, name: "Address", icon: "fas fa-map-marker-alt" },
    { id: 4, name: "Nominee", icon: "fas fa-user-friends" },
    { id: 5, name: "Payment", icon: "fas fa-credit-card" },
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerActive(false);
      setAlertMessage({
        type: "error",
        message: "Payment time expired. Please generate a new payment link.",
      });
      setShowPaymentModal(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const generateUPIQRCode = () => {
    const upiId = "9743474558@yescred";
    const payeeName = "Finance";
    const amount = "1000";
    const transactionNote = "Savings Account Registration Fee";

    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      upiUrl
    )}`;

    setQrCodeUrl(qrUrl);
    setShowPaymentModal(true);
    setShowManualUpi(false);
    setUserUpiId("");
    setUpiErrors("");
    setPaymentStatus(null);
    setIsUpiVerified(false);
    setUpiAccountName("");
    setTimeRemaining(600);
    setTimerActive(true);
  };

  const validateUpiFormat = (upiId) => {
    const upiRegex = /^[\w.-]+@[\w]+$/;
    if (!upiId.trim()) return "UPI ID is required";
    if (!upiRegex.test(upiId))
      return "Invalid UPI ID format. Example: 9876543210@paytm";
    if (!upiId.includes("@")) return "UPI ID must contain @ symbol";
    const [username] = upiId.split("@");
    if (username.length < 3) return "Username must be at least 3 characters";
    return "";
  };

  const verifyUpiId = async (upiId) => {
    setIsVerifyingUpi(true);
    setUpiErrors("");
    setIsUpiVerified(false);
    setUpiAccountName("");

    try {
      // Simulated verification - replace with actual API call
      setTimeout(() => {
        setIsUpiVerified(true);
        setUpiAccountName("Aswin");
        setUpiErrors("");
        setIsVerifyingUpi(false);
      }, 1000);
    } catch (error) {
      console.error("Error verifying UPI:", error);
      setUpiErrors("Error verifying UPI ID. Please try again.");
      setIsUpiVerified(false);
      setIsVerifyingUpi(false);
    }
  };

  const handleUpiIdChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s/g, "");
    setUserUpiId(value);
    setIsUpiVerified(false);
    setUpiAccountName("");
    if (value) {
      const error = validateUpiFormat(value);
      setUpiErrors(error);
    } else {
      setUpiErrors("");
    }
  };

  const handleVerifyUpi = () => {
    const error = validateUpiFormat(userUpiId);
    if (error) {
      setUpiErrors(error);
      return;
    }
    verifyUpiId(userUpiId);
  };

  const sendPaymentRequest = async () => {
    if (!isUpiVerified) {
      setUpiErrors("Please verify UPI ID first");
      return;
    }

    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    try {
      setPaymentStatus("pending");
      const payeeUpiId = "9743474558@yescred";
      const payeeName = "SensitiveTechnologies";
      const amount = 1000;
      const note = "Savings Account Registration Fee";

      const upiLink = `upi://pay?pa=${encodeURIComponent(
        payeeUpiId
      )}&pn=${encodeURIComponent(
        payeeName
      )}&am=${amount}&tn=${encodeURIComponent(note)}`;

      window.location.href = upiLink;

      setAlertMessage({
        type: "info",
        message: `Opening your UPI app... Please complete the payment of ₹${amount}.`,
      });

      setPaymentStatus("waiting_for_user_action");
    } catch (error) {
      console.error("Error initiating UPI payment:", error);
      setPaymentStatus("failed");
      setUpiErrors(
        "Unable to open UPI app. Please try again or pay manually using the UPI ID."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage({ type: "", message: "" });
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await sendFormData(formDataToSend);
      console.log("Response:", response);

      setAlertMessage({
        type: "success",
        message:
          "Your savings account registration has been submitted successfully! Our team will contact you shortly.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        aadharNumber: "",
        contactNumber: "",
        email: "",
        idProofType: "",
        idProofNumber: "",
        idProofFile: null,
        addressLine: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        addressProofType: "",
        addressProofNumber: "",
        addressProofFile: null,
        photoFile: null,
        occupationType: "",
        nomineeName: "",
        nomineeContact: "",
        nomineeRelation: "",
        paymentProofFile: null,
      });

      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to submit the form. Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3 className="step-title">Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name <span className="required">*</span></label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Last Name <span className="required">*</span></label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email <span className="required">*</span></label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number <span className="required">*</span></label>
                <div className="input-with-icon">
                  <i className="fas fa-phone"></i>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Aadhar Number <span className="required">*</span></label>
              <div className="input-with-icon">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your Aadhar number"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3 className="step-title">Identity Verification</h3>
            <div className="form-group">
              <label>ID Proof Type <span className="required">*</span></label>
              <select
                name="idProofType"
                value={formData.idProofType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select ID Proof Type</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
              </select>
            </div>

            <div className="form-group">
              <label>ID Proof Number <span className="required">*</span></label>
              <div className="input-with-icon">
                <i className="fas fa-file-alt"></i>
                <input
                  type="text"
                  name="idProofNumber"
                  value={formData.idProofNumber}
                  onChange={handleInputChange}
                  placeholder="Enter ID proof number"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Upload ID Proof <span className="required">*</span></label>
              <input
                type="file"
                name="idProofFile"
                onChange={(e) => handleFileChange(e, "idProofFile")}
                accept=".pdf,.jpg,.jpeg,.png"
                className="file-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Photo <span className="required">*</span></label>
              <input
                type="file"
                name="photoFile"
                onChange={(e) => handleFileChange(e, "photoFile")}
                accept="image/*"
                className="file-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Occupation Type <span className="required">*</span></label>
              <select
                name="occupationType"
                value={formData.occupationType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Occupation</option>
                <option value="Salaried">Salaried</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Business">Business</option>
                <option value="Professional">Professional</option>
                <option value="Retired">Retired</option>
                <option value="Student">Student</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3 className="step-title">Address Details</h3>
            <div className="form-group">
              <label>Address Line <span className="required">*</span></label>
              <div className="input-with-icon">
                <i className="fas fa-map-marker-alt"></i>
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Area <span className="required">*</span></label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Area"
                  required
                />
              </div>
              <div className="form-group">
                <label>Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="Landmark (Optional)"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>State <span className="required">*</span></label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              <div className="form-group">
                <label>City <span className="required">*</span></label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Pincode <span className="required">*</span></label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                required
              />
            </div>

            <div className="form-group">
              <label>Address Proof Type <span className="required">*</span></label>
              <select
                name="addressProofType"
                value={formData.addressProofType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Address Proof</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Water Bill">Water Bill</option>
                <option value="Bank Statement">Bank Statement</option>
                <option value="Rental Agreement">Rental Agreement</option>
              </select>
            </div>

            <div className="form-group">
              <label>Address Proof Number <span className="required">*</span></label>
              <input
                type="text"
                name="addressProofNumber"
                value={formData.addressProofNumber}
                onChange={handleInputChange}
                placeholder="Enter proof number"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Address Proof <span className="required">*</span></label>
              <input
                type="file"
                name="addressProofFile"
                onChange={(e) => handleFileChange(e, "addressProofFile")}
                accept=".pdf,.jpg,.jpeg,.png"
                className="file-input"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h3 className="step-title">Nominee Details</h3>
            <div className="form-group">
              <label>Nominee Name <span className="required">*</span></label>
              <div className="input-with-icon">
                <i className="fas fa-user-friends"></i>
                <input
                  type="text"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleInputChange}
                  placeholder="Enter nominee name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nominee Contact <span className="required">*</span></label>
              <div className="input-with-icon">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  name="nomineeContact"
                  value={formData.nomineeContact}
                  onChange={handleInputChange}
                  placeholder="Enter nominee contact number"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nominee Relation <span className="required">*</span></label>
              <div className="input-with-icon">
                <i className="fas fa-heart"></i>
                <input
                  type="text"
                  name="nomineeRelation"
                  value={formData.nomineeRelation}
                  onChange={handleInputChange}
                  placeholder="Enter relation with nominee"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h3 className="step-title">Payment</h3>
            <div className="payment-notice">
              <i className="fas fa-info-circle"></i>
              <div>
                <strong>Registration Fee: ₹1000</strong>
                <p>Please complete the payment to proceed with registration</p>
              </div>
            </div>

            <button
              type="button"
              onClick={generateUPIQRCode}
              className="pay-button"
            >
              <i className="fas fa-qrcode"></i>
              Pay Registration Fee
            </button>

            <div className="form-group" style={{ marginTop: "20px" }}>
              <label>Upload Payment Proof <span className="required">*</span></label>
              <input
                type="file"
                name="paymentProofFile"
                onChange={(e) => handleFileChange(e, "paymentProofFile")}
                accept=".pdf,.jpg,.jpeg,.png"
                className="file-input"
                required
              />
              <small>Upload screenshot of successful payment</small>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="savings-account-container">
      {/* Left Side - Image */}
      <div className="left-section">
        <div className="left-section-wrapper">
          <div className="left-content">
            <h1>Open Your Savings Account</h1>
            <p>Join thousands of satisfied customers who trust us with their savings</p>
            <div className="features">
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Quick & Easy Process</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Secure & Reliable</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="right-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Send Your Request & Get Call Back</h2>
            <p>Fill all the necessary details and get call from experts.</p>
          </div>

          {alertMessage.message && (
            <div className={`alert alert-${alertMessage.type}`}>
              <i
                className={`fas ${alertMessage.type === "success"
                    ? "fa-check-circle"
                    : "fa-exclamation-circle"
                  }`}
              ></i>
              <span>{alertMessage.message}</span>
              <button
                onClick={() => setAlertMessage({ type: "", message: "" })}
                className="alert-close"
              >
                ×
              </button>
            </div>
          )}

          {/* Progress Steps */}
          <div className="progress-steps">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`step ${currentStep === step.id ? "active" : ""} ${currentStep > step.id ? "completed" : ""
                  }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="step-icon">
                  <i className={step.icon}></i>
                </div>
                <span className="step-name">{step.name}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-arrow-left"></i> Previous
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next <i className="fas fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Submit Request
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => {
                setShowPaymentModal(false);
                setTimerActive(false);
              }}
            >
              ×
            </button>

            {/* Timer */}
            <div className={`timer-display ${timeRemaining < 60 ? "warning" : ""}`}>
              <i className="fas fa-clock"></i>
              <span>Time Remaining: {formatTime(timeRemaining)}</span>
            </div>

            <h3>Pay Registration Fee - ₹1000</h3>

            {/* Payment Status */}
            {paymentStatus && (
              <div className={`payment-status ${paymentStatus}`}>
                {paymentStatus === "pending" && (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Waiting for payment approval...</span>
                  </>
                )}
                {paymentStatus === "success" && (
                  <>
                    <i className="fas fa-check-circle"></i>
                    <span>Payment Successful!</span>
                  </>
                )}
                {paymentStatus === "failed" && (
                  <>
                    <i className="fas fa-times-circle"></i>
                    <span>Payment Failed</span>
                  </>
                )}
              </div>
            )}

            {/* Payment Options Toggle */}
            <div className="payment-toggle">
              <button
                onClick={() => setShowManualUpi(false)}
                className={!showManualUpi ? "active" : ""}
              >
                <i className="fas fa-qrcode"></i> QR Code
              </button>
              <button
                onClick={() => setShowManualUpi(true)}
                className={showManualUpi ? "active" : ""}
              >
                <i className="fas fa-mobile-alt"></i> UPI ID
              </button>
            </div>

            {/* QR Code Display */}
            {!showManualUpi && (
              <div className="qr-section">
                <img src={qrCodeUrl} alt="UPI QR Code" className="qr-code" />
                <p className="qr-instruction">
                  <i className="fas fa-mobile-alt"></i>
                  Scan with any UPI app (Google Pay, PhonePe, Paytm, etc.)
                </p>
              </div>
            )}

            {/* Manual UPI Input */}
            {showManualUpi && (
              <div className="upi-section">
                <div className="merchant-info">
                  <p><strong>UPI ID:</strong> 9743474558@yescred</p>
                  <p><strong>Name:</strong> Finance</p>
                  <p><strong>Amount:</strong> ₹1000</p>
                </div>

                <div className="form-group">
                  <label>Enter Your UPI ID <span className="required">*</span></label>
                  <div className="upi-input-group">
                    <input
                      type="text"
                      value={userUpiId}
                      onChange={handleUpiIdChange}
                      placeholder="yourname@bankname"
                      className={upiErrors ? "error" : isUpiVerified ? "success" : ""}
                    />
                    <button
                      onClick={handleVerifyUpi}
                      disabled={isVerifyingUpi || !userUpiId || !!upiErrors}
                      className="verify-btn"
                    >
                      {isVerifyingUpi ? (
                        <><i className="fas fa-spinner fa-spin"></i> Verifying...</>
                      ) : (
                        <><i className="fas fa-check-circle"></i> Verify</>
                      )}
                    </button>
                  </div>
                  {upiErrors && (
                    <p className="error-message">
                      <i className="fas fa-exclamation-circle"></i>
                      {upiErrors}
                    </p>
                  )}
                  {isUpiVerified && upiAccountName && (
                    <div className="verified-message">
                      <i className="fas fa-user-check"></i>
                      <div>
                        <p>Account Verified ✓</p>
                        <strong>{upiAccountName}</strong>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={sendPaymentRequest}
                  disabled={!isUpiVerified || paymentStatus === "pending"}
                  className="send-payment-btn"
                >
                  {paymentStatus === "pending" ? (
                    <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Payment Request (₹1000)</>
                  )}
                </button>
              </div>
            )}

            {/* Instructions */}
            <div className="payment-instructions">
              <h4><i className="fas fa-info-circle"></i> How to pay:</h4>
              <ol>
                {!showManualUpi ? (
                  <>
                    <li>Open any UPI app on your phone</li>
                    <li>Scan the QR code shown above</li>
                    <li>Verify amount is ₹1000</li>
                    <li>Enter your UPI PIN and complete payment</li>
                    <li>Take screenshot and upload in the form</li>
                  </>
                ) : (
                  <>
                    <li>Enter your UPI ID and click Verify</li>
                    <li>Click "Send Payment Request"</li>
                    <li>Approve payment in your UPI app</li>
                    <li>Take screenshot and upload in the form</li>
                  </>
                )}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsAccountForm;