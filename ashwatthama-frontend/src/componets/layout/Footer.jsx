import React, { useState } from "react";
import { toast } from "react-toastify";
import { userSubmitContactUsForm } from "../../api/service/axiosService";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await userSubmitContactUsForm(formData);

      if (response.status === 201) {
        toast.success(response.data.message || "Message sent successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response.response?.data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/*Start Main Contact Form Area*/}
      <section id="contact" className="main-contact-form-area pdb100">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="contact-info-box-style1">
                <div className="box1" />
                <div className="title">
                  <h2>
                    Get Support for
                    <br /> any Queries or Complaints
                  </h2>
                  <p>Committed to helping you meet all your banking needs.</p>
                </div>
                <ul className="contact-info-1">
                  <li>
                    <div className="icon">
                      <span className="icon-map" />
                    </div>
                    <div className="text">
                      <p>Our Branches</p>
                      <h3>
                        Hassan | Tumakur | Vijayapura | Bangalore Urban |
                        Bangalore Rural
                      </h3>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-clock" />
                    </div>
                    <div className="text">
                      <p>Office Hours</p>
                      <h3>Mon - Fri: 9.00am to 6.00pm</h3>
                      <span>[2nd Sat Holiday]</span>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-phone" />
                    </div>
                    <div className="text">
                      <p>Front Desk</p>
                      <h3>
                        <a href="tel:+919113987698">(+91)9113987698</a>
                      </h3>
                      <h3>
                        <a href="mailto:support@ashwatthamabaning.com">
                          support@ashwatthamabaning.com
                        </a>
                      </h3>
                    </div>
                  </li>
                </ul>
                <div className="bottom-box">
                  <div className="btn-box">
                    <a href="#">
                      <i className="fas fa-arrow-down" /> Customer Care
                    </a>
                  </div>
                  <div className="footer-social-link-style1">
                    <ul className="clearfix">
                      <li>
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="contact-form">
                <form
                  id="contact-form"
                  name="contact_form"
                  className="default-form2"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label>Name</label>
                    <div className="input-box">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        maxLength={50}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-box">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email ID"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <div className="input-box">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <div className="input-box">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <div className="input-box">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        required
                      />
                    </div>
                  </div>
                  <div className="button-box">
                    <button
                      className="btn-one"
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}
                    >
                      <span className="txt">
                        {isSubmitting ? "Sending..." : "Send a Message"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Main Contact Form Area*/}
      {/*Start slogan area*/}
      <section className="slogan-area">
        <div className="container">
          <div className="slogan-content-box">
            <div
              className="slogan-content-box-bg"
              style={{
                backgroundImage:
                  "url(assets/images/backgrounds/slogan-content-box-bg.jpg)",
              }}
            />
            <div className="inner-title">
              <h2>Experience a New Digital World.</h2>
              <p>
                Mobile banking application with new &amp; exciting features.
              </p>
            </div>
            <div className="get-app-box">
              <ul>
                <li>
                  <a href="#">
                    <div className="icon">
                      <span className="icon-play-store" />
                    </div>
                    <div className="text">
                      <h4>Download</h4>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="style2" href="#">
                    <div className="icon">
                      <span className="icon-apple" />
                    </div>
                    <div className="text">
                      <h4>Download</h4>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/*End slogan area*/}
      {/*Start footer area */}
      <footer className="footer-area">
        <div className="right-shape">
          <img src="assets/images/shapes/footer-right-shape.png" alt="" />
        </div>
        {/*Start Footer Top*/}
        <div className="footer-top">
          <div className="lef-shape">
            <span className="icon-origami" />
          </div>
          <div className="container">
            <div className="row">
              {/*Start single footer widget*/}
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 single-widget">
                <div className="single-footer-widget single-footer-widget--link-box">
                  <div className="title">
                    <h3>Loans</h3>
                  </div>
                  <div className="footer-widget-links">
                    <ul>
                      <li>
                        <a href="#">Home Loan</a>
                      </li>
                      <li>
                        <a href="#">Business Loan</a>
                      </li>
                      <li>
                        <a href="#">Personal Loan</a>
                      </li>
                      <li>
                        <a href="#">Gold Loan</a>
                      </li>
                      <li>
                        <a href="#">Mortgage Loan</a>
                      </li>
                      <li>
                        <a href="#">Fixed Deposit Loan</a>
                      </li>
                      <li>
                        <a href="#">Construction Loan</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*End single footer widget*/}
              {/*Start single footer widget*/}
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 single-widget">
                <div className="single-footer-widget single-footer-widget--link-box">
                  <div className="title">
                    <h3>Rates &amp; Charges</h3>
                  </div>
                  <div className="footer-widget-links">
                    <ul>
                      <li>
                        <a href="#">Interest Rates</a>
                      </li>
                      <li>
                        <a href="#">Gold Rate Today</a>
                      </li>
                      <li>
                        <a href="#">Service Charges &amp; Fees</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-footer-widget single-footer-widget--link-box-style2">
                  <div className="title">
                    <h3>Online</h3>
                  </div>
                  <div className="footer-widget-links">
                    <ul>
                      <li>
                        <a href="#">Mobile Banking</a>
                      </li>
                      <li>
                        <a href="#">Internet Banking</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*End single footer widget*/}
              {/*Start single footer widget*/}
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 single-widget">
                <div className="single-footer-widget single-footer-widget--link-box">
                  <div className="title">
                    <h3>About Us</h3>
                  </div>
                  <div className="footer-widget-links">
                    <ul>
                      <li>
                        <a href="#">Our Story</a>
                      </li>
                      <li>
                        <a href="#">Board of Directors</a>
                      </li>
                      <li>
                        <a href="#">Management Committee</a>
                      </li>
                      <li>
                        <a href="#">Media</a>
                      </li>
                      <li>
                        <a href="#">Investor Relations</a>
                      </li>
                      <li>
                        <a href="#">Awards &amp; Recognition</a>
                      </li>
                      <li>
                        <a href="#">Careers</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*End single footer widget*/}
              {/*Start single footer widget*/}
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 single-widget">
                <div className="single-footer-widget single-footer-widget--link-box">
                  <div className="title">
                    <h3>Services</h3>
                  </div>
                  <div className="footer-widget-links">
                    <ul>
                      <li>
                        <a href="#">Savings Account</a>
                      </li>
                      <li>
                        <a href="#">Current Account</a>
                      </li>
                      <li>
                        <a href="#">Deposits</a>
                      </li>
                      <li>
                        <a href="#">Cards</a>
                      </li>
                      <li>
                        <a href="#">Payments</a>
                      </li>
                      <li>
                        <a href="#">Insurance</a>
                      </li>
                      <li>
                        <a href="#">Locker Facility</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*End single footer widget*/}
            </div>
          </div>
        </div>
        {/*End Footer Top*/}
        {/*Start Footer*/}
        <div className="footer">
          <div className="container">
            <div className="row">
              {/*Start single footer widget*/}
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="single-footer-widget marbtm50">
                  <div className="our-company-info">
                    <div className="footer-logo-style1">
                      <a href="#">
                        <img
                          src="assets/images/resources/amf.png"
                          alt="Awesome Logo"
                          title=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/*End single footer widget*/}
              {/*Start single footer widget*/}
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="single-footer-widget marbtm50">
                  <div className="footer-widget-contact-info">
                    <ul>
                      <li>
                        <h3>
                          <a href="tel:+919113987698">(+91)9113987698</a>
                        </h3>
                        <p>Customer Care</p>
                      </li>
                      <li>
                        <h3>Mon - Fri: 9.00am to 6.00pm</h3>
                        <p>Banking Hours</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*End single footer widget*/}
              {/*Start single footer widget*/}
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="single-footer-widget">
                  <div className="single-footer-widget-right-colum">
                    <ul>
                      <li>
                        <a href="#">
                          Download Forms
                          <span className="icon-download" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Register Your Complaint
                          <span className="icon-feedback" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*End single footer widget*/}
            </div>
          </div>
        </div>
        {/*End Footer*/}
        <div className="footer-bottom">
          <div className="container">
            <div className="bottom-inner">
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="#">Disclaimer</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Online Security Tips</a>
                  </li>
                </ul>
              </div>
              <div className="footer-social-link">
                <ul className="clearfix">
                  <li>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-text" align="center">
          <br />
          <p>
            Copyright © 2025 <a href="#">Ashwatthama Core Banking.</a> Designed
            and developed by{" "}
            <a href="https://sensitive.co.in">Sensitive Technologies</a>.
          </p>
          <br />
        </div>
      </footer>
      {/*End footer area*/}
      {/* /.page-wrapper */}
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay mobile-nav__toggler" />
        <div className="mobile-nav__content">
          <span className="mobile-nav__close mobile-nav__toggler">
            <i className="fas fa-plus" />
          </span>
          <div className="logo-box">
            <a href="#" aria-label="logo image">
              <img src="assets/images/resources/amf.png" alt="" />
            </a>
          </div>
          <div className="mobile-nav__container" />
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope" />
              <a href="mailto:support@ashwatthamabaning.com">
                support@ashwatthamabaning.com
              </a>
            </li>
            <li>
              <i className="fa fa-phone-alt" />
              <a href="tel:+919113987698">(+91)9113987698</a>
            </li>
          </ul>
          <div className="mobile-nav__social">
            <a href="#" className="fab fa-twitter" />
            <a href="#" className="fab fa-facebook-square" />
            <a href="#" className="fab fa-pinterest-p" />
            <a href="#" className="fab fa-instagram" />
          </div>
        </div>
      </div>
      <div className="search-popup">
        <div className="search-popup__overlay search-toggler" />
        <div className="search-popup__content">
          <form action="#">
            <label htmlFor="search" className="sr-only">
              search here
            </label>
            <input type="text" id="search" placeholder="Search Here..." />
            <button
              type="submit"
              aria-label="search submit"
              className="thm-btn"
            >
              <i className="icon-search" />
            </button>
          </form>
        </div>
      </div>
      <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
        <i className="icon-chevron" />
      </a>
    </>
  );
};

export default Footer;