// ChangePassword.jsx
import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, X } from "lucide-react";
import { customerChangePassword } from "../../../api/service/axiosService";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const customerId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters long", test: (pwd) => pwd.length >= 8 },
    { label: "Contains uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "Contains lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "Contains number", test: (pwd) => /[0-9]/.test(pwd) },
    {
      label: "Contains special character",
      test: (pwd) => /[!@#$%^&*]/.test(pwd),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      // Check all password requirements
      const failedRequirements = passwordRequirements.filter(
        (req) => !req.test(formData.newPassword)
      );
      if (failedRequirements.length > 0) {
        newErrors.newPassword = "Password does not meet all requirements";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await customerChangePassword(
        customerId,
        formData.currentPassword,
        formData.newPassword
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message);
      }

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#1f2937",
          marginBottom: "24px",
        }}
      >
        Change Password
      </h1>

      <div style={{ maxWidth: "600px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div>
            {/* Current Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Current Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 12px",
                    border: `2px solid ${
                      errors.currentPassword ? "#dc2626" : "#e5e7eb"
                    }`,
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    !errors.currentPassword &&
                    (e.target.style.borderColor = "#C41E3A")
                  }
                  onBlur={(e) =>
                    !errors.currentPassword &&
                    (e.target.style.borderColor = "#e5e7eb")
                  }
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPasswords.current ? (
                    <EyeOff size={18} color="#999" />
                  ) : (
                    <Eye size={18} color="#999" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <span
                  style={{
                    display: "block",
                    marginTop: "6px",
                    color: "#dc2626",
                    fontSize: "12px",
                  }}
                >
                  {errors.currentPassword}
                </span>
              )}
            </div>

            {/* New Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                New Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 12px",
                    border: `2px solid ${
                      errors.newPassword ? "#dc2626" : "#e5e7eb"
                    }`,
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    !errors.newPassword &&
                    (e.target.style.borderColor = "#C41E3A")
                  }
                  onBlur={(e) =>
                    !errors.newPassword &&
                    (e.target.style.borderColor = "#e5e7eb")
                  }
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPasswords.new ? (
                    <EyeOff size={18} color="#999" />
                  ) : (
                    <Eye size={18} color="#999" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <span
                  style={{
                    display: "block",
                    marginTop: "6px",
                    color: "#dc2626",
                    fontSize: "12px",
                  }}
                >
                  {errors.newPassword}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Confirm New Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 12px",
                    border: `2px solid ${
                      errors.confirmPassword ? "#dc2626" : "#e5e7eb"
                    }`,
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    !errors.confirmPassword &&
                    (e.target.style.borderColor = "#C41E3A")
                  }
                  onBlur={(e) =>
                    !errors.confirmPassword &&
                    (e.target.style.borderColor = "#e5e7eb")
                  }
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={18} color="#999" />
                  ) : (
                    <Eye size={18} color="#999" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span
                  style={{
                    display: "block",
                    marginTop: "6px",
                    color: "#dc2626",
                    fontSize: "12px",
                  }}
                >
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Password Requirements */}
            <div
              style={{
                background: "#f9fafb",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  marginBottom: "12px",
                }}
              >
                Password Requirements:
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {passwordRequirements.map((req, index) => {
                  const isValid = req.test(formData.newPassword);
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {formData.newPassword ? (
                        isValid ? (
                          <CheckCircle size={16} color="#10b981" />
                        ) : (
                          <X size={16} color="#ef4444" />
                        )
                      ) : (
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            border: "2px solid #d1d5db",
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: "13px",
                          color: formData.newPassword
                            ? isValid
                              ? "#10b981"
                              : "#ef4444"
                            : "#6b7280",
                        }}
                      >
                        {req.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                background: isLoading
                  ? "#9ca3af"
                  : "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                !isLoading && (e.currentTarget.style.opacity = "0.9")
              }
              onMouseLeave={(e) =>
                !isLoading && (e.currentTarget.style.opacity = "1")
              }
            >
              {isLoading ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
