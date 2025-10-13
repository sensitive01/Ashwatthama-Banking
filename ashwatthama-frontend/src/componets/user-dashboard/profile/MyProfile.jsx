// Profile.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Camera,
  Edit2,
  Save,
  X,
} from "lucide-react";
import {
  customerFullData,
  updateCustomerData,
} from "../../../api/service/axiosService";
import { toast } from "react-toastify";

const MyProfile = () => {
  const customerId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileUploads, setFileUploads] = useState({}); // Track file changes

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      const response = await customerFullData(customerId);
      if (response.status === 200) {
        setProfileData(response.data.data);
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the actual file object for FormData
    setFileUploads((prev) => ({
      ...prev,
      [fieldName]: file,
    }));

    // Update formData with file name for display
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file.name,
    }));
  };

  const handleSave = async () => {
    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        // Skip file fields and fields that haven't changed
        if (
          !key.includes("File") &&
          formData[key] !== null &&
          formData[key] !== undefined &&
          formData[key] !== ""
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append file uploads
      Object.keys(fileUploads).forEach((fieldName) => {
        if (fileUploads[fieldName]) {
          formDataToSend.append(fieldName, fileUploads[fieldName]);
        }
      });

      // Send FormData to API
      const response = await updateCustomerData(customerId, formDataToSend);

      if (response.status === 200) {
        setProfileData(formData);
        setIsEditing(false);
        setFileUploads({}); // Clear file uploads
        toast.success(response.data.message);

        // Optionally refresh data from server
        await fetchProfileData();
      } else {
        toast.success(response.response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.success(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setFileUploads({}); // Clear any file changes
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <div style={{ fontSize: "18px", color: "#6b7280" }}>
          Loading profile...
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "address", label: "Address" },
    { id: "documents", label: "Documents" },
    { id: "nominee", label: "Nominee" },
    { id: "account", label: "Account Details" },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1f2937" }}>
          My Profile
        </h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Save size={18} />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "#fff",
                color: "#374151",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div style={{ maxWidth: "1200px" }}>
        {/* Profile Header Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: profileData.photoFile
                    ? `url(${profileData.photoFile}) center/cover`
                    : "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {!profileData.photoFile && <User size={48} color="#fff" />}
              </div>
              {isEditing && (
                <label
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    width: "32px",
                    height: "32px",
                    background: "#C41E3A",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "3px solid #fff",
                  }}
                >
                  <Camera size={16} color="#fff" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "photoFile")}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#1f2937",
                  marginBottom: "4px",
                }}
              >
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6b7280",
                  marginBottom: "8px",
                }}
              >
                {profileData.email}
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div
                  style={{
                    padding: "6px 12px",
                    background: profileData.isProfileActive
                      ? "#d1fae5"
                      : "#fee2e2",
                    color: profileData.isProfileActive ? "#065f46" : "#991b1b",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {profileData.isProfileActive ? "Active" : "Inactive"}
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    background: "#dbeafe",
                    color: "#1e40af",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Customer ID: {profileData.customerId}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                borderRadius: "10px",
                color: "#fff",
                textAlign: "center",
                minWidth: "180px",
              }}
            >
              <div
                style={{ fontSize: "13px", opacity: 0.9, marginBottom: "4px" }}
              >
                Available Balance
              </div>
              <div style={{ fontSize: "28px", fontWeight: 700 }}>
                ₹
                {profileData.avlBalance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            overflowX: "auto",
            padding: "4px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 24px",
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)"
                    : "#fff",
                color: activeTab === tab.id ? "#fff" : "#6b7280",
                border: activeTab === tab.id ? "none" : "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = "#f9fafb";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = "#fff";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e5e7eb",
          }}
        >
          {activeTab === "personal" && (
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "24px",
                }}
              >
                Personal Information
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                <Field
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Email"
                  name="email"
                  value={formData.email}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  type="email"
                />
                <Field
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Aadhar Number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  isEditing={false}
                />
                <Field
                  label="Occupation Type"
                  name="occupationType"
                  value={formData.occupationType}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {activeTab === "address" && (
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "24px",
                }}
              >
                Address Information
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "20px",
                }}
              >
                <Field
                  label="Address Line"
                  name="addressLine"
                  value={formData.addressLine}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <Field
                    label="Area"
                    name="area"
                    value={formData.area}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <Field
                    label="City"
                    name="city"
                    value={formData.city}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <Field
                    label="State"
                    name="state"
                    value={formData.state}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <Field
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                </div>
                <Field
                  label="Landmark"
                  name="landmark"
                  value={formData.landmark}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "24px",
                }}
              >
                Documents
              </h3>

              {/* ID Proof */}
              <div style={{ marginBottom: "32px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "16px",
                  }}
                >
                  ID Proof
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <Field
                    label="ID Proof Type"
                    name="idProofType"
                    value={formData.idProofType}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <Field
                    label="ID Proof Number"
                    name="idProofNumber"
                    value={formData.idProofNumber}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                </div>
                <FileField
                  label="ID Proof Document"
                  fieldName="idProofFile"
                  value={formData.idProofFile}
                  isEditing={isEditing}
                  onUpload={handleFileUpload}
                  hasNewUpload={!!fileUploads.idProofFile}
                />
              </div>

              {/* Address Proof */}
              <div style={{ marginBottom: "32px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "16px",
                  }}
                >
                  Address Proof
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <Field
                    label="Address Proof Type"
                    name="addressProofType"
                    value={formData.addressProofType}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <Field
                    label="Address Proof Number"
                    name="addressProofNumber"
                    value={formData.addressProofNumber}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                </div>
                <FileField
                  label="Address Proof Document"
                  fieldName="addressProofFile"
                  value={formData.addressProofFile}
                  isEditing={isEditing}
                  onUpload={handleFileUpload}
                  hasNewUpload={!!fileUploads.addressProofFile}
                />
              </div>

              {/* Payment Proof */}
              <div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "16px",
                  }}
                >
                  Payment Proof
                </h4>
                <FileField
                  label="Payment Proof Document"
                  fieldName="paymentProofFile"
                  value={formData.paymentProofFile}
                  isEditing={isEditing}
                  onUpload={handleFileUpload}
                  hasNewUpload={!!fileUploads.paymentProofFile}
                />
              </div>
            </div>
          )}

          {activeTab === "nominee" && (
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "24px",
                }}
              >
                Nominee Information
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                <Field
                  label="Nominee Name"
                  name="nomineeName"
                  value={formData.nomineeName}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Nominee Contact"
                  name="nomineeContact"
                  value={formData.nomineeContact}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <Field
                  label="Nominee Relation"
                  name="nomineeRelation"
                  value={formData.nomineeRelation}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "24px",
                }}
              >
                Account Details
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                <Field
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  isEditing={false}
                />
                <Field
                  label="Customer ID"
                  name="customerId"
                  value={formData.customerId}
                  isEditing={false}
                />
                <Field
                  label="Available Balance"
                  name="avlBalance"
                  value={`₹${formData.avlBalance.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}`}
                  isEditing={false}
                />
                <Field
                  label="Account Status"
                  name="isProfileActive"
                  value={formData.isProfileActive ? "Active" : "Inactive"}
                  isEditing={false}
                />
                <Field
                  label="Password Changed"
                  name="isPasswordChanged"
                  value={formData.isPasswordChanged ? "Yes" : "No"}
                  isEditing={false}
                />
                <Field
                  label="Member Since"
                  name="createdAt"
                  value={new Date(formData.createdAt).toLocaleDateString(
                    "en-IN",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                  isEditing={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, name, value, isEditing, onChange, type = "text" }) => (
  <div>
    <label
      style={{
        display: "block",
        fontSize: "13px",
        fontWeight: 600,
        color: "#6b7280",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "12px",
          border: "2px solid #e5e7eb",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#C41E3A")}
        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
      />
    ) : (
      <div
        style={{
          padding: "12px",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#1f2937",
          fontWeight: 500,
        }}
      >
        {value || "Not provided"}
      </div>
    )}
  </div>
);

const FileField = ({
  label,
  fieldName,
  value,
  isEditing,
  onUpload,
  hasNewUpload,
}) => (
  <div style={{ marginTop: "16px" }}>
    <label
      style={{
        display: "block",
        fontSize: "13px",
        fontWeight: 600,
        color: "#6b7280",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      {label}
    </label>
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            color: "#374151",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
        >
          <FileText size={16} />
          {hasNewUpload ? `New: ${value}` : "View Document"}
        </a>
      )}
      {isEditing && (
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: "#C41E3A",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {hasNewUpload ? "Change File" : "Upload File"}
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => onUpload(e, fieldName)}
            style={{ display: "none" }}
          />
        </label>
      )}
    </div>
  </div>
);

export default MyProfile;
