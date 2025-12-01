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
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1f2937",
            marginBottom: "16px",
            textAlign: "left",
          }}
        >
          Change Password
        </h1>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: "1px solid #e5e7eb",
            gridColumn: "1",
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb',
            gridColumn: '1',
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
                    border: `2px solid ${errors.currentPassword ? "#dc2626" : "#e5e7eb"
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
                    border: `2px solid ${errors.newPassword ? "#dc2626" : "#e5e7eb"
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
                    border: `2px solid ${errors.confirmPassword ? "#dc2626" : "#e5e7eb"
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


            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px 24px",
                backgroundColor: isLoading ? "#9ca3af" : "#C41E3A",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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

        {/* Password Requirements Section */}
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb',
            position: 'sticky',
            top: '20px',
          }}
        >
          <h4
            style={{
              fontSize: '16px',
              color: '#1f2937',
              marginBottom: '16px',
              fontWeight: 600,
            }}
          >
            Password Requirements:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {passwordRequirements.map((req, index) => {
              const isValid = req.test(formData.newPassword);
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
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
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: '2px solid #d1d5db',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: '13px',
                      color: formData.newPassword
                        ? isValid
                          ? '#10b981'
                          : '#ef4444'
                        : '#6b7280',
                    }}
                  >
                    {req.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ChangePassword;
