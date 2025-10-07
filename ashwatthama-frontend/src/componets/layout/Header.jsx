import React from "react";

const Header = () => {
  return (
    <>
      {/* Start preloader */}
      {/* <div className="loader-wrap">
        <div className="preloader">
          <div className="preloader-close">x</div>
          <div id="handle-preloader" className="handle-preloader">
            <div className="animation-preloader">
              <div className="spinner" />
              <div className="txt-loading">
                <span data-text-preloader="A" className="letters-loading">
                  A
                </span>
                <span data-text-preloader="S" className="letters-loading">
                  S
                </span>
                <span data-text-preloader="H" className="letters-loading">
                  H
                </span>
                <span data-text-preloader="W" className="letters-loading">
                  W
                </span>
                <span data-text-preloader="A" className="letters-loading">
                  A
                </span>
                <span data-text-preloader="T" className="letters-loading">
                  T
                </span>
                <span data-text-preloader="T" className="letters-loading">
                  T
                </span>
                <span data-text-preloader="H" className="letters-loading">
                  H
                </span>
                <span data-text-preloader="A" className="letters-loading">
                  A
                </span>
                <span data-text-preloader="M" className="letters-loading">
                  M
                </span>
                <span data-text-preloader="A" className="letters-loading">
                  A
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* End preloader */}
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
                    <div className="select-box clearfix">
                      <select className="wide">
                        <option data-display="Personal Banking">
                          Savings Account
                        </option>
                        <option value={1}>Fixed Deposit Account</option>
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
                        <a href="#">Careers</a>
                      </li>
                      <li>
                        <a href="#">Faq’s</a>
                      </li>
                      <li>
                        <a href="#">Offers</a>
                      </li>
                      <li>
                        <a href="#">My Account</a>
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
                          <option id="en" value="en" selected="">
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
                      <a href="#" className="mobile-nav__toggler">
                        <i className="icon-menu" />
                      </a>
                      <ul className="main-menu__list one-page-scroll-menu">
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
                        href="new-savings-account-registration.php"
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
    </>
  );
};

export default Header;
