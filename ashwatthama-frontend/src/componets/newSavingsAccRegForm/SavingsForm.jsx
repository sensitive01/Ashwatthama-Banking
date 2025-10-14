import React from "react";

const SavingsForm = ({
  formData,
  handleInputChange,
  inputStyle,
  iconStyle,
  selectStyle,
  handleFileChange,
  fileInputStyle,
}) => {
  const sectionStyle = {
    marginBottom: "30px",
    padding: "25px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e8e8e8",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  };

  const sectionTitleStyle = {
    fontSize: "19px",
    fontWeight: "700",
    color: "#1e3a5f",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "3px solid #007bff",
    display: "flex",
    alignItems: "center"
  };

  const enhancedInputStyle = {
    width: "100%",
    height: "48px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    padding: "10px 10px 10px 45px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
    backgroundColor: "#fff"
  };

  const enhancedIconStyle = {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6c757d",
    fontSize: "16px",
    pointerEvents: "none"
  };

  const enhancedSelectStyle = {
    width: "100%",
    height: "48px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s"
  };

  const enhancedFileInputStyle = {
    width: "100%",
    height: "48px",
    border: "2px dashed #007bff",
    borderRadius: "6px",
    padding: "10px",
    fontSize: "13px",
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
    boxSizing: "border-box",
    transition: "background-color 0.3s"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#495057",
    fontSize: "14px"
  };

  return (
    <div>
      {/* Personal Information */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <i className="fas fa-user-circle" style={{ marginRight: "10px", color: "#007bff" }}></i>
          Personal Information
        </h3>
        <div className="row">
          <div className="col-xl-6">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-user" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-user" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                placeholder="Aadhar Number"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-id-card" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Contact Number"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-phone-alt" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div style={{ position: "relative", marginBottom: "0" }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email ID"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-envelope-open" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Identity Verification */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <i className="fas fa-id-badge" style={{ marginRight: "10px", color: "#007bff" }}></i>
          Identity Verification
        </h3>
        <div className="row">
          <div className="col-xl-4">
            <div style={{ marginBottom: "20px" }}>
              <select
                name="idProofType"
                value={formData.idProofType}
                onChange={handleInputChange}
                required
                style={enhancedSelectStyle}
              >
                <option value="">Select ID Proof Type</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="idProofNumber"
                value={formData.idProofNumber}
                onChange={handleInputChange}
                placeholder="ID Proof Number"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-file-alt" />
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ marginBottom: "0" }}>
              <input
                type="file"
                name="idProofFile"
                onChange={(e) => handleFileChange(e, "idProofFile")}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                style={enhancedFileInputStyle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <i className="fas fa-map-marked-alt" style={{ marginRight: "10px", color: "#007bff" }}></i>
          Address Details
        </h3>
        <div className="row">
          <div className="col-xl-12">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleInputChange}
                placeholder="Address Line"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-map-marker-alt" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Area"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-map" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div style={{ marginBottom: "20px" }}>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                style={enhancedSelectStyle}
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
        </div>

        <div className="row">
          <div className="col-xl-4">
            <div style={{ marginBottom: "20px" }}>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                style={enhancedSelectStyle}
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-map-pin" />
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="Landmark (Optional)"
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-location-arrow" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4">
            <div style={{ marginBottom: "20px" }}>
              <select
                name="addressProofType"
                value={formData.addressProofType}
                onChange={handleInputChange}
                required
                style={enhancedSelectStyle}
              >
                <option value="">Select Address Proof Type</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Water Bill">Water Bill</option>
                <option value="Bank Statement">Bank Statement</option>
                <option value="Rental Agreement">Rental Agreement</option>
              </select>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="addressProofNumber"
                value={formData.addressProofNumber}
                onChange={handleInputChange}
                placeholder="Address Proof Number"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-file-alt" />
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ marginBottom: "0" }}>
              <input
                type="file"
                name="addressProofFile"
                onChange={(e) => handleFileChange(e, "addressProofFile")}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                style={enhancedFileInputStyle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Photo & Occupation */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <i className="fas fa-camera" style={{ marginRight: "10px", color: "#007bff" }}></i>
          Photo & Occupation
        </h3>
        <div className="row">
          <div className="col-xl-6">
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                Photo Capture <span style={{ color: "#dc3545" }}>*</span>
              </label>
              <input
                type="file"
                name="photoFile"
                onChange={(e) => handleFileChange(e, "photoFile")}
                accept="image/*"
                required
                style={enhancedFileInputStyle}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div style={{ marginBottom: "0" }}>
              <label style={labelStyle}>
                Occupation Type <span style={{ color: "#dc3545" }}>*</span>
              </label>
              <select
                name="occupationType"
                value={formData.occupationType}
                onChange={handleInputChange}
                required
                style={enhancedSelectStyle}
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
        </div>
      </div>

      {/* Nominee Details */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <i className="fas fa-user-friends" style={{ marginRight: "10px", color: "#007bff" }}></i>
          Nominee Details
        </h3>
        <div className="row">
          <div className="col-xl-4">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleInputChange}
                placeholder="Nominee Name"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-user-friends" />
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type="text"
                name="nomineeContact"
                value={formData.nomineeContact}
                onChange={handleInputChange}
                placeholder="Nominee Contact Number"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-phone" />
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div style={{ position: "relative", marginBottom: "0" }}>
              <input
                type="text"
                name="nomineeRelation"
                value={formData.nomineeRelation}
                onChange={handleInputChange}
                placeholder="Nominee Relation"
                required
                style={enhancedInputStyle}
              />
              <div style={enhancedIconStyle}>
                <i className="fas fa-heart" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsForm;