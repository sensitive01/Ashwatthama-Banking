// DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Lock,
  LogOut,
  ChevronDown,
  Headphones,
  LayoutDashboard,
} from "lucide-react";
import { getCustomerName } from "../../../api/service/axiosService";
import logoImage from "../../../../public/assets/images/resources/amf - dark.png";

const TopBar = () => {
  const customerId = localStorage.getItem("userId");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getCustomerName(customerId);
      if (response.status === 200) {
        setUserName(response.data.firstName);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserName("User");
    }
  };

  const accountMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      path: "/dashboard/profile",
    },
    {
      id: "change-password",
      label: "Change Password",
      icon: Lock,
      path: "/dashboard/change-password",
    },
    {
      id: "support",
      label: "Support",
      icon: Headphones,
      path: "/dashboard/support",
    },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  const handleAccountMenuClick = (item) => {
    setIsAccountMenuOpen(false);
    if (item.id === "logout") {
      // Clear user data/tokens
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      navigate("/login");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Topbar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          zIndex: 1000,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          >
            <img
              src={logoImage}
              alt="Ashwatthama Core Banking"
              style={{
                height: "50px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <User size={20} />
            </div>
            <span
              style={{ fontSize: "15px", fontWeight: 600, color: "#1f2937" }}
            >
              {userName}
            </span>
            <ChevronDown size={16} />
          </button>

          {isAccountMenuOpen && (
            <>
              <div
                onClick={() => setIsAccountMenuOpen(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  minWidth: "220px",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  padding: "8px",
                  zIndex: 1001,
                }}
              >
                {accountMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleAccountMenuClick(item)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        border: "none",
                        background: isActive ? "#f9fafb" : "transparent",
                        cursor: "pointer",
                        borderRadius: "6px",
                        color:
                          item.id === "logout"
                            ? "#dc2626"
                            : isActive
                            ? "#C41E3A"
                            : "#374151",
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                        textAlign: "left",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          item.id === "logout" ? "#fee2e2" : "#f3f4f6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = isActive
                          ? "#f9fafb"
                          : "transparent")
                      }
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          marginTop: "70px",
          padding: "32px",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <Outlet />
      </main>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          header {
            padding: 0 16px !important;
          }
          
          header img {
            height: 40px !important;
          }
          
          main {
            padding: 20px !important;
          }
          
          header button span {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          header {
            padding: 0 12px !important;
          }
          
          header img {
            height: 35px !important;
          }
          
          main {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TopBar;
