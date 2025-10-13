import React from "react";

const SavingsForm = ({formData,handleInputChange,inputStyle,iconStyle,selectStyle,handleFileChange,fileInputStyle}) => {
  return (
    <div>
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
          <div className="select-box clearfix" style={{ marginBottom: "20px" }}>
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
              <option value="Driving License">Driving License</option>
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
          <div className="input-box" style={{ marginBottom: "20px" }}>
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
          <div className="select-box clearfix" style={{ marginBottom: "20px" }}>
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
          <div className="select-box clearfix" style={{ marginBottom: "20px" }}>
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
          <div className="select-box clearfix" style={{ marginBottom: "20px" }}>
            <select
              name="addressProofType"
              value={formData.addressProofType}
              onChange={handleInputChange}
              required
              style={selectStyle}
            >
              <option value="">Address Proof Type</option>
              <option value="Electricity Bill">Electricity Bill</option>
              <option value="Water Bill">Water Bill</option>
              <option value="Bank Statement">Bank Statement</option>
              <option value="Rental Agreement">Rental Agreement</option>
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
          <div className="input-box" style={{ marginBottom: "20px" }}>
            <input
              type="file"
              name="addressProofFile"
              onChange={(e) => handleFileChange(e, "addressProofFile")}
              accept=".pdf,.jpg,.jpeg,.png"
              required
              style={fileInputStyle}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="input-box" style={{ marginBottom: "20px" }}>
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
          <div className="select-box clearfix" style={{ marginBottom: "20px" }}>
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
    </div>
  );
};

export default SavingsForm;
