import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import * as THREE from "three";
import logoImage from "../../../../public/assets/images/resources/amf - dark.png";
import { verifyAdminLogin } from "../../../api/service/adminServices";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const containerWidth = 600;
    const containerHeight = 600;

    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.innerHTML = ""; // Clear any existing content
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 25);

    // Currency symbols
    const currencies = ["€", "$", "£", "¥", "₿", "₹"];
    const textObjects = [];

    currencies.forEach((symbol, index) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 256;
      canvas.height = 256;

      context.font = "Bold 120px Arial";
      context.fillStyle = "#c4b5fd";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(symbol, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(material);

      const angle = (index / currencies.length) * Math.PI * 2;
      const radius = 12;
      sprite.position.x = Math.cos(angle) * radius;
      sprite.position.y = Math.sin(angle) * radius;
      sprite.position.z = 0;
      sprite.scale.set(3, 3, 1);

      scene.add(sprite);
      textObjects.push({ sprite, angle, radius });
    });

    // Bank building in center
    const buildingGeometry = new THREE.BoxGeometry(4, 5, 3);
    const buildingMaterial = new THREE.MeshBasicMaterial({
      color: 0xc4b5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    scene.add(building);

    // Rings
    const ringGeometry = new THREE.TorusGeometry(14, 0.15, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2 = ring1.clone();
    ring2.scale.set(0.6, 0.6, 0.6);
    scene.add(ring2);

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate building
      building.rotation.y += 0.005;

      // Rotate rings
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.005;

      // Orbit currencies
      textObjects.forEach((obj, index) => {
        obj.angle += 0.01;
        obj.sprite.position.x = Math.cos(obj.angle) * obj.radius;
        obj.sprite.position.y = Math.sin(obj.angle) * obj.radius;
        obj.sprite.position.z = Math.sin(obj.angle * 2) * 2;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyAdminLogin(email, password);

      if (response.status === 200) {
        localStorage.setItem("adminToken", response.data.token);

        setSuccess(
          response.data.message ||
            "Login successful! Redirecting to dashboard..."
        );

        setEmail("");
        setPassword("");

        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate("/admin/admin-dashboard");
        }, 1500);
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Handle different error scenarios
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to server. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60 animate-pulse"
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

      <div className="flex items-center justify-center w-full max-w-7xl relative z-10">
        {/* Left side - Login Form */}
        <div className="w-full max-w-md mr-auto">
          <div className="bg-purple-900 bg-opacity-40 backdrop-blur-xl rounded-3xl px-10 py-12 shadow-2xl border-2 border-purple-500 border-opacity-40">
            {/* Bank Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <img
                  src={logoImage}
                  alt="Bank Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            {/* Login fields */}
            <div className="space-y-6">
              {/* Admin Email field */}
              <div className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Admin Email"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-purple-800 bg-opacity-50 border-none rounded-2xl text-white placeholder-purple-200 text-center focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Admin Password field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Password"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-purple-800 bg-opacity-50 border-none rounded-2xl text-white placeholder-purple-200 text-center focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-lg pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-500 bg-opacity-30 border border-red-400 text-red-200 px-4 py-3 rounded-2xl text-sm text-center animate-pulse">
                  {error}
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="bg-green-500 bg-opacity-30 border border-green-400 text-green-200 px-4 py-3 rounded-2xl text-sm text-center animate-pulse">
                  {success}
                </div>
              )}

              {/* Login button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-4 ${
                  isLoading
                    ? "bg-blue-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
                } text-white font-bold text-lg rounded-full shadow-2xl border-4 border-blue-400 transform transition-all duration-200 hover:shadow-blue-500/50 mt-6`}
                style={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              {/* Forget password link */}
              <div className="text-center pt-3">
                <button
                  onClick={() =>
                    alert("Password recovery would be implemented here")
                  }
                  disabled={isLoading}
                  className="text-purple-200 hover:text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Forget Pin / Password?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Three.js Animation */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div
            ref={mountRef}
            className="w-[600px] h-[600px] flex items-center justify-center"
          ></div>
        </div>
      </div>
    </div>
  );
}
