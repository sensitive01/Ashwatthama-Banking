import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  RefreshCw,
  User,
} from "lucide-react";
import logoImage from "../../../public/assets/images/resources/amf.png";
import {
  candidateForgotPassowrd,
  resetLoginPassword,
  verifyChangePasswordOtp,
} from "../../api/service/axiosService";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [identifierType, setIdentifierType] = useState("customerId");
  const [formData, setFormData] = useState({
    identifier: "",
    captcha: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(captcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && step === 2) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier =
        identifierType === "customerId"
          ? "Customer ID is required"
          : "Mobile Number is required";
    } else if (
      identifierType === "mobile" &&
      !/^\d{10}$/.test(formData.identifier)
    ) {
      newErrors.identifier = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.captcha.trim()) {
      newErrors.captcha = "Captcha is required";
    } else if (formData.captcha !== generatedCaptcha) {
      newErrors.captcha = "Captcha does not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "Please enter a valid 6-digit OTP";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (validateStep1()) {
      setIsLoading(true);
      try {
        const response = await candidateForgotPassowrd(
          identifierType,
          formData.identifier
        );
        console.log(response);

        if (response.status === 200) {
          toast.success(response.data.message);
          setMaskedEmail(response.data.email);
          setStep(2);
          setTimer(120);
          setCanResend(false);
        } else {
          toast.error(response.response.data.message);
        }
      } catch (error) {
        console.error("API call error:", error);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await candidateForgotPassowrd(
        identifierType,
        formData.identifier
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimer(120);
        setCanResend(false);
        setFormData((prev) => ({ ...prev, otp: "" }));
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.error("API call error:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (validateStep2()) {
      setIsLoading(true);
      try {
        const response = await verifyChangePasswordOtp(
          identifierType,
          formData.identifier,
          formData.otp
        );

        if (response.status === 200) {
          setStep(3);
          toast.success(response.data.message);
        } else {
          toast.error(response.response.data.message);
        }
      } catch (error) {
        console.error("API call error:", error);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (validateStep3()) {
      setIsLoading(true);
      try {
        const response = await resetLoginPassword(
          identifierType,
          formData.identifier,
          formData.newPassword
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.href = "/customer-login-page";
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("API call error:", error);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      window.location.href = "/customer-login-page";
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "0",
          height: "auto",
          maxHeight: "calc(100vh - 40px)",
        }}
      >
        {/* Left Side - Info Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
            borderRadius: "15px 0 0 15px",
            padding: "50px 40px",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={logoImage}
              alt="Bank Logo"
              style={{
                width: "80%",
                maxWidth: "280px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                fontWeight: "bold",
                lineHeight: "1.3",
              }}
            >
              Reset Your Password
            </h1>
            <p style={{ fontSize: "15px", opacity: 0.95, lineHeight: "1.6" }}>
              Follow the simple steps to recover your account access securely.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              padding: "25px",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <h3
              style={{
                fontSize: "17px",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              Security Steps:
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>1.</span>{" "}
                Verify your identity
              </li>
              <li
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>2.</span>{" "}
                Enter OTP from email
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>3.</span>{" "}
                Create new password
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Form */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "0 15px 15px 0",
            padding: "40px 35px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Back Button */}
          <button
            onClick={handleBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
              background: "none",
              border: "none",
              color: "#666",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              {step === 1 && "Enter your details to receive an OTP"}
              {step === 2 && `OTP sent to ${maskedEmail}`}
              {step === 3 && "Create a new secure password"}
            </p>
          </div>

          {/* Step Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "25px",
            }}
          >
            {[1, 2, 3].map((s, idx) => (
              <React.Fragment key={s}>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    fontSize: "14px",
                    backgroundColor: step >= s ? "#C41E3A" : "#e0e0e0",
                    color: step >= s ? "#fff" : "#999",
                  }}
                >
                  {s}
                </div>
                {idx < 2 && (
                  <div
                    style={{
                      width: "50px",
                      height: "2px",
                      backgroundColor: step > s ? "#C41E3A" : "#e0e0e0",
                    }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "20px",
                  backgroundColor: "#f5f5f5",
                  padding: "5px",
                  borderRadius: "8px",
                }}
              >
                <button
                  onClick={() => {
                    setIdentifierType("customerId");
                    setFormData({ ...formData, identifier: "" });
                    setErrors({});
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    backgroundColor:
                      identifierType === "customerId"
                        ? "#C41E3A"
                        : "transparent",
                    color: identifierType === "customerId" ? "#fff" : "#666",
                    transition: "all 0.3s",
                  }}
                >
                  Customer ID
                </button>
                <button
                  onClick={() => {
                    setIdentifierType("mobile");
                    setFormData({ ...formData, identifier: "" });
                    setErrors({});
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    backgroundColor:
                      identifierType === "mobile" ? "#C41E3A" : "transparent",
                    color: identifierType === "mobile" ? "#fff" : "#666",
                    transition: "all 0.3s",
                  }}
                >
                  Mobile Number
                </button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  {identifierType === "customerId"
                    ? "Customer ID"
                    : "Mobile Number"}
                  <span style={{ color: "#C41E3A" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  {identifierType === "customerId" ? (
                    <User
                      size={18}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#999",
                        pointerEvents: "none",
                      }}
                    />
                  ) : (
                    <Phone
                      size={18}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#999",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleInputChange}
                    placeholder={
                      identifierType === "customerId"
                        ? "Enter Customer ID"
                        : "Enter 10-digit Mobile Number"
                    }
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      border: `2px solid ${
                        errors.identifier ? "#dc3545" : "#e0e0e0"
                      }`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      if (!errors.identifier)
                        e.target.style.borderColor = "#C41E3A";
                    }}
                    onBlur={(e) => {
                      if (!errors.identifier)
                        e.target.style.borderColor = "#e0e0e0";
                    }}
                  />
                </div>
                {errors.identifier && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: "#dc3545",
                      fontSize: "12px",
                    }}
                  >
                    {errors.identifier}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Enter Captcha<span style={{ color: "#C41E3A" }}>*</span>
                </label>
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#f5f5f5",
                      border: "2px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#333",
                        letterSpacing: "6px",
                        fontFamily: "monospace",
                        userSelect: "none",
                      }}
                    >
                      {generatedCaptcha}
                    </span>
                  </div>
                  <button
                    onClick={generateCaptcha}
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#f5f5f5",
                      border: "2px solid #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Refresh Captcha"
                  >
                    <RefreshCw size={20} color="#666" />
                  </button>
                </div>
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleInputChange}
                  placeholder="Enter the captcha above"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: `2px solid ${
                      errors.captcha ? "#dc3545" : "#e0e0e0"
                    }`,
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    if (!errors.captcha) e.target.style.borderColor = "#C41E3A";
                  }}
                  onBlur={(e) => {
                    if (!errors.captcha) e.target.style.borderColor = "#e0e0e0";
                  }}
                />
                {errors.captcha && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: "#dc3545",
                      fontSize: "12px",
                    }}
                  >
                    {errors.captcha}
                  </span>
                )}
              </div>

              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: isLoading ? "#999" : "#C41E3A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = "#8B1538";
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = "#C41E3A";
                }}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Enter 6-Digit OTP<span style={{ color: "#C41E3A" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <ShieldCheck
                    size={18}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#999",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="Enter OTP"
                    maxLength="6"
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      border: `2px solid ${errors.otp ? "#dc3545" : "#e0e0e0"}`,
                      borderRadius: "8px",
                      fontSize: "20px",
                      outline: "none",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box",
                      textAlign: "center",
                      letterSpacing: "8px",
                    }}
                    onFocus={(e) => {
                      if (!errors.otp) e.target.style.borderColor = "#C41E3A";
                    }}
                    onBlur={(e) => {
                      if (!errors.otp) e.target.style.borderColor = "#e0e0e0";
                    }}
                  />
                </div>
                {errors.otp && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: "#dc3545",
                      fontSize: "12px",
                    }}
                  >
                    {errors.otp}
                  </span>
                )}
              </div>

              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {timer > 0 ? (
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    Resend OTP in{" "}
                    <span style={{ fontWeight: "600", color: "#C41E3A" }}>
                      {formatTime(timer)}
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={isLoading || !canResend}
                    style={{
                      fontSize: "13px",
                      color: "#C41E3A",
                      background: "none",
                      border: "none",
                      cursor:
                        isLoading || !canResend ? "not-allowed" : "pointer",
                      fontWeight: "600",
                      textDecoration: "underline",
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: isLoading ? "#999" : "#C41E3A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = "#8B1538";
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = "#C41E3A";
                }}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  New Password<span style={{ color: "#C41E3A" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={18}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#999",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      border: `2px solid ${
                        errors.newPassword ? "#dc3545" : "#e0e0e0"
                      }`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      if (!errors.newPassword)
                        e.target.style.borderColor = "#C41E3A";
                    }}
                    onBlur={(e) => {
                      if (!errors.newPassword)
                        e.target.style.borderColor = "#e0e0e0";
                    }}
                  />
                </div>
                {errors.newPassword && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: "#dc3545",
                      fontSize: "12px",
                    }}
                  >
                    {errors.newPassword}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Confirm Password<span style={{ color: "#C41E3A" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={18}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#999",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      border: `2px solid ${
                        errors.confirmPassword ? "#dc3545" : "#e0e0e0"
                      }`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      if (!errors.confirmPassword)
                        e.target.style.borderColor = "#C41E3A";
                    }}
                    onBlur={(e) => {
                      if (!errors.confirmPassword)
                        e.target.style.borderColor = "#e0e0e0";
                    }}
                  />
                </div>
                {errors.confirmPassword && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: "#dc3545",
                      fontSize: "12px",
                    }}
                  >
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: isLoading ? "#999" : "#C41E3A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = "#8B1538";
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = "#C41E3A";
                }}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </div>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "13px",
              color: "#666",
            }}
          >
            Remember your password?{" "}
            <a
              href="/login"
              style={{
                color: "#C41E3A",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
