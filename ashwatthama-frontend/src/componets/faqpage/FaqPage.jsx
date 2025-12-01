import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: "Account Services",
      questions: [
        {
          question: "How do I open a savings account?",
          answer:
            "To open a savings account, visit our nearest branch with your Aadhar card, PAN card, address proof, and passport-size photographs. You can also apply online through our website by clicking on 'Open a Savings Account' button and following the guided process. The account will be activated within 24-48 hours after document verification.",
        },
        {
          question: "What is the minimum balance requirement?",
          answer:
            "The minimum balance requirement varies by account type. Regular Savings Account requires ₹5,000, while our Premium Savings Account requires ₹25,000. Senior Citizen accounts have a reduced minimum balance of ₹2,500.",
        },
        {
          question: "How can I update my contact details?",
          answer:
            "You can update your contact details by visiting any of our branches with a valid ID proof and address proof. Alternatively, log in to your internet banking account and navigate to Profile Settings > Update Contact Information. Changes will be reflected within 24 hours.",
        },
        {
          question: "What documents are required for account opening?",
          answer:
            "You need to provide: 1) Identity Proof (Aadhar/PAN/Passport/Driving License), 2) Address Proof (Aadhar/Utility Bills/Rent Agreement), 3) Recent passport-size photographs, 4) PAN Card (mandatory for accounts with balance >₹50,000).",
        },
      ],
    },
    {
      category: "Internet Banking",
      questions: [
        {
          question: "How do I activate internet banking?",
          answer:
            "Visit our website and click on 'Register for Internet Banking'. Enter your account number, registered mobile number, and email. You'll receive an OTP for verification. After successful registration, set your username and password to start using internet banking services.",
        },
        {
          question: "I forgot my internet banking password. What should I do?",
          answer:
            "Click on 'Forgot Password' on the login page. Enter your customer ID and registered email/mobile number. You'll receive a password reset link via email and an OTP on your mobile. Follow the instructions to create a new password.",
        },
        {
          question: "Is internet banking secure?",
          answer:
            "Yes, our internet banking platform uses 256-bit SSL encryption, two-factor authentication, and OTP verification for transactions. We recommend using strong passwords, avoiding public WiFi for banking, and never sharing your credentials with anyone.",
        },
        {
          question: "What are the transaction limits for online banking?",
          answer:
            "Daily transaction limits are: NEFT/RTGS - ₹10,00,000, IMPS - ₹2,00,000, Bill Payments - ₹1,00,000. You can request for higher limits by contacting customer care or visiting your branch.",
        },
      ],
    },
    {
      category: "Loans",
      questions: [
        {
          question: "What types of loans do you offer?",
          answer:
            "We offer Home Loans, Personal Loans, Business Loans, Gold Loans, Education Loans, Vehicle Loans, and Mortgage Loans. Each loan type has different eligibility criteria, interest rates, and repayment terms tailored to meet your specific needs.",
        },
        {
          question: "What is the interest rate for home loans?",
          answer:
            "Our home loan interest rates start from 8.5% per annum and may vary based on your credit score, loan amount, tenure, and income profile. We offer competitive rates for salaried and self-employed individuals with flexible repayment options up to 30 years.",
        },
        {
          question: "How long does loan approval take?",
          answer:
            "For pre-approved customers with good credit history, loans can be approved within 48 hours. Regular loan applications typically take 5-7 working days after document submission and verification. Gold loans and loans against fixed deposits have same-day approval.",
        },
        {
          question: "Can I prepay my loan?",
          answer:
            "Yes, you can prepay your loan partially or fully. For floating rate loans, there are no prepayment charges. For fixed rate loans, a nominal prepayment fee of 2-4% may apply. You can prepay through internet banking, mobile app, or by visiting any branch.",
        },
      ],
    },
    {
      category: "Cards & Payments",
      questions: [
        {
          question: "How do I apply for a debit/credit card?",
          answer:
            "Debit cards are automatically issued with your savings account. For credit cards, you can apply online or visit any branch. You'll need to provide income proof, identity documents, and address proof. Credit card approval depends on your credit score and income eligibility.",
        },
        {
          question: "What should I do if my card is lost or stolen?",
          answer:
            "Immediately call our 24/7 customer care at (+91)9113987698 or use the 'Block Card' option in mobile banking. You can also visit the nearest branch to block your card and apply for a replacement. Report the loss to prevent unauthorized transactions.",
        },
        {
          question: "How can I activate my new debit/credit card?",
          answer:
            "You can activate your card through: 1) ATM - Insert card, select 'Set PIN', enter OTP received on mobile, 2) Internet Banking - Login and go to Cards section, 3) Mobile Banking App - Navigate to Cards and click 'Activate', 4) Customer Care - Call and follow IVR instructions.",
        },
        {
          question: "What are the charges for international transactions?",
          answer:
            "International debit card transactions attract 3.5% + GST on the transaction amount. Credit card foreign currency markup is 3% + GST. ATM withdrawals abroad have additional charges ranging from ₹150-₹250 per transaction plus GST.",
        },
      ],
    },
    {
      category: "Fixed Deposits",
      questions: [
        {
          question: "What is the interest rate on fixed deposits?",
          answer:
            "Fixed deposit interest rates range from 5.5% to 7.5% per annum depending on the tenure (7 days to 10 years) and deposit amount. Senior citizens get an additional 0.5% interest. Special rates are offered for deposits above ₹1 crore.",
        },
        {
          question: "Can I withdraw my FD before maturity?",
          answer:
            "Yes, premature withdrawal is allowed but attracts a penalty of 0.5-1% on the applicable interest rate. No interest is paid for FDs withdrawn within 7 days of booking. You can withdraw through internet banking, mobile app, or by visiting the branch.",
        },
        {
          question: "Is there a loan facility against fixed deposits?",
          answer:
            "Yes, you can avail loan up to 90% of your FD value at interest rates typically 1-2% higher than your FD rate. There's no processing fee, and the loan can be availed instantly through internet banking or by visiting any branch.",
        },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
          padding: "80px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "300px",
            height: "300px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "rgba(255, 255, 255, 0.05)",
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
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              marginBottom: "20px",
            }}
          >
            <HelpCircle size={40} color="#fff" />
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Find answers to common questions about our banking services
          </p>

          {/* Search Bar */}
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 50px 16px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "50px",
                outline: "none",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Search
              size={20}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section style={{ padding: "80px 20px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {filteredFAQs.map(
            (category, catIndex) =>
              category.questions.length > 0 && (
                <div
                  key={catIndex}
                  style={{
                    marginBottom: "40px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: 600,
                      color: "#1f2937",
                      marginBottom: "24px",
                      paddingBottom: "12px",
                      borderBottom: "3px solid #C41E3A",
                      display: "inline-block",
                    }}
                  >
                    {category.category}
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {category.questions.map((faq, index) => {
                      const globalIndex = `${catIndex}-${index}`;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div
                          key={index}
                          style={{
                            background: "#fff",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            overflow: "hidden",
                            transition: "all 0.3s",
                            boxShadow: isOpen
                              ? "0 4px 12px rgba(196, 30, 58, 0.1)"
                              : "0 1px 3px rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <button
                            onClick={() => toggleAccordion(globalIndex)}
                            style={{
                              width: "100%",
                              padding: "20px 24px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#1f2937",
                                flex: 1,
                              }}
                            >
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp size={20} color="#C41E3A" />
                            ) : (
                              <ChevronDown size={20} color="#6b7280" />
                            )}
                          </button>

                          {isOpen && (
                            <div
                              style={{
                                padding: "0 24px 24px",
                                fontSize: "15px",
                                color: "#6b7280",
                                lineHeight: "1.8",
                                animation: "fadeIn 0.3s ease-in",
                              }}
                            >
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
          )}

          {filteredFAQs.every((cat) => cat.questions.length === 0) && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <p style={{ fontSize: "18px", color: "#6b7280" }}>
                No results found for "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section
        style={{
          padding: "60px 20px",
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#1f2937",
              marginBottom: "16px",
            }}
          >
            Still Have Questions?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              marginBottom: "32px",
            }}
          >
            Our customer support team is available 24/7 to help you
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="tel:+919113987698"
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "15px",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Call Us: (+91)9113987698
            </a>
            <a
              href="mailto:support@ashwatthamabaning.com"
              style={{
                padding: "14px 32px",
                background: "#fff",
                color: "#C41E3A",
                border: "2px solid #C41E3A",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "15px",
                display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C41E3A";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#C41E3A";
              }}
            >
              Email Support
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FaqPage;