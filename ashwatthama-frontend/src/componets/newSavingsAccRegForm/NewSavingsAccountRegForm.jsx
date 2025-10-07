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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formDataToSend = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log("Form submitted - FormData entries:");
    // Log FormData contents for debugging
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await sendFormData(formDataToSend);
      console.log("Response:", response);
      // Handle success (show message, reset form, etc.)
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
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
                            Payment Proof Upload
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
                            className="btn-one"
                            style={{
                              padding: "15px 40px",
                              backgroundColor: "#007bff",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              fontSize: "16px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              width: "100%",
                            }}
                          >
                            <span className="txt">Send Request</span>
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
