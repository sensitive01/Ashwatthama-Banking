import React, { useState, useEffect } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      const menu = document.querySelector('.main-menu__list');
      const toggler = document.querySelector('.mobile-nav__toggler');

      if (menu && toggler &&
        !menu.contains(event.target) &&
        !toggler.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="page-wrapper">
        <header className="main-header main-header-style1">
          {/*Start Main Header Style1 Top*/}
          <div className="main-header-style1-top">
            <div className="auto-container">
              <div className="outer-box">
                {/*Start Main Header Style1 Top Left*/}
                <div className="main-header-style1-top__left">
                  <div className="looking-banking-box ">
                    <div className="inner-title">
                      <span className="icon-binoculars" />
                      <p>Looking</p>
                    </div>
                    <div className="select-box clearfix" style={{ position: 'relative', width: '200px' }}>
                      <select
                        className="wide"
                        style={{
                          padding: '8px 20px',
                          width: '100%',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          paddingRight: '30px',
                          fontSize: '14px',
                          color: '#333',
                          height: '40px',
                          boxSizing: 'border-box',
                          outline: 'none',
                          boxShadow: 'none'
                        }}
                      >
                        <option data-display="Personal Banking">
                          Savings Account
                        </option>
                        <option value={1}>
                          Fixed Deposit Account
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="nearest-branch">
                    <span className="icon-map" />
                    <a href="#">Find Nearest Branch</a>
                  </div>
                </div>
                {/*End Main Header Style1 Top Left*/}
                {/*Start Main Header Style1 Top Right*/}
                <div className="main-header-style1-top__right">
                  <div className="header-menu-style1">
                    <ul>
                      <li>
                        <a href="/career-page">Careers</a>
                      </li>
                      <li>
                        <a href="/faq-page">Faq's</a>
                      </li>
                      <li>
                        <a href="#">Offers</a>
                      </li>
                      <li>
                        <a href="/customer-login-page">Customer Login</a>
                      </li>
                    </ul>
                  </div>
                  <div className="box-search-style1">
                    <a href="#" className="search-toggler">
                      <span className="icon-search" />
                      Search
                    </a>
                  </div>
                  <div className="language-switcher">
                    <div id="polyglotLanguageSwitcher">
                      <form action="#">
                        <select id="polyglot-language-options">
                          <option id="en" value="en">
                            English
                          </option>
                          <option id="fr" value="fr">
                            Kannada
                          </option>
                          <option id="de" value="de">
                            Tamil
                          </option>
                          <option id="it" value="it">
                            Telugu
                          </option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
                {/*End Main Header Style1 Top Right*/}
              </div>
            </div>
          </div>
          {/*End Main Header Style1 Top*/}
          <nav className="main-menu main-menu-style1">
            <div className="main-menu__wrapper clearfix">
              <div className="container">
                <div className="main-menu__wrapper-inner">
                  <div className="main-menu-style1-left">
                    <div className="logo-box-style1">
                      <a href="/">
                        <img
                          src="assets/images/resources/amf.png"
                          width="180px"
                          alt="Awesome Logo"
                          title=""
                        />
                      </a>
                    </div>
                    <div className="main-menu-box">
                      <a
                        href="#"
                        className="mobile-nav__toggler"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMobileMenu();
                        }}
                      >
                        <i className={`icon-menu ${mobileMenuOpen ? 'active' : ''}`} />
                      </a>
                      <ul className={`main-menu__list one-page-scroll-menu ${mobileMenuOpen ? 'mobile-menu-visible' : ''}`}>
                        <li className="scrollToLink">
                          <a href="/">Home</a>
                        </li>
                        <li className="scrollToLink">
                          <a href="/about-us">About Us</a>
                        </li>
                        <li className="scrollToLink">
                          <a href="/savings-account">Banking Services</a>
                        </li>
                        <li className="dropdown">
                          <a href="#">Account</a>
                          <ul>
                            <li>
                              <a href="/new-savings-account-reg-form">Saving Account</a>
                            </li>
                            <li>
                              <a href="#service">FD Account</a>
                            </li>
                          </ul>
                        </li>
                        <li className="scrollToLink">
                          <a href="#news">News</a>
                        </li>
                        <li className="scrollToLink">
                          <a href="/contact-us">Contact Us</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="main-menu-style1-right">
                    <div className="header-btn-one">
                      <a
                        className="style2"
                        href="/new-savings-account-reg-form"
                      >
                        <span className="icon-payment" />
                        Open a Savings Account
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {/*Start Main Header Style1 Bottom*/}
          <div className="main-header-style1-bottom">
            <div className="auto-container">
              <div className="outer-box">
                <div className="update-box">
                  <div className="inner-title">
                    <span className="icon-megaphone" />
                    <h4>Updates:</h4>
                  </div>
                  <div className="text">
                    <p>
                      Get upto 4%* on our Savings Account Balances with
                      Ashwatthama Core Banking.
                    </p>
                    <a href="#">
                      <span className="icon-chevron" />
                      More Details
                    </a>
                  </div>
                </div>
                <div className="slogan-box">
                  <p>
                    Dear Customer, We have launched Video KYC facility for New
                    customer to open savings ac
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*End Main Header Style1 Bottom*/}
        </header>
      </div>
      <style jsx global>{`
        .main-menu-box {
          position: relative;
        }

        .mobile-nav__toggler {
          display: none;
          font-size: 24px;
          color: #333;
          padding: 10px;
          cursor: pointer;
          z-index: 1001;
          position: relative;
        }

        .icon-menu {
          transition: all 0.3s ease;
        }

        .icon-menu.active {
          transform: rotate(90deg);
        }

        @media (max-width: 991px) {
          .mobile-nav__toggler {
            display: block;
          }

          .main-menu__list {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            z-index: 1000;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border-radius: 0 0 8px 8px;
            margin: 0;
            list-style: none;
          }

          .main-menu__list.mobile-menu-visible {
            display: block !important;
          }

          .main-menu__list > li {
            display: block;
            margin: 0;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
          }

          .main-menu__list > li:last-child {
            border-bottom: none;
          }

          .main-menu__list > li > a {
            display: block;
            color: #333;
            text-decoration: none;
            font-size: 16px;
            padding: 5px 0;
          }

          .dropdown > ul {
            position: static !important;
            display: none;
            opacity: 1;
            visibility: visible;
            box-shadow: none;
            padding-left: 20px;
            margin-top: 10px;
            background: #f9f9f9;
            border-radius: 4px;
          }

          .dropdown:hover > ul,
          .dropdown.active > ul {
            display: block;
          }
        }

        @media (min-width: 992px) {
          .main-menu__list {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;