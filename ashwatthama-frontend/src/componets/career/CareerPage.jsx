import React, { useState } from "react";
import {
    Briefcase,
    MapPin,
    Clock,
    IndianRupee,
    Users,
    TrendingUp,
    Heart,
    Award,
    Upload,
} from "lucide-react";
import { toast } from "react-toastify";

const CareerPage = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        resume: null,
        coverLetter: "",
    });

    const jobOpenings = [
        {
            id: 1,
            title: "Branch Manager",
            location: "Bangalore",
            type: "Full-time",
            experience: "5-8 years",
            salary: "₹8-12 LPA",
            description:
                "Lead and manage branch operations, customer relationships, and team performance. Responsible for achieving business targets and ensuring regulatory compliance.",
            requirements: [
                "MBA in Finance/Banking or related field",
                "5+ years of experience in banking operations",
                "Strong leadership and team management skills",
                "Excellent communication and interpersonal abilities",
                "Knowledge of banking regulations and compliance",
            ],
        },
        {
            id: 2,
            title: "Relationship Manager",
            location: "Hassan",
            type: "Full-time",
            experience: "3-5 years",
            salary: "₹5-8 LPA",
            description:
                "Build and maintain relationships with high-value customers, cross-sell banking products, and achieve sales targets while ensuring customer satisfaction.",
            requirements: [
                "Graduate/Post-graduate in any discipline",
                "3+ years in sales/relationship management",
                "Proven track record in meeting sales targets",
                "Strong networking and negotiation skills",
                "Customer-centric approach",
            ],
        },
        {
            id: 3,
            title: "Credit Officer",
            location: "Tumakur",
            type: "Full-time",
            experience: "2-4 years",
            salary: "₹4-6 LPA",
            description:
                "Evaluate loan applications, assess creditworthiness, conduct risk analysis, and make lending decisions in accordance with bank policies.",
            requirements: [
                "Degree in Commerce/Finance",
                "2+ years in credit evaluation",
                "Strong analytical and decision-making skills",
                "Knowledge of credit risk assessment",
                "Attention to detail",
            ],
        },
        {
            id: 4,
            title: "Software Developer",
            location: "Bangalore",
            type: "Full-time",
            experience: "2-5 years",
            salary: "₹6-10 LPA",
            description:
                "Develop and maintain banking applications, implement new features, ensure security standards, and work on digital banking initiatives.",
            requirements: [
                "B.Tech/M.Tech in Computer Science",
                "Proficiency in Java, React, Node.js",
                "Experience with banking/financial applications",
                "Understanding of security and compliance",
                "Problem-solving abilities",
            ],
        },
        {
            id: 5,
            title: "Customer Service Executive",
            location: "Multiple Locations",
            type: "Full-time",
            experience: "0-2 years",
            salary: "₹2.5-4 LPA",
            description:
                "Provide excellent customer service, handle inquiries, resolve complaints, and assist customers with banking products and services.",
            requirements: [
                "Graduate in any discipline",
                "Excellent communication skills",
                "Customer service orientation",
                "Basic computer knowledge",
                "Freshers welcome",
            ],
        },
        {
            id: 6,
            title: "Risk & Compliance Officer",
            location: "Bangalore",
            type: "Full-time",
            experience: "4-7 years",
            salary: "₹7-11 LPA",
            description:
                "Monitor and ensure compliance with banking regulations, assess operational risks, conduct audits, and implement risk mitigation strategies.",
            requirements: [
                "CA/MBA with specialization in Finance",
                "4+ years in risk management/compliance",
                "Knowledge of RBI guidelines and regulations",
                "Strong analytical skills",
                "Certification in Risk Management (preferred)",
            ],
        },
    ];

    const benefits = [
        {
            icon: <IndianRupee size={32} />,
            title: "Competitive Salary",
            description: "Industry-leading compensation packages with performance bonuses",
        },
        {
            icon: <Heart size={32} />,
            title: "Health Benefits",
            description: "Comprehensive health insurance for you and your family",
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Career Growth",
            description: "Clear career progression paths and skill development programs",
        },
        {
            icon: <Award size={32} />,
            title: "Recognition",
            description: "Regular awards and recognition for outstanding performance",
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            resume: e.target.files[0],
        }));
    };

    const handleApply = (job) => {
        setSelectedJob(job);
        setFormData((prev) => ({
            ...prev,
            position: job.title,
        }));
        setShowApplicationForm(true);
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        if (!formData.resume) {
            toast.error("Please upload your resume");
            return;
        }

        try {
            // Here you would normally send the data to your backend
            toast.success("Application submitted successfully! We'll contact you soon.");
            setShowApplicationForm(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                position: "",
                experience: "",
                resume: null,
                coverLetter: "",
            });
        } catch (error) {
            toast.error("Failed to submit application. Please try again.");
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section
                style={{
                    background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                    padding: "100px 20px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        right: "-100px",
                        width: "400px",
                        height: "400px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "50%",
                    }}
                />
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        textAlign: "center",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <h1
                        style={{
                            fontSize: "52px",
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: "20px",
                        }}
                    >
                        Build Your Career With Us
                    </h1>
                    <p
                        style={{
                            fontSize: "20px",
                            color: "rgba(255, 255, 255, 0.9)",
                            maxWidth: "700px",
                            margin: "0 auto 40px",
                            lineHeight: "1.6",
                        }}
                    >
                        Join our team of passionate professionals and make a difference in the
                        banking industry
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "40px",
                            justifyContent: "center",
                            marginTop: "40px",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: "42px",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                            >
                                500+
                            </div>
                            <div
                                style={{
                                    fontSize: "16px",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Employees
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: "42px",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                            >
                                {jobOpenings.length}
                            </div>
                            <div
                                style={{
                                    fontSize: "16px",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Open Positions
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: "42px",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                            >
                                5
                            </div>
                            <div
                                style={{
                                    fontSize: "16px",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Locations
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section style={{ padding: "80px 20px", background: "#f9fafb" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <h2
                            style={{
                                fontSize: "40px",
                                fontWeight: 700,
                                color: "#1f2937",
                                marginBottom: "16px",
                            }}
                        >
                            Why Work With Us?
                        </h2>
                        <p
                            style={{
                                fontSize: "18px",
                                color: "#6b7280",
                                maxWidth: "600px",
                                margin: "0 auto",
                            }}
                        >
                            We believe in nurturing talent and providing a fulfilling work environment
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "30px",
                        }}
                    >
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                style={{
                                    background: "#fff",
                                    padding: "40px",
                                    borderRadius: "16px",
                                    textAlign: "center",
                                    border: "1px solid #e5e7eb",
                                    transition: "all 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-8px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 12px 24px rgba(196, 30, 58, 0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto 24px",
                                        color: "#fff",
                                    }}
                                >
                                    {benefit.icon}
                                </div>
                                <h3
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: 600,
                                        color: "#1f2937",
                                        marginBottom: "12px",
                                    }}
                                >
                                    {benefit.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "15px",
                                        color: "#6b7280",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section style={{ padding: "80px 20px", background: "#fff" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <h2
                            style={{
                                fontSize: "40px",
                                fontWeight: 700,
                                color: "#1f2937",
                                marginBottom: "16px",
                            }}
                        >
                            Current Openings
                        </h2>
                        <p
                            style={{
                                fontSize: "18px",
                                color: "#6b7280",
                            }}
                        >
                            Explore exciting career opportunities across different roles and locations
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        {jobOpenings.map((job) => (
                            <div
                                key={job.id}
                                style={{
                                    background: "#fff",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "12px",
                                    padding: "28px",
                                    transition: "all 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        "0 8px 24px rgba(0, 0, 0, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: 600,
                                        color: "#1f2937",
                                        marginBottom: "16px",
                                    }}
                                >
                                    {job.title}
                                </h3>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <MapPin size={16} color="#6b7280" />
                                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                                            {job.location}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <Clock size={16} color="#6b7280" />
                                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                                            {job.type}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <Briefcase size={16} color="#6b7280" />
                                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                                            {job.experience}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <IndianRupee size={16} color="#6b7280" />
                                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                                            {job.salary}
                                        </span>
                                    </div>
                                </div>

                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#6b7280",
                                        lineHeight: "1.6",
                                        marginBottom: "20px",
                                    }}
                                >
                                    {job.description.substring(0, 120)}...
                                </p>

                                <button
                                    onClick={() => handleApply(job)}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
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
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form Modal */}
            {showApplicationForm && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "20px",
                    }}
                    onClick={() => setShowApplicationForm(false)}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "40px",
                            maxWidth: "600px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2
                            style={{
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "#1f2937",
                                marginBottom: "8px",
                            }}
                        >
                            Apply for {selectedJob?.title}
                        </h2>
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                marginBottom: "32px",
                            }}
                        >
                            {selectedJob?.location} • {selectedJob?.type}
                        </p>

                        <form onSubmit={handleSubmitApplication}>
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
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                            </div>

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
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                            </div>

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
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                            </div>

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
                                    Years of Experience *
                                </label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., 3 years"
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                            </div>

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
                                    Upload Resume * (PDF, DOC, DOCX)
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                            </div>

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
                                    Cover Letter (Optional)
                                </label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Tell us why you're a great fit for this role..."
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                        fontFamily: "inherit",
                                        resize: "vertical",
                                    }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "12px" }}>
                                <button
                                    type="submit"
                                    style={{
                                        flex: 1,
                                        padding: "14px",
                                        background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "15px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Submit Application
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowApplicationForm(false)}
                                    style={{
                                        flex: 1,
                                        padding: "14px",
                                        background: "#fff",
                                        color: "#6b7280",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "8px",
                                        fontSize: "15px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerPage;