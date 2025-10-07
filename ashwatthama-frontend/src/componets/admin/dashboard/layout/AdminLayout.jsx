import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Menu,
  X,
  LogOut,
  Bell,
  Settings,
  User,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  Users,
  Plus,
} from "lucide-react";

// Admin Layout Component (Sidebar + Top Bar)
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminEmail = "admin@amf.com";

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/admin-dashboard",
    },
    {
      id: "users",
      label: "All Users",
      icon: <Users size={20} />,
      path: "/admin/user-table",
    },
    {
      id: "new-users",
      label: "New Users",
      icon: <UserPlus size={20} />,
      path: "/new-users",
    },
  ];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40 animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-purple-900 bg-opacity-40 backdrop-blur-xl border-r-2 border-purple-500 border-opacity-40 transition-all duration-300 flex flex-col relative z-10`}
      >
        {/* Logo Section */}
        <div className="p-3 border-b border-purple-500 border-opacity-40">
          <div className="flex items-center justify-between">
            {isSidebarOpen ? (
              <div className="flex items-center space-x-3">
                <img
                  src="../../../../../public/assets/images/resources/amf - light.png"
                  alt="AMF Logo"
                  className="w-20 h-10 rounded-lg object-cover"
                />
               
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/40x40/6366f1/ffffff?text=A"
                alt="AMF Logo"
                className="w-10 h-10 rounded-lg object-cover mx-auto"
              />
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center ${
                  isSidebarOpen ? "justify-start px-4" : "justify-center"
                } py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-purple-200 hover:bg-purple-800 hover:bg-opacity-50"
                }`}
              >
                <span className={isActive ? "text-white" : ""}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Toggle Button */}
        <div className="p-4 border-t border-purple-500 border-opacity-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center py-3 rounded-xl text-purple-200 hover:bg-purple-800 hover:bg-opacity-50 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-0">
        {/* Top Bar */}
        <div className="h-20 bg-purple-900 bg-opacity-40 backdrop-blur-xl border-b-2 border-purple-500 border-opacity-40 flex items-center justify-between px-8 relative z-50">
          {/* Left Side - Page Title */}
          <div className="text-white text-2xl font-bold">
            {menuItems.find((item) => item.path === location.pathname)?.label ||
              "Dashboard"}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl bg-purple-800 bg-opacity-50 text-purple-200 hover:text-white hover:bg-opacity-70 transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-xl bg-purple-800 bg-opacity-50 text-purple-200 hover:text-white hover:bg-opacity-70 transition-all">
              <Settings size={20} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-purple-800 bg-opacity-50 hover:bg-opacity-70 transition-all"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-white text-sm font-medium">Admin</p>
                  <p className="text-purple-200 text-xs">{adminEmail}</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-purple-200 transition-transform ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-purple-900 bg-opacity-95 backdrop-blur-xl rounded-xl border border-purple-500 border-opacity-40 shadow-xl overflow-hidden z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-purple-200 hover:bg-purple-800 hover:text-white transition-all"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
