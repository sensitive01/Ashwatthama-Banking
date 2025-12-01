// Support.jsx
import React, { useState } from "react";
import { Phone, Mail, Headphones } from "lucide-react";
import { userSubmitContactUsForm } from "../../../api/service/axiosService";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      // Replace with your actual API endpoint
      const response = await userSubmitContactUsForm(formData)
      if (response.status === 200) {
        console.log(response.data.message)
      }






      // Reset form
      setFormData({
        subject: "",
        message: ""
      });

    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1f2937", marginBottom: "24px" }}>
        Support
      </h1>

      <div style={{ maxWidth: "900px" }}>
        <div style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb"
        }}>
          {/* Support Header */}
          <div style={{
            textAlign: "center",
            paddingBottom: "32px",
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "32px"
          }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <Headphones size={48} color="#C41E3A" />
            </div>
            <h2 style={{ fontSize: "28px", color: "#1f2937", marginBottom: "8px" }}>
              How can we help you?
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7280" }}>
              Our support team is available 24/7 to assist you
            </p>
          </div>

          {/* Support Options */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px"
          }}>
            <div style={{
              display: "flex",
              gap: "16px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              transition: "box-shadow 0.2s"
            }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{
                width: "48px",
                height: "48px",
                background: "#fee2e2",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Phone size={24} color="#C41E3A" />
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#1f2937", marginBottom: "8px" }}>
                  Phone Support
                </h3>
                <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>
                  Call us at: <strong style={{ color: "#1f2937" }}>1800-123-4567</strong>
                </p>
                <p style={{ fontSize: "13px", color: "#9ca3af", fontStyle: "italic" }}>
                  Available 24/7
                </p>
              </div>
            </div>

            <div style={{
              display: "flex",
              gap: "16px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              transition: "box-shadow 0.2s"
            }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{
                width: "48px",
                height: "48px",
                background: "#fee2e2",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Mail size={24} color="#C41E3A" />
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#1f2937", marginBottom: "8px" }}>
                  Email Support
                </h3>
                <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>
                  Email us at: <strong style={{ color: "#1f2937" }}>support@ashwatthama.com</strong>
                </p>
                <p style={{ fontSize: "13px", color: "#9ca3af", fontStyle: "italic" }}>
                  Response within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            paddingTop: "32px",
            borderTop: "1px solid #e5e7eb"
          }}>
            <h3 style={{ fontSize: "20px", color: "#1f2937", marginBottom: "20px" }}>
              Send us a message
            </h3>
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter subject"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#C41E3A"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Type your message here..."
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#C41E3A"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s"
                }}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.opacity = "1")}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;