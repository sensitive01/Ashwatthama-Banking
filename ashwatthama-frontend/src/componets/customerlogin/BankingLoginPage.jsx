import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";
import logoImage from "../../../public/assets/images/resources/amf.png";
import { userLoginVerification } from "../../api/service/axiosService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BankingLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("userId");
  const [formData, setFormData] = useState({
    userIdOrAccount: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userIdOrAccount.trim()) {
      newErrors.userIdOrAccount =
        loginMethod === "userId"
          ? "User ID is required"
          : "Account Number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Replace with your actual API endpoint
        const response = await userLoginVerification(
          loginMethod,
          formData.userIdOrAccount,
          formData.password
        );
        if (response.status === 200) {
          localStorage.setItem("userId", response.data.userId);
          toast.success(response?.data?.message);
          setTimeout(() => {
            navigate("/user/dashboard");
          }, 1500);
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

          {/* Logo */}
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

          {/* Welcome Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                fontWeight: "bold",
                lineHeight: "1.3",
              }}
            >
              Welcome to
              <br />
              Your Banking Portal
            </h1>

            <p
              style={{
                fontSize: "15px",
                opacity: 0.95,
                lineHeight: "1.6",
              }}
            >
              Access your account securely and manage your finances with ease.
            </p>
          </div>

          {/* Quick Features */}
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
              Quick Features:
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
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>✓</span>{" "}
                View Account Balance
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
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>✓</span>{" "}
                Transfer Funds
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
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>✓</span>{" "}
                Pay Bills Online
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>✓</span>{" "}
                Download Statements
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Login Form */}
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
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              User Login
            </h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Sign in to access your account
            </p>
          </div>

          {/* Login Method Toggle */}
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
                setLoginMethod("userId");
                setFormData({ userIdOrAccount: "", password: "" });
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
                  loginMethod === "userId" ? "#C41E3A" : "transparent",
                color: loginMethod === "userId" ? "#fff" : "#666",
                transition: "all 0.3s",
              }}
            >
              User ID
            </button>
            <button
              onClick={() => {
                setLoginMethod("accountNumber");
                setFormData({ userIdOrAccount: "", password: "" });
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
                  loginMethod === "accountNumber" ? "#C41E3A" : "transparent",
                color: loginMethod === "accountNumber" ? "#fff" : "#666",
                transition: "all 0.3s",
              }}
            >
              Account Number
            </button>
          </div>

          {/* User ID / Account Number Input */}
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
              {loginMethod === "userId" ? "User ID" : "Account Number"}
              <span style={{ color: "#C41E3A" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
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
              <input
                type="text"
                name="userIdOrAccount"
                value={formData.userIdOrAccount}
                onChange={handleInputChange}
                placeholder={
                  loginMethod === "userId"
                    ? "Enter your User ID"
                    : "Enter your Account Number"
                }
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  border: `2px solid ${
                    errors.userIdOrAccount ? "#dc3545" : "#e0e0e0"
                  }`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  if (!errors.userIdOrAccount) {
                    e.target.style.borderColor = "#C41E3A";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.userIdOrAccount) {
                    e.target.style.borderColor = "#e0e0e0";
                  }
                }}
              />
            </div>
            {errors.userIdOrAccount && (
              <span
                style={{
                  display: "block",
                  marginTop: "4px",
                  color: "#dc3545",
                  fontSize: "12px",
                }}
              >
                {errors.userIdOrAccount}
              </span>
            )}
          </div>

          {/* Password Input */}
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
              Password
              <span style={{ color: "#C41E3A" }}>*</span>
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 40px",
                  border: `2px solid ${
                    errors.password ? "#dc3545" : "#e0e0e0"
                  }`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = "#C41E3A";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = "#e0e0e0";
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#999" />
                ) : (
                  <Eye size={18} color="#999" />
                )}
              </button>
            </div>
            {errors.password && (
              <span
                style={{
                  display: "block",
                  marginTop: "4px",
                  color: "#dc3545",
                  fontSize: "12px",
                }}
              >
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#666",
                cursor: "pointer",
              }}
            >
              <input type="checkbox" style={{ cursor: "pointer" }} />
              Remember me
            </label>
            <a
              href="#"
              style={{
                color: "#C41E3A",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleSubmit}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.target.style.backgroundColor = "#8B1538";
            }}
            onMouseLeave={(e) => {
              if (!isLoading) e.target.style.backgroundColor = "#C41E3A";
            }}
          >
            <LogIn size={18} />
            {isLoading ? "Logging in..." : "Login to Account"}
          </button>

          {/* Register Link */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "13px",
              color: "#666",
            }}
          >
            Don't have an account?{" "}
            <a
              href="/new-savings-account-reg-form"
              style={{
                color: "#C41E3A",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register Now
            </a>
          </div>

          {/* Security Notice */}
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              borderLeft: "4px solid #C41E3A",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#666",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px" }}>🔒</span>
              <span>
                Your connection is secure. We never store your password in plain
                text.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingLoginPage;
