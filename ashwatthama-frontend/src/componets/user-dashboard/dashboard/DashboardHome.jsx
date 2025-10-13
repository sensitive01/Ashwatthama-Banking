// DashboardHome.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { getCustomerName } from "../../../api/service/axiosService";

const DashboardHome = () => {
  const customerId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
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

      {/* Quick Actions or Additional Content */}
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
