// DashboardHome.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, User, Mail, Phone, CreditCard, MapPin, Briefcase, DollarSign } from "lucide-react";
import { getCustomerName } from "../../../api/service/axiosService";

const DashboardHome = () => {
  const customerId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getCustomerName(customerId);
      if (response.status === 200) {
        setUserName(response.data.firstName);
        setIsPasswordChanged(response.data.isPasswordChanged);
        setUserData(response.data.userData);

        // Show modal if password not changed
        if (response.data.isPasswordChanged === false) {
          setShowPasswordModal(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserName("User");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    navigate("/dashboard/change-password");
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
        <div
          style={{
            fontSize: "18px",
            color: "#6b7280",
            fontWeight: 500,
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "#fef3c7",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <AlertTriangle size={32} color="#f59e0b" />
            </div>

            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1f2937",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              Password Change Required
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "#6b7280",
                textAlign: "center",
                lineHeight: "1.6",
                marginBottom: "32px",
              }}
            >
              For your security, please change your password before continuing.
              This is required for first-time login or after a password reset.
            </p>

            <div
              style={{ display: "flex", gap: "12px", flexDirection: "column" }}
            >
              <button
                onClick={handleChangePassword}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background:
                    "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Change Password Now
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "#fff",
                  color: "#6b7280",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fff")
                }
              >
                Remind Me Later
              </button>
            </div>
          </div>
          <style>{`
            @keyframes slideIn {
              from {
                transform: scale(0.9);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}

      {/* Welcome Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
          borderRadius: "16px",
          padding: "60px 40px",
          marginBottom: "32px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
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
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "150px",
            height: "150px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "12px",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Welcome, {userName}!
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.9)",
              fontWeight: 400,
              maxWidth: "600px",
            }}
          >
            Welcome to your banking dashboard. Manage your accounts,
            transactions, and profile settings from here.
          </p>
        </div>
      </div>

      {/* User Information Section */}
      {userData && (
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#1f2937",
              marginBottom: "20px",
            }}
          >
            Account Overview
          </h2>

          {/* Account Balance Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>

              <span style={{ fontSize: "14px", opacity: 0.9 }}>Available Balance</span>
            </div>
            <div style={{ fontSize: "42px", fontWeight: 700 }}>
              ₹{userData.avlBalance?.toLocaleString() || "0"}
            </div>
            <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "8px" }}>
              Account Number: {userData.accountNumber}
            </div>
          </div>

          {/* Information Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Personal Information Card */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <User size={20} color="#C41E3A" />
                Personal Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Full Name
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {userData.firstName} {userData.lastName}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Customer ID
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {userData.customerId}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Aadhar Number
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {userData.aadharNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Mail size={20} color="#C41E3A" />
                Contact Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Email Address
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {userData.email}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Contact Number
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    +91 {userData.contactNumber}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Occupation
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {userData.occupationType}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information Card */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MapPin size={20} color="#C41E3A" />
                Address Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Address
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500, lineHeight: "1.5" }}>
                    {userData.addressLine}, {userData.area}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    City, State
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {userData.city}, {userData.state}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Pincode
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {userData.pincode}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CreditCard size={20} color="#C41E3A" />
                Account Status
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>Account Active</div>
                  <div
                    style={{
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: userData.isVisible ? "#d1fae5" : "#fee2e2",
                      color: userData.isVisible ? "#065f46" : "#991b1b",
                    }}
                  >
                    {userData.isVisible ? "Active" : "Inactive"}
                  </div>
                </div>


                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                    Account Created
                  </div>
                  <div style={{ fontSize: "15px", color: "#1f2937", fontWeight: 500 }}>
                    {new Date(userData.createdAt).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1f2937",
            marginBottom: "16px",
          }}
        >
          Quick Access
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#6b7280",
            lineHeight: "1.6",
          }}
        >
          Use the account menu in the top right corner to access your profile,
          change password, or get support.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;