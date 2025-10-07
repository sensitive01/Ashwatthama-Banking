import React, { useState } from "react";
import { sendFormData } from "../../api/service/axiosService";

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
    // UPI Payment Details
    const upiId = "9743474558@yescred"; // Your PhonePe UPI ID
    const payeeName = "Finance"; // Your business name
    const amount = "1";
    const transactionNote = "Savings Account Registration Fee";

    // Generate UPI URL
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    // Generate QR Code using API.QRServer (more reliable)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      upiUrl
    )}`;

    setQrCodeUrl(qrUrl);
    setShowPaymentModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage({ type: "", message: "" });

    // Validate all required fields
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

    if (missingFields.length > 0) {
      setAlertMessage({
        type: "error",
        message: "Please fill all required fields before submitting.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Create FormData object
    const formDataToSend = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log("Form submitted - FormData entries:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await sendFormData(formDataToSend);
      console.log("Response:", response);

      setAlertMessage({
        type: "success",
        message:
          "Your savings account registration has been submitted successfully! Our team will contact you shortly.",
      });

      // Reset form after successful submission
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

      // Clear file inputs
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
                      {" "}
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
              {/* Alert Messages */}
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
                    <div className="row">
                      <div className="col-xl-6">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-user" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-user" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-6">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleInputChange}
                            placeholder="Aadhar Number"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-id-card" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            placeholder="Contact Number"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-phone-alt" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email ID"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-envelope-open" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-4">
                        <div
                          className="select-box clearfix"
                          style={{ marginBottom: "20px" }}
                        >
                          <select
                            name="idProofType"
                            value={formData.idProofType}
                            onChange={handleInputChange}
                            required
                            style={selectStyle}
                          >
                            <option value="">ID Proof Type</option>
                            <option value="Aadhar Card">Aadhar Card</option>
                            <option value="PAN Card">PAN Card</option>
                            <option value="Voter ID">Voter ID</option>
                            <option value="Driving License">
                              Driving License
                            </option>
                            <option value="Passport">Passport</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="idProofNumber"
                            value={formData.idProofNumber}
                            onChange={handleInputChange}
                            placeholder="ID Proof Number"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-file-alt" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ marginBottom: "20px" }}
                        >
                          <input
                            type="file"
                            name="idProofFile"
                            onChange={(e) => handleFileChange(e, "idProofFile")}
                            accept=".pdf,.jpg,.jpeg,.png"
                            required
                            style={fileInputStyle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="addressLine"
                            value={formData.addressLine}
                            onChange={handleInputChange}
                            placeholder="Address Line"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-map-marker-alt" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-6">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="Area"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-map" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div
                          className="select-box clearfix"
                          style={{ marginBottom: "20px" }}
                        >
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            style={selectStyle}
                          >
                            <option value="">City</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Kolkata">Kolkata</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-4">
                        <div
                          className="select-box clearfix"
                          style={{ marginBottom: "20px" }}
                        >
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            style={selectStyle}
                          >
                            <option value="">State</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="West Bengal">West Bengal</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="Pincode"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-map-pin" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleInputChange}
                            placeholder="Landmark"
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-location-arrow" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-4">
                        <div
                          className="select-box clearfix"
                          style={{ marginBottom: "20px" }}
                        >
                          <select
                            name="addressProofType"
                            value={formData.addressProofType}
                            onChange={handleInputChange}
                            required
                            style={selectStyle}
                          >
                            <option value="">Address Proof Type</option>
                            <option value="Electricity Bill">
                              Electricity Bill
                            </option>
                            <option value="Water Bill">Water Bill</option>
                            <option value="Bank Statement">
                              Bank Statement
                            </option>
                            <option value="Rental Agreement">
                              Rental Agreement
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="addressProofNumber"
                            value={formData.addressProofNumber}
                            onChange={handleInputChange}
                            placeholder="Address Proof Number"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-file-alt" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ marginBottom: "20px" }}
                        >
                          <input
                            type="file"
                            name="addressProofFile"
                            onChange={(e) =>
                              handleFileChange(e, "addressProofFile")
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
                            Photo Capture
                          </label>
                          <input
                            type="file"
                            name="photoFile"
                            onChange={(e) => handleFileChange(e, "photoFile")}
                            accept="image/*"
                            required
                            style={fileInputStyle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="select-box clearfix"
                          style={{ marginBottom: "20px" }}
                        >
                          <select
                            name="occupationType"
                            value={formData.occupationType}
                            onChange={handleInputChange}
                            required
                            style={selectStyle}
                          >
                            <option value="">Occupation Type</option>
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
                    </div>

                    <div className="row">
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="nomineeName"
                            value={formData.nomineeName}
                            onChange={handleInputChange}
                            placeholder="Nominee Name"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-user-friends" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="nomineeContact"
                            value={formData.nomineeContact}
                            onChange={handleInputChange}
                            placeholder="Nominee Contact Number"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-phone" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div
                          className="input-box"
                          style={{ position: "relative", marginBottom: "20px" }}
                        >
                          <input
                            type="text"
                            name="nomineeRelation"
                            value={formData.nomineeRelation}
                            onChange={handleInputChange}
                            placeholder="Nominee Relation"
                            required
                            style={inputStyle}
                          />
                          <div className="icon" style={iconStyle}>
                            <i className="fas fa-heart" />
                          </div>
                        </div>
                      </div>
                    </div>

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
                              Generate UPI QR Code
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

      {/* UPI Payment Modal */}
      {showPaymentModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "30px",
              maxWidth: "500px",
              width: "90%",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPaymentModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              ×
            </button>

            <h3 style={{ marginBottom: "20px", color: "#333" }}>
              Pay Registration Fee - ₹1000
            </h3>

            <div style={{ marginBottom: "20px" }}>
              <img
                src={qrCodeUrl}
                alt="UPI QR Code"
                style={{
                  maxWidth: "300px",
                  width: "100%",
                  height: "auto",
                  border: "2px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px", color: "#666" }}>
              <p style={{ marginBottom: "10px" }}>
                <strong>Scan QR code with any UPI app</strong>
              </p>
              <p style={{ fontSize: "14px" }}>
                (Google Pay, PhonePe, Paytm, BHIM, etc.)
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "5px",
                marginBottom: "20px",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              <p style={{ marginBottom: "8px" }}>
                <strong>Instructions:</strong>
              </p>
              <ol style={{ paddingLeft: "20px", margin: 0 }}>
                <li>Open any UPI payment app</li>
                <li>Scan the QR code above</li>
                <li>Verify amount is ₹1000</li>
                <li>Complete the payment</li>
                <li>Take a screenshot of payment confirmation</li>
                <li>Upload the screenshot in the form above</li>
              </ol>
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              style={{
                padding: "12px 30px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
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
    </div>
  );
};

export default SavingsAccountForm;
