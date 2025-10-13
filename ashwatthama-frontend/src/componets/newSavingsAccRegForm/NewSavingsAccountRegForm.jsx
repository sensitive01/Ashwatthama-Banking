import React, { useState, useEffect } from "react";
import { sendFormData } from "../../api/service/axiosService";
import SavingsForm from "./SavingsForm";
// import formImage from ".."

const SavingsAccountForm = () => {
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
    const amount = "1";
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

  // Basic UPI ID Format Validation
  const validateUpiFormat = (upiId) => {
    const upiRegex = /^[\w.-]+@[\w]+$/;

    if (!upiId.trim()) {
      return "UPI ID is required";
    }

    if (!upiRegex.test(upiId)) {
      return "Invalid UPI ID format. Example: 9876543210@paytm";
    }

    if (!upiId.includes("@")) {
      return "UPI ID must contain @ symbol";
    }

    const [username, provider] = upiId.split("@");

    if (username.length < 3) {
      return "Username must be at least 3 characters";
    }

    return "";
  };

  // Verify UPI ID and fetch account holder name
  const verifyUpiId = async (upiId) => {
    setIsVerifyingUpi(true);
    setUpiErrors("");
    setIsUpiVerified(false);
    setUpiAccountName("");

    try {
      // Call your backend API to verify UPI ID
      // const response = await fetch('/api/verify-upi', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ upiId: upiId }),
      // });

      // const data = await response.json();

      // if (response.ok && data.success) {
      //   setIsUpiVerified(true);
      //   setUpiAccountName(data.accountName);
      //   setUpiErrors("");
      // } else {
      //   setUpiErrors(data.message || "Unable to verify UPI ID. Please check and try again.");
      //   setIsUpiVerified(false);
      // }
      setIsUpiVerified(true);
      setUpiAccountName("Aswin");
      setUpiErrors("");
    } catch (error) {
      console.error("Error verifying UPI:", error);
      setUpiErrors("Error verifying UPI ID. Please try again.");
      setIsUpiVerified(false);
    } finally {
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

    // Ask for notification permission
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    try {
      setPaymentStatus("pending");

      // Prepare UPI link (Intent URL)
      const payeeUpiId = "9743474558@yescred";
      const payeeName = "SensitiveTechnologies";
      const amount = 1;
      const note = "Savings Account Registration Fee";

      // Encode note and name safely for URL
      const upiLink = `upi://pay?pa=${encodeURIComponent(
        payeeUpiId
      )}&pn=${encodeURIComponent(
        payeeName
      )}&am=${amount}&tn=${encodeURIComponent(note)}`;

      // Open UPI app
      window.location.href = upiLink;

      // Update status and UI
      setAlertMessage({
        type: "info",
        message: `Opening your UPI app... Please complete the payment of ₹${amount}.`,
      });

      // Optional: Start countdown or manual verification
      setPaymentStatus("waiting_for_user_action");
    } catch (error) {
      console.error("Error initiating UPI payment:", error);
      setPaymentStatus("failed");
      setUpiErrors(
        "Unable to open UPI app. Please try again or pay manually using the UPI ID."
      );
    }
  };

  // Poll backend for payment status
  const pollPaymentStatus = async (txnId) => {
    const maxAttempts = 60;
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const response = await fetch(
          `/api/check-payment-status?transactionId=${txnId}`
        );
        const data = await response.json();

        if (data.status === "SUCCESS") {
          clearInterval(interval);
          setPaymentStatus("success");
          setAlertMessage({
            type: "success",
            message: `Payment successful! Transaction ID: ${txnId}`,
          });

          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("Payment Successful! ✓", {
              body: `₹1000 received from ${upiAccountName}. TXN: ${txnId}`,
              icon: "https://cdn-icons-png.flaticon.com/512/5290/5290058.png",
            });
          }
        } else if (data.status === "FAILED") {
          clearInterval(interval);
          setPaymentStatus("failed");
          setAlertMessage({
            type: "error",
            message: "Payment failed. Please try again.",
          });
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          setPaymentStatus("timeout");
          setAlertMessage({
            type: "error",
            message: "Payment request timed out. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage({ type: "", message: "" });

    const requiredFields = [
      "firstName",
      "lastName",
      "aadharNumber",
      "contactNumber",
      "email",
      "idProofType",
      "idProofNumber",
      "idProofFile",
      "addressLine",
      "area",
      "city",
      "state",
      "pincode",
      "addressProofType",
      "addressProofNumber",
      "addressProofFile",
      "photoFile",
      "occupationType",
      "nomineeName",
      "nomineeContact",
      "nomineeRelation",
      "paymentProofFile",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    // if (missingFields.length > 0) {
    //   setAlertMessage({
    //     type: "error",
    //     message: "Please fill all required fields before submitting.",
    //   });
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    //   return;
    // }

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

      document.querySelectorAll('input[type="file"]').forEach((input) => {
        input.value = "";
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting form:", error);

      setAlertMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to submit the form. Please try again or contact support.",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    paddingLeft: "45px",
    width: "100%",
    height: "50px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    backgroundColor: "#fff",
  };

  const selectStyle = {
    width: "100%",
    height: "50px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "0 15px",
    fontSize: "14px",
    backgroundColor: "#fff",
  };

  const fileInputStyle = {
    width: "100%",
    height: "50px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#fff",
  };

  const iconStyle = {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#666",
  };

  return (
    <div>
      <section
        className="breadcrumb-area"
        style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content">
                <div className="title">
                  <h2
                    style={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Savings Account
                  </h2>
                </div>
                <div className="breadcrumb-menu">
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <li>
                      <a
                        href="index.php"
                        style={{ color: "#007bff", textDecoration: "none" }}
                      >
                        Home
                      </a>
                    </li>
                    <li style={{ color: "#666" }}>
                      / New Savings Account Registration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="apply-form-area"
        style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              {alertMessage.message && (
                <div
                  style={{
                    padding: "15px 20px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                    backgroundColor:
                      alertMessage.type === "success" ? "#d4edda" : "#f8d7da",
                    border: `1px solid ${
                      alertMessage.type === "success" ? "#c3e6cb" : "#f5c6cb"
                    }`,
                    color:
                      alertMessage.type === "success" ? "#155724" : "#721c24",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <i
                      className={`fas ${
                        alertMessage.type === "success"
                          ? "fa-check-circle"
                          : "fa-exclamation-circle"
                      }`}
                      style={{ fontSize: "20px" }}
                    ></i>
                    <span>{alertMessage.message}</span>
                  </div>
                  <button
                    onClick={() => setAlertMessage({ type: "", message: "" })}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                      color: "inherit",
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              <div
                className="apply-form-box clearfix"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "40px",
                  boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                }}
              >
                <div className="apply-form-box__content">
                  <div className="sec-title" style={{ marginBottom: "30px" }}>
                    <h2
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Savings Account Registration Form
                    </h2>
                    <div className="sub-title">
                      <p style={{ color: "#666", fontSize: "14px" }}>
                        Fill all the necessary details and get call from
                        experts.
                      </p>
                    </div>
                  </div>

                  <form id="apply-form" className="default-form2">
                    <SavingsForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      inputStyle={inputStyle}
                      iconStyle={iconStyle}
                      selectStyle={selectStyle}
                      handleFileChange={handleFileChange}
                      fileInputStyle={fileInputStyle}
                    />

                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          style={{
                            backgroundColor: "#fff3cd",
                            border: "2px solid #ffc107",
                            borderRadius: "5px",
                            padding: "15px",
                            marginBottom: "20px",
                            textAlign: "center",
                          }}
                        >
                          <strong
                            style={{ color: "#856404", fontSize: "18px" }}
                          >
                            Notice: Registration FEE: Rs.1000
                          </strong>
                          <div style={{ marginTop: "10px" }}>
                            <button
                              type="button"
                              onClick={generateUPIQRCode}
                              style={{
                                padding: "10px 30px",
                                backgroundColor: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "14px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <i className="fas fa-qrcode"></i>
                              Pay Registration Fee
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="input-box"
                          style={{ marginBottom: "20px" }}
                        >
                          <label
                            style={{
                              display: "block",
                              marginBottom: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            Payment Proof Upload (Screenshot after payment)
                          </label>
                          <input
                            type="file"
                            name="paymentProofFile"
                            onChange={(e) =>
                              handleFileChange(e, "paymentProofFile")
                            }
                            accept=".pdf,.jpg,.jpeg,.png"
                            required
                            style={fileInputStyle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div className="button-box">
                          <button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-one"
                            style={{
                              padding: "15px 40px",
                              backgroundColor: isSubmitting
                                ? "#6c757d"
                                : "#007bff",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "16px",
                              fontWeight: "bold",
                              cursor: isSubmitting ? "not-allowed" : "pointer",
                              width: "100%",
                              opacity: isSubmitting ? 0.7 : 1,
                            }}
                          >
                            <span className="txt">
                              {isSubmitting ? "Submitting..." : "Send Request"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
            overflowY: "auto",
          }}
          onClick={() => {
            setShowPaymentModal(false);
            setTimerActive(false);
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              padding: "30px",
              maxWidth: "550px",
              width: "100%",
              textAlign: "center",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setTimerActive(false);
              }}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#666",
                fontWeight: "bold",
              }}
            >
              ×
            </button>

            {/* Timer Display */}
            <div
              style={{
                backgroundColor: timeRemaining < 60 ? "#fff3cd" : "#e7f3ff",
                border: `2px solid ${
                  timeRemaining < 60 ? "#ffc107" : "#007bff"
                }`,
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <i
                className="fas fa-clock"
                style={{
                  fontSize: "20px",
                  color: timeRemaining < 60 ? "#856404" : "#0056b3",
                }}
              ></i>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: timeRemaining < 60 ? "#856404" : "#0056b3",
                }}
              >
                Time Remaining: {formatTime(timeRemaining)}
              </span>
            </div>

            <h3
              style={{ marginBottom: "20px", color: "#333", fontSize: "24px" }}
            >
              Pay Registration Fee - ₹1000
            </h3>

            {/* Payment Status Notification */}
            {paymentStatus && (
              <div
                style={{
                  padding: "15px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                  backgroundColor:
                    paymentStatus === "pending"
                      ? "#fff3cd"
                      : paymentStatus === "success"
                      ? "#d4edda"
                      : "#f8d7da",
                  border: `2px solid ${
                    paymentStatus === "pending"
                      ? "#ffc107"
                      : paymentStatus === "success"
                      ? "#28a745"
                      : "#dc3545"
                  }`,
                  animation: "slideIn 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {paymentStatus === "pending" && (
                    <>
                      <i
                        className="fas fa-spinner fa-spin"
                        style={{ fontSize: "20px", color: "#856404" }}
                      ></i>
                      <span style={{ fontWeight: "bold", color: "#856404" }}>
                        Waiting for payment approval...
                      </span>
                    </>
                  )}
                  {paymentStatus === "success" && (
                    <>
                      <i
                        className="fas fa-check-circle"
                        style={{ fontSize: "20px", color: "#155724" }}
                      ></i>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: "bold", color: "#155724" }}>
                          Payment Successful!
                        </div>
                        <div style={{ fontSize: "12px", color: "#155724" }}>
                          TXN ID: {transactionId}
                        </div>
                      </div>
                    </>
                  )}
                  {paymentStatus === "failed" && (
                    <>
                      <i
                        className="fas fa-times-circle"
                        style={{ fontSize: "20px", color: "#721c24" }}
                      ></i>
                      <span style={{ fontWeight: "bold", color: "#721c24" }}>
                        Payment Failed
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Payment Options Toggle */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "25px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setShowManualUpi(false)}
                style={{
                  padding: "12px 20px",
                  backgroundColor: !showManualUpi ? "#007bff" : "#f8f9fa",
                  color: !showManualUpi ? "#fff" : "#333",
                  border: "2px solid #007bff",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  flex: 1,
                  transition: "all 0.3s",
                }}
              >
                <i className="fas fa-qrcode"></i> Show QR Code
              </button>
              <button
                onClick={() => setShowManualUpi(true)}
                style={{
                  padding: "12px 20px",
                  backgroundColor: showManualUpi ? "#007bff" : "#f8f9fa",
                  color: showManualUpi ? "#fff" : "#333",
                  border: "2px solid #007bff",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  flex: 1,
                  transition: "all 0.3s",
                }}
              >
                <i className="fas fa-mobile-alt"></i> Enter UPI ID
              </button>
            </div>

            {/* QR Code Display */}
            {!showManualUpi && (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <img
                    src={qrCodeUrl}
                    alt="UPI QR Code"
                    style={{
                      maxWidth: "300px",
                      width: "100%",
                      height: "auto",
                      border: "3px solid #007bff",
                      borderRadius: "15px",
                      padding: "15px",
                      backgroundColor: "#fff",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px", color: "#666" }}>
                  <p
                    style={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <i
                      className="fas fa-mobile-alt"
                      style={{ marginRight: "8px", color: "#007bff" }}
                    ></i>
                    Scan QR code with any UPI app
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Google Pay, PhonePe, Paytm, BHIM, etc.
                  </p>
                </div>
              </>
            )}

            {/* Manual UPI Input with Verification */}
            {showManualUpi && (
              <>
                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    textAlign: "left",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    <i
                      className="fas fa-info-circle"
                      style={{ marginRight: "5px", color: "#007bff" }}
                    ></i>
                    Merchant Details:
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      marginBottom: "5px",
                      color: "#666",
                    }}
                  >
                    <strong>UPI ID:</strong> 9743474558@yescred
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      marginBottom: "5px",
                      color: "#666",
                    }}
                  >
                    <strong>Name:</strong> Finance
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      marginBottom: "0",
                      color: "#666",
                    }}
                  >
                    <strong>Amount:</strong> ₹1000
                  </p>
                </div>

                <div style={{ marginBottom: "20px", textAlign: "left" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Enter Your UPI ID:{" "}
                    <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      value={userUpiId}
                      onChange={handleUpiIdChange}
                      placeholder="yourname@bankname"
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: `2px solid ${
                          upiErrors
                            ? "#dc3545"
                            : isUpiVerified
                            ? "#28a745"
                            : "#ddd"
                        }`,
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => {
                        if (!upiErrors && !isUpiVerified)
                          e.target.style.borderColor = "#007bff";
                      }}
                      onBlur={(e) => {
                        if (!upiErrors && !isUpiVerified)
                          e.target.style.borderColor = "#ddd";
                      }}
                    />
                    <button
                      onClick={handleVerifyUpi}
                      disabled={isVerifyingUpi || !userUpiId || !!upiErrors}
                      style={{
                        padding: "12px 20px",
                        backgroundColor: isVerifyingUpi ? "#6c757d" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor:
                          isVerifyingUpi || !userUpiId || !!upiErrors
                            ? "not-allowed"
                            : "pointer",
                        opacity:
                          isVerifyingUpi || !userUpiId || !!upiErrors ? 0.6 : 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isVerifyingUpi ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>{" "}
                          Verifying...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check-circle"></i> Verify
                        </>
                      )}
                    </button>
                  </div>

                  {upiErrors && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#dc3545",
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <i className="fas fa-exclamation-circle"></i>
                      {upiErrors}
                    </p>
                  )}

                  {isUpiVerified && upiAccountName && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "15px",
                        backgroundColor: "#d4edda",
                        border: "2px solid #c3e6cb",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i
                        className="fas fa-user-check"
                        style={{ fontSize: "24px", color: "#155724" }}
                      ></i>
                      <div style={{ textAlign: "left" }}>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#155724",
                            margin: 0,
                            fontWeight: "600",
                          }}
                        >
                          Account Verified ✓
                        </p>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#155724",
                            margin: "4px 0 0 0",
                            fontWeight: "bold",
                          }}
                        >
                          {upiAccountName}
                        </p>
                      </div>
                    </div>
                  )}

                  {!upiErrors &&
                    userUpiId &&
                    !isUpiVerified &&
                    !isVerifyingUpi && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          marginTop: "8px",
                        }}
                      >
                        Click "Verify" to check UPI ID and see account holder
                        name
                      </p>
                    )}

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginTop: "8px",
                    }}
                  >
                    Example: 9876543210@paytm, username@oksbi, name@ybl
                  </p>
                </div>

                <button
                  onClick={sendPaymentRequest}
                  disabled={!isUpiVerified || paymentStatus === "pending"}
                  style={{
                    padding: "14px 30px",
                    backgroundColor:
                      !isUpiVerified || paymentStatus === "pending"
                        ? "#6c757d"
                        : "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor:
                      !isUpiVerified || paymentStatus === "pending"
                        ? "not-allowed"
                        : "pointer",
                    width: "100%",
                    marginBottom: "15px",
                    opacity:
                      !isUpiVerified || paymentStatus === "pending" ? 0.6 : 1,
                    transition: "all 0.3s",
                  }}
                >
                  {paymentStatus === "pending" ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Send Payment
                      Request (₹1000)
                    </>
                  )}
                </button>
              </>
            )}

            {/* Instructions */}
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
                <i
                  className="fas fa-info-circle"
                  style={{ marginRight: "5px", color: "#007bff" }}
                ></i>
                How to pay:
              </p>
              <ol style={{ paddingLeft: "20px", margin: 0, lineHeight: "1.8" }}>
                {!showManualUpi ? (
                  <>
                    <li>Open any UPI app on your phone</li>
                    <li>Scan the QR code shown above</li>
                    <li>Verify amount is ₹1000</li>
                    <li>Enter your UPI PIN and complete payment</li>
                    <li>Take screenshot of payment confirmation</li>
                    <li>Upload screenshot in the form above</li>
                  </>
                ) : (
                  <>
                    <li>Enter your UPI ID in the field above</li>
                    <li>Click "Verify" to confirm your account</li>
                    <li>Your name will be displayed after verification</li>
                    <li>Click "Send Payment Request" button</li>
                    <li>
                      You will receive a payment request notification in your
                      UPI app
                    </li>
                    <li>Open your UPI app and approve the ₹1000 payment</li>
                    <li>Take screenshot of payment confirmation</li>
                    <li>Upload screenshot in the form above</li>
                  </>
                )}
              </ol>
            </div>

            {/* UPI Apps */}
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  marginBottom: "10px",
                  fontWeight: "500",
                }}
              >
                Works with all UPI apps:
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "PhonePe",
                  "Google Pay",
                  "Paytm",
                  "BHIM",
                  "Amazon Pay",
                  "Cred",
                ].map((app) => (
                  <span
                    key={app}
                    style={{
                      backgroundColor: "#e9ecef",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#495057",
                    }}
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowPaymentModal(false);
                setTimerActive(false);
              }}
              style={{
                padding: "12px 30px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
            >
              <i className="fas fa-times" style={{ marginRight: "5px" }}></i>
              Close
            </button>
          </div>
        </div>
      )}

      <section
        className="partner-area"
        style={{ padding: "50px 0", backgroundColor: "#fff" }}
      >
        <div className="container">
          <div
            className="partner-area__sec-title"
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <h3 style={{ fontSize: "28px", fontWeight: "bold" }}>
              Corporate Partnership With
            </h3>
          </div>
          <div className="brand-content">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              <div className="single-partner-logo-box">
                <a href="#">
                  <img
                    src="assets/images/brand/brand-1-1.png"
                    alt="Partner 1"
                    style={{ maxWidth: "150px", height: "auto" }}
                  />
                </a>
              </div>
              <div className="single-partner-logo-box">
                <a href="#">
                  <img
                    src="assets/images/brand/brand-1-2.png"
                    alt="Partner 2"
                    style={{ maxWidth: "150px", height: "auto" }}
                  />
                </a>
              </div>
              <div className="single-partner-logo-box">
                <a href="#">
                  <img
                    src="assets/images/brand/brand-1-3.png"
                    alt="Partner 3"
                    style={{ maxWidth: "150px", height: "auto" }}
                  />
                </a>
              </div>
              <div className="single-partner-logo-box">
                <a href="#">
                  <img
                    src="assets/images/brand/brand-1-4.png"
                    alt="Partner 4"
                    style={{ maxWidth: "150px", height: "auto" }}
                  />
                </a>
              </div>
              <div className="single-partner-logo-box">
                <a href="#">
                  <img
                    src="assets/images/brand/brand-1-5.png"
                    alt="Partner 5"
                    style={{ maxWidth: "150px", height: "auto" }}
                  />
                </a>
              </div>
              <div className="single-partner-logo-box">
                <a href="#">
                  <img
                    src="assets/images/brand/brand-1-6.png"
                    alt="Partner 6"
                    style={{ maxWidth: "150px", height: "auto" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SavingsAccountForm;
