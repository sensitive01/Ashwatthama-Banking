import React from "react";

const ContactPage = () => {
  return (
    <>
      <div className="stricky-header stricked-menu main-menu">
        <div className="sticky-header__content" />
        {/* /.sticky-header__content */}
      </div>
      {/* /.stricky-header */}
      {/*Main Slider Start*/}
      <section id="home" className="main-slider main-slider-style1">
        <div
          className="swiper-container thm-swiper__slider"
          data-swiper-options='{"slidesPerView": 1, "loop": true,
          "effect": "fade",
          "pagination": {
          "el": "#main-slider-pagination",
          "type": "bullets",
          "clickable": true
          },
          "navigation": {
          "nextEl": "#main-slider__swiper-button-next",
          "prevEl": "#main-slider__swiper-button-prev"
          },
          "autoplay": {
          "delay": 5000
          }}'
        >
          <div className="swiper-wrapper">
            <div className="slider-buttom-box">
              <a className="style2" href="#">
                Make Payment <span className="icon-play-button" />
              </a>
              <a href="#">
                Make an Enquiry <span className="icon-play-button" />
              </a>
            </div>
            {/*Start Single Swiper Slide*/}
            <div className="swiper-slide">
              <div
                className="image-layer"
                style={{
                  backgroundImage: "url(assets/images/resources/11.jpg)",
                }}
              ></div>
              <div
                className="main-slider-style1__shape1"
                style={{
                  backgroundImage:
                    "url(assets/images/shapes/slider-1-shape-1.png)",
                }}
              ></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="main-slider-content">
                      <div className="main-slider-content__inner">
                        <div className="big-title">
                          <h2>
                            Bank with the
                            <br /> Happiest Customers
                            <br /> in the World
                          </h2>
                        </div>
                        <div className="text">
                          <p>
                            You are on among the best customers to let us serve
                            you better
                            <br />
                            in all your banking needs.
                          </p>
                        </div>
                        <div className="btns-box">
                          <a className="btn-one" href="#">
                            <span className="txt">Make an Appointment</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End Single Swiper Slide*/}
            {/*Start Single Swiper Slide*/}
            <div className="swiper-slide">
              <div
                className="image-layer"
                style={{
                  backgroundImage: "url(assets/images/resources/12.png)",
                }}
              ></div>
              <div
                className="main-slider-style1__shape1"
                style={{
                  backgroundImage:
                    "url(assets/images/shapes/slider-1-shape-1.png)",
                }}
              ></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="main-slider-content">
                      <div className="main-slider-content__inner">
                        <div className="big-title">
                          <h2>
                            Banking Made
                            <br /> Easy, More Secure &amp;
                            <br /> More Personal
                          </h2>
                        </div>
                        <div className="text">
                          <p>
                            Banking with Ashwatthama Made Easy, More Secure
                            &amp; More Customer Centric.
                          </p>
                        </div>
                        <div className="btns-box">
                          <a className="btn-one" href="#contact">
                            <span className="txt">Make an Appointment</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End Single Swiper Slide*/}
          </div>
          {/* If we need navigation buttons */}
          <div className="main-slider__nav">
            <div
              className="swiper-button-prev"
              id="main-slider__swiper-button-next"
            >
              <i className="icon-chevron left" />
            </div>
            <div
              className="swiper-button-next"
              id="main-slider__swiper-button-prev"
            >
              <i className="icon-chevron right" />
            </div>
          </div>
        </div>
      </section>
      {/*Main Slider End*/}
      {/*Start Intro Style1 Area*/}
      <section id="about" className="intro-style1-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="intro-style1-video-gallery">
                <div
                  className="intro-style1-video-gallery-bg"
                  style={{
                    backgroundImage:
                      "url(assets/images/resources/intro-style1-video-gallery.jpg)",
                  }}
                ></div>
                <div className="intro-video-gallery-style1">
                  <div
                    className="icon wow zoomIn animated"
                    data-wow-delay="300ms"
                    data-wow-duration="1500ms"
                  >
                    <a
                      className="video-popup"
                      title="Video Gallery"
                      href="https://www.youtube.com/watch?v=06dV9txztKY"
                    >
                      <span className="icon-play-button-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="intro-style1-content-box">
                <div className="sec-title">
                  <h2>
                    About
                    <br />
                    <b className="text-danger">Ashwatthama</b>
                    <br />
                    Core Banking
                  </h2>
                </div>
                <div className="text" align="justify">
                  <p>
                    Ashwatthama Microfinance Pvt. Ltd. is a reputable financial
                    institution with extensive experience in the microfinance
                    sector. The company focuses on delivering vital financial
                    services to underserved communities, including customer
                    accounts, loans, and investment options. With a strong
                    commitment to financial inclusion, Ashwatthama Microfinance
                    aims to empower individuals and small businesses by
                    providing accessible and sustainable financial solutions.
                    Through its expertise and customer-first approach, the
                    company helps clients reach their financial objectives while
                    supporting broader economic growth.
                  </p>
                </div>
                <div className="row">
                  {/*Start Intro Style1 Single Box*/}
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="intro-style1-single-box">
                      <div className="img-box">
                        <div className="img-box-inner">
                          <img
                            src="assets/images/resources/intro-style1-1.jpg"
                            alt=""
                          />
                        </div>
                        <div className="overlay-text">
                          <h3>Our Journey</h3>
                        </div>
                      </div>
                      <div className="title-box">
                        <h3>
                          <a href="#">
                            For Over a Decade, Ashwatthama Micro...
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/*End Intro Style1 Single Box*/}
                  {/*Start Intro Style1 Single Box*/}
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="intro-style1-single-box">
                      <div className="img-box">
                        <div className="img-box-inner">
                          <img
                            src="assets/images/resources/intro-style1-2.jpg"
                            alt=""
                          />
                        </div>
                        <div className="overlay-text">
                          <h3>Our Team</h3>
                        </div>
                      </div>
                      <div className="title-box">
                        <h3>
                          <a href="#">
                            Passion &amp; Professional Finance Management...
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/*End Intro Style1 Single Box*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Intro Style1 Area*/}
      {/*Start Features Style1 Area*/}
      <section className="features-style1-area">
        <div className="container">
          <div className="sec-title text-center">
            <h2>Ashwatthama for a Better Tomorrow</h2>
            <hr />
            <div className="sub-title">
              <p className="text-danger">
                Committed to be on our customers succeess.
              </p>
            </div>
          </div>
          <div className="features-style1-content">
            <ul className="clearfix">
              {/*Start Single Features Style1 Box*/}
              <li>
                <div className="single-features-style1-box">
                  <div className="shape-left">
                    <img src="assets/images/shapes/shape-1.png" alt="" />
                  </div>
                  <div className="shape-bottom">
                    <img src="assets/images/shapes/shape-2.png" alt="" />
                  </div>
                  <div className="counting-box">
                    <div
                      className="counting-box-bg"
                      style={{
                        backgroundImage:
                          "url(assets/images/shapes/counting-box-bg.png)",
                      }}
                    />
                    <h3>01</h3>
                  </div>
                  <div className="text-box">
                    <h4>Fixed Depost</h4>
                    <h3>Fixed Returns with Peace of Mind</h3>
                    <p>
                      Regular FD, Cumulative FD, Non-Cumulative FD, Tax-Saving
                      FD, etc.
                    </p>
                    <div className="btn-box">
                      <a href="#">
                        Read More <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              {/*End Single Features Style1 Box*/}
              {/*Start Single Features Style1 Box*/}
              <li>
                <div className="single-features-style1-box">
                  <div className="shape-left">
                    <img src="assets/images/shapes/shape-1.png" alt="" />
                  </div>
                  <div className="shape-bottom">
                    <img src="assets/images/shapes/shape-2.png" alt="" />
                  </div>
                  <div className="counting-box">
                    <div
                      className="counting-box-bg"
                      style={{
                        backgroundImage:
                          "url(assets/images/shapes/counting-box-bg.png)",
                      }}
                    />
                    <h3>02</h3>
                  </div>
                  <div className="text-box">
                    <h4>Savings Account</h4>
                    <h3>Our Strategies for Better Returns</h3>
                    <p>
                      Savings Accounts are designed to provide a safe and
                      convenient place to deposit savings, helping to promote
                      financial inclusion and improve access to financial
                      services..
                    </p>
                    <div className="btn-box">
                      <a href="#">
                        Read More <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              {/*End Single Features Style1 Box*/}
              {/*Start Single Features Style1 Box*/}
              <li>
                <div className="single-features-style1-box">
                  <div className="shape-left">
                    <img src="assets/images/shapes/shape-1.png" alt="" />
                  </div>
                  <div className="shape-bottom">
                    <img src="assets/images/shapes/shape-2.png" alt="" />
                  </div>
                  <div className="counting-box">
                    <div
                      className="counting-box-bg"
                      style={{
                        backgroundImage:
                          "url(assets/images/shapes/counting-box-bg.png)",
                      }}
                    />
                    <h3>03</h3>
                  </div>
                  <div className="text-box">
                    <h4>Business Account</h4>
                    <h3>Banking Solutions for a Business</h3>
                    <p>
                      Business Account specifically designed for businesses,
                      organizations, and entrepreneurs to manage their financial
                      transactions.
                    </p>
                    <div className="btn-box">
                      <a href="#">
                        Read More <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              {/*End Single Features Style1 Box*/}
            </ul>
          </div>
        </div>
      </section>
      {/*End Features Style1 Area*/}
      {/*Start Account Steps Style2 Area*/}
      <section className="account-steps-style2-area">
        <div className="container">
          <div className="sec-title text-center">
            <h2>Your Account in Easy Steps</h2>
            <div className="sub-title">
              <p>We show our value by serving faithfully.</p>
            </div>
          </div>
          <div className="row">
            {/*Start Single Account Box style2*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-account-steps-box-style2">
                <div className="inner">
                  <div className="step-box">
                    <h4>Step 01</h4>
                  </div>
                  <div className="icon-holder">
                    <span className="icon-consultation" />
                  </div>
                  <h3>
                    <a href="#">
                      Consult With Our <br /> Experts
                    </a>
                  </h3>
                  {/*div class="text">
                              <p>The claims off duty or the obligations business it will frequently occur.</p>
                          </div*/}
                </div>
              </div>
            </div>
            {/*End Single Account Box style2*/}
            {/*Start Single Account Box style2*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-account-steps-box-style2 bg2">
                <div className="inner">
                  <div className="step-box">
                    <h4>Step 02</h4>
                  </div>
                  <div className="icon-holder">
                    <span className="icon-file" />
                  </div>
                  <h3>
                    <a href="#">
                      Submit Required <br /> Documents
                    </a>
                  </h3>
                  {/*div class="text">
                              <p>Toil and pain cases are perfectly simple and easy to all our distinguish.</p>
                          </div*/}
                </div>
              </div>
            </div>
            {/*End Single Account Box style2*/}
            {/*Start Single Account Box style2*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-account-steps-box-style2 bg3">
                <div className="inner">
                  <div className="step-box">
                    <h4>Step 03</h4>
                  </div>
                  <div className="icon-holder">
                    <span className="icon-file-1" />
                  </div>
                  <h3>
                    <a href="#">
                      KYC <br /> Verification
                    </a>
                  </h3>
                  {/*div class="text">
                              <p>The claims off duty or the obligations business it will frequently occur.</p>
                          </div*/}
                </div>
              </div>
            </div>
            {/*End Single Account Box style2*/}
            {/*Start Single Account Box style2*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-account-steps-box-style2 bg4">
                <div className="inner">
                  <div className="step-box">
                    <h4>Step 04</h4>
                  </div>
                  <div className="icon-holder">
                    <span className="icon-investment" />
                  </div>
                  <h3>
                    <a href="#">
                      Start Savings for <br /> Your Future
                    </a>
                  </h3>
                  {/*div class="text">
                              <p>Toil and pain cases are perfectly simple and easy to all our distinguish.</p>
                          </div*/}
                </div>
              </div>
            </div>
            {/*End Single Account Box style2*/}
          </div>
        </div>
      </section>
      {/*End Account Steps Style2 Area*/}
      {/*Start Service Style1 Area*/}
      <section id="service" className="service-style1-area">
        <div
          className="service-style1-bg"
          style={{
            backgroundImage:
              "url(assets/images/backgrounds/service-style1.jpg)",
          }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="service-style1-title">
                <div className="sec-title">
                  <h2>Banking For Your Needs</h2>
                  <div className="sub-title">
                    <p>The bank that builds better relationships.</p>
                  </div>
                </div>
                <div className="get-assistant-box">
                  <a href="#">
                    <span className="icon-chatting" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="service-style1-tab">
                {/*Start Service Style1 Tab Button*/}
                <div className="service-style1-tab__button">
                  <ul className="tabs-button-box clearfix">
                    <li data-tab="#individuals" className="tab-btn-item">
                      <div className="inner">
                        <div className="left">
                          <h4>Banking for</h4>
                          <h3>Savings Account</h3>
                        </div>
                        <div className="right">
                          <span className="icon-down-arrow" />
                        </div>
                      </div>
                    </li>
                    <li
                      data-tab="#companies"
                      className="tab-btn-item active-btn-item"
                    >
                      <div className="inner">
                        <div className="left">
                          <h4>Banking for</h4>
                          <h3>Fixed Deposit Account</h3>
                        </div>
                        <div className="right">
                          <span className="icon-down-arrow" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/*End Service Style1 Tab Button*/}
                {/*Start Tabs Content Box*/}
                <div className="tabs-content-box">
                  {/*Tab*/}
                  <div className="tab-content-box-item" id="individuals">
                    <div className="service-style1-tab-content-box-item">
                      <div className="row">
                        {/*Start Single Service Box Style1*/}
                        <div className="col-xl-4 col-lg-4">
                          <div className="single-service-box-style1">
                            <div className="icon">
                              <span className="icon-safebox" />
                            </div>
                            <h3>
                              <a href="#">Low Minimum Balance</a>
                            </h3>
                            <div className="border-box" />
                            <p>
                              Take trivial example which of us ever all
                              undertakes laborious.
                            </p>
                            <h6>
                              <span>*</span> Interest rate up to 5% p.a
                            </h6>
                            <div className="btn-box">
                              <a href="#">
                                <span className="icon-right-arrow" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*End Single Service Box Style1*/}
                        {/*Start Single Service Box Style1*/}
                        <div className="col-xl-4 col-lg-4">
                          <div className="single-service-box-style1">
                            <div className="icon">
                              <span className="icon-online" />
                            </div>
                            <h3>
                              <a href="#">Online &amp; Mobile Banking</a>
                            </h3>
                            <div className="border-box" />
                            <p>
                              Access your Savings Bank Account using your online
                              banking portal and mobile banking.
                            </p>
                            <h6>
                              <span>*</span> Terms &amp; Conditions
                            </h6>
                            <div className="btn-box">
                              <a href="#">
                                <span className="icon-right-arrow" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*End Single Service Box Style1*/}
                        {/*Start Single Service Box Style1*/}
                        <div className="col-xl-4 col-lg-4">
                          <div className="single-service-box-style1">
                            <div className="icon">
                              <span className="icon-loan" />
                            </div>
                            <h3>
                              <a href="#">Exclusive Debit Card</a>
                            </h3>
                            <div className="border-box" />
                            <p>
                              Avail exclusive debit card and better annual
                              interest rate.
                            </p>
                            <h6>
                              <span>*</span> Check today’s Interest Rates
                            </h6>
                            <div className="btn-box">
                              <a href="#">
                                <span className="icon-right-arrow" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*End Single Service Box Style1*/}
                      </div>
                    </div>
                  </div>
                  {/*Tab*/}
                  <div
                    className="tab-content-box-item tab-content-box-item-active"
                    id="companies"
                  >
                    <div className="service-style1-tab-content-box-item">
                      <div className="row">
                        {/*Start Single Service Box Style1*/}
                        <div className="col-xl-3 col-lg-3">
                          <div className="single-service-box-style1">
                            <div className="icon">
                              <span className="icon-safebox" />
                            </div>
                            <h3>
                              <a href="#">Regular Fixed Deposit</a>
                            </h3>
                            <div className="border-box" />
                            <p>
                              A standard FD with a fixed tenure and interest
                              payout.
                            </p>
                            <h6>
                              <span>*</span> Interest rate up to 5% p.a
                            </h6>
                            <div className="btn-box">
                              <a href="#">
                                <span className="icon-right-arrow" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*End Single Service Box Style1*/}
                        {/*Start Single Service Box Style1*/}
                        <div className="col-xl-3 col-lg-3">
                          <div className="single-service-box-style1">
                            <div className="icon">
                              <span className="icon-online" />
                            </div>
                            <h3>
                              <a href="#">Cumulative FD</a>
                            </h3>
                            <div className="border-box" />
                            <p>
                              Interest is compounded quarterly or annually and
                              paid out only at maturity
                            </p>
                            <h6>
                              <span>*</span> Terms &amp; Conditions
                            </h6>
                            <div className="btn-box">
                              <a href="#">
                                <span className="icon-right-arrow" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*End Single Service Box Style1*/}
                        {/*Start Single Service Box Style1*/}
                        <div className="col-xl-3 col-lg-4">
                          <div className="single-service-box-style1">
                            <div className="icon">
                              <span className="icon-loan" />
                            </div>
                            <h3>
                              <a href="#">Non-Cumulative FD</a>
                            </h3>
                            <div className="border-box" />
                            <p>
                              Interest is paid out regularly, such as monthly,
                              quarterly, or annually.
                            </p>
                            <h6>
                              <span>*</span> Terms &amp; Conditions
                            </h6>
                            <div className="btn-box">
                              <a href="#">
                                <span className="icon-right-arrow" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*End Single Service Box Style1*/}
                        {/*Start Single Service Box Style1*/}
                        <div className="col-xl-3 col-lg-4">
                          <div className="single-service-box-style1">
                            <div className="icon">
                              <span className="icon-loan" />
                            </div>
                            <h3>
                              <a href="#">Tax-Saving FD</a>
                            </h3>
                            <div className="border-box" />
                            <p>
                              A special FD that qualifies for tax deduction
                              under Section 80C of the Income Tax Act.
                            </p>
                            <h6>
                              <span>*</span> Check today’s Interest Rates
                            </h6>
                            <div className="btn-box">
                              <a href="#">
                                <span className="icon-right-arrow" />
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*End Single Service Box Style1*/}
                      </div>
                    </div>
                  </div>
                </div>
                {/*End Tabs Content Box*/}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="service-style1__btns-box text-center">
                <a className="btn-one" href="#">
                  <span className="txt">View All Services</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Service Style1 Area*/}
      {/*Start Features Style3 Area*/}
      <section className="features-style3-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="features-style3-img-box">
                <div className="inner-img">
                  <img
                    className="paroller"
                    src="assets/images/resources/features-style3-img.png"
                    alt=""
                  />
                </div>
                <div className="icon-holder float-bob-y">
                  <span className="icon-interest-rate" />
                </div>
                <div className="icon-holder two">
                  <span className="icon-online-shop" />
                </div>
                <div className="icon-holder three">
                  <span className="icon-theater" />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="features-style3-content">
                <div className="sec-title">
                  <h2>
                    Personalize Your
                    <br /> Card and Stand Out
                    <br /> From Crowd
                  </h2>
                  <div className="sub-title">
                    <p>
                      Desire that they cannot foresee the pain &amp; trouble
                      that are bound too ensue equal blame belongs through
                      shrinking.
                    </p>
                  </div>
                </div>
                <div className="text-box">
                  <ul>
                    <li>
                      <div className="icon">
                        <span className="icon-checkbox-mark" />
                      </div>
                      <p>Swipe in and Swipe Out in any ATM in India</p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-checkbox-mark" />
                      </div>
                      <p>Explore and use as and when required</p>
                    </li>
                  </ul>
                  <div className="apply-credit-card">
                    <h3>Apply for your Exclusive Card</h3>
                    <form
                      id="apply-credit-card"
                      name="apply-credit-card"
                      action="#"
                      method="post"
                    >
                      <div className="input-box">
                        <input
                          type="text"
                          name="form_name"
                          defaultValue=""
                          placeholder="Name"
                          required=""
                        />
                      </div>
                      <div className="button-box">
                        <button
                          className="btn-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span className="txt">Apply Now</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Features Style3 Area*/}
      {/* Start App Download Area*/}
      <section className="app-download-area">
        <div
          className="app-download-area-bg"
          style={{
            backgroundImage: "url(assets/images/resources/app-download-1.jpg)",
          }}
        />
        <div className="container">
          <div className="sec-title text-center">
            <h2>Open Your Account in 5 Mins</h2>
            <div className="sub-title">
              <p>
                Imaging reaching your goals faster with the help
                <br /> of our banking tools.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="app-download-content">
                <p>Available for Android and IOS.</p>
                <div className="btn-box">
                  <div className="get-app-box">
                    <ul className="clearfix">
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
            </div>
          </div>
        </div>
      </section>
      {/* End App Download Area*/}
      {/*Start Blog Style2 Area*/}
      <section id="news" className="blog-style2-area pdb60">
        <div className="container">
          <div className="sec-title text-center">
            <h2>Latest From News Room</h2>
            <div className="sub-title">
              <p>Our blog post provides you all the updates &amp; guides.</p>
            </div>
          </div>
          <div className="row">
            {/*Start Single blog Style2*/}
            <div className="col-xl-6">
              <div className="single-blog-style1 single-blog-style1--style2">
                <div className="img-holder">
                  <div className="inner">
                    <img src="assets/images/blog/blog-v2-1.jpg" alt="" />
                    <div className="overlay-icon">
                      <a href="#">
                        <span className="icon-right-arrow" />
                      </a>
                    </div>
                  </div>
                  <div className="category-date-box">
                    <div className="category">
                      <span className="icon-play-button-1" />
                      <h5>Banking</h5>
                    </div>
                    <div className="date">
                      <h5>May 29, 2022</h5>
                    </div>
                    <div className="author">
                      <h5>
                        By <a href="#">Henry Theo</a>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="text-holder">
                  <h3 className="blog-title">
                    <a href="#">
                      How NRI Citizens can Open
                      <br /> a Bank Account
                    </a>
                  </h3>
                  <div className="bottom">
                    <div className="read-more-btn">
                      <a href="#">
                        <span className="icon-right-arrow" />
                        Read More
                      </a>
                    </div>
                    <div className="meta-box">
                      <ul className="meta-info">
                        <li>
                          <span className="icon-clock" />{" "}
                          <a href="#">6 Mins Read</a>
                        </li>
                        <li>
                          <span className="icon-comment" />{" "}
                          <a href="#">10 Cmnts</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End Single blog Style2*/}
            {/*Start Single blog Style2*/}
            <div className="col-xl-6">
              <div className="single-blog-style1 single-blog-style1--style2">
                <div className="img-holder">
                  <div className="inner">
                    <img src="assets/images/blog/blog-v2-2.jpg" alt="" />
                    <div className="overlay-icon">
                      <a href="#">
                        <span className="icon-right-arrow" />
                      </a>
                    </div>
                  </div>
                  <div className="category-date-box">
                    <div className="category">
                      <span className="icon-play-button-1" />
                      <h5>Press Release</h5>
                    </div>
                    <div className="date">
                      <h5>May 25, 2022</h5>
                    </div>
                    <div className="author">
                      <h5>
                        By <a href="#">Roman Frederick</a>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="text-holder">
                  <h3 className="blog-title">
                    <a href="#">Fixed Deposit and it's benefits.</a>
                  </h3>
                  <div className="bottom">
                    <div className="read-more-btn">
                      <a href="#">
                        <span className="icon-right-arrow" />
                        Read More
                      </a>
                    </div>
                    <div className="meta-box">
                      <ul className="meta-info">
                        <li>
                          <span className="icon-clock" />{" "}
                          <a href="#">6 Mins Read</a>
                        </li>
                        <li>
                          <span className="icon-comment" />{" "}
                          <a href="#">10 Cmnts</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End Single blog Style2*/}
          </div>
        </div>
      </section>
      {/*End Blog Style2 Area*/}
      {/*Start Features Style2 Area*/}
      <section className="features-style2-area">
        <div className="container">
          <div className="sec-title text-center">
            <h2>Service Requests</h2>
            <div className="sub-title">
              <p>List of banking service requests all in one place.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="features-style2-content">
                {/*Start Features Style2 Tab*/}
                <div className="features-style2-tab">
                  {/*Start Features Style2 Tab Button*/}
                  <div className="features-style2-tab__button">
                    <ul
                      className="owl-carousel owl-theme thm-owl__carousel features-style2-carousel owl-nav-style-one tabs-button-box"
                      data-owl-options='{
                                          "loop": false,
                                          "autoplay": false,
                                          "margin": 0,
                                          "nav": true,
                                          "dots": false,
                                          "smartSpeed": 500,
                                          "autoplayTimeout": 10000,
                                          "navText": ["<span class=\"left icon-right-arrow\"></span>","<span class=\"right icon-right-arrow\"></span>"],
                                          "responsive": {
                                                  "0": {
                                                      "items": 1
                                                  },
                                                  "768": {
                                                      "items": 2
                                                  },
                                                  "992": {
                                                      "items": 3
                                                  },
                                                  "1200": {
                                                      "items": 4
                                                  }
                                              }
                                          }'
                    >
                      <li
                        data-tab="#tabid11"
                        className="tab-btn-item active-btn-item clearfix"
                      >
                        <div className="single-features-box-style2">
                          <div className="icon">
                            <span className="icon-credit-card" />
                          </div>
                          <div className="title">
                            <h3>
                              <a href="#">
                                Credit / Debit Card
                                <br /> Related
                              </a>
                            </h3>
                          </div>
                          <div className="arrow-button">
                            <a href="#">
                              <span className="icon-chevron" />
                            </a>
                          </div>
                        </div>
                      </li>
                      <li data-tab="#tabid22" className="tab-btn-item clearfix">
                        <div className="single-features-box-style2">
                          <div className="icon">
                            <span className="icon-computer" />
                          </div>
                          <div className="title">
                            <h3>
                              <a href="#">
                                Mobile / Internet
                                <br /> Banking
                              </a>
                            </h3>
                          </div>
                          <div className="arrow-button">
                            <a href="#">
                              <span className="icon-chevron" />
                            </a>
                          </div>
                        </div>
                      </li>
                      <li data-tab="#tabid33" className="tab-btn-item clearfix">
                        <div className="single-features-box-style2">
                          <div className="icon">
                            <span className="icon-book" />
                          </div>
                          <div className="title">
                            <h3>
                              <a href="#">
                                Account Details
                                <br /> Changing
                              </a>
                            </h3>
                          </div>
                          <div className="arrow-button">
                            <a href="#">
                              <span className="icon-chevron" />
                            </a>
                          </div>
                        </div>
                      </li>
                      <li data-tab="#tabid44" className="tab-btn-item clearfix">
                        <div className="single-features-box-style2">
                          <div className="icon">
                            <span className="icon-check-book" />
                          </div>
                          <div className="title">
                            <h3>
                              <a href="#">
                                Cheque Book / DD
                                <br /> Related
                              </a>
                            </h3>
                          </div>
                          <div className="arrow-button">
                            <a href="#">
                              <span className="icon-chevron" />
                            </a>
                          </div>
                        </div>
                      </li>
                      <li data-tab="#tabid55" className="tab-btn-item clearfix">
                        <div className="single-features-box-style2">
                          <div className="icon">
                            <span className="icon-credit-card" />
                          </div>
                          <div className="title">
                            <h3>
                              <a href="#">
                                Credit / Debit Card
                                <br /> Related
                              </a>
                            </h3>
                          </div>
                          <div className="arrow-button">
                            <a href="#">
                              <span className="icon-chevron" />
                            </a>
                          </div>
                        </div>
                      </li>
                      <li data-tab="#tabid66" className="tab-btn-item clearfix">
                        <div className="single-features-box-style2">
                          <div className="icon">
                            <span className="icon-computer" />
                          </div>
                          <div className="title">
                            <h3>
                              <a href="#">
                                Mobile / Internet
                                <br /> Banking
                              </a>
                            </h3>
                          </div>
                          <div className="arrow-button">
                            <a href="#">
                              <span className="icon-chevron" />
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/*End Features Style2 Tab Button*/}
                  {/*Start Tabs Content Box*/}
                  <div className="tabs-content-box">
                    {/*Tab*/}
                    <div
                      className="tab-content-box-item tab-content-box-item-active"
                      id="tabid11"
                    >
                      <div className="features-style2-tab-content-box-item">
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="features-style2-text-box">
                              <ul>
                                <li>
                                  <a href="#">
                                    Block Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Generate Debit Card Pin Number
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Unlock Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Reissue Lost Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="features-style2-banner-box">
                              <div className="text-box">
                                <div
                                  className="owl-carousel owl-theme thm-owl__carousel features-style2-banner-carousel owl-dot-style2"
                                  data-owl-options='{
                                                                  "loop": true,
                                                                  "autoplay": false,
                                                                  "margin": 0,
                                                                  "nav": false,
                                                                  "dots": true,
                                                                  "smartSpeed": 500,
                                                                  "autoplayTimeout": 10000,
                                                                  "navText": ["<span class=\"left icon-right-arrow\"></span>","<span class=\"right icon-right-arrow\"></span>"],
                                                                  "responsive": {
                                                                          "0": {
                                                                              "items": 1
                                                                          },
                                                                          "768": {
                                                                              "items": 1
                                                                          },
                                                                          "992": {
                                                                              "items": 1
                                                                          },
                                                                          "1200": {
                                                                              "items": 1
                                                                          }
                                                                      }
                                                                  }'
                                >
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                </div>
                              </div>
                              <div className="img-box">
                                <div
                                  className="img-box-bg"
                                  style={{
                                    backgroundImage:
                                      "url(assets/images/resources/features-style2-banner-1.jpg)",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Tab*/}
                    <div className="tab-content-box-item" id="tabid22">
                      <div className="features-style2-tab-content-box-item">
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="features-style2-text-box">
                              <ul>
                                <li>
                                  <a href="#">
                                    Mobile / Internet Banking
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Generate Debit Card Pin Number
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Unlock Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Reissue Lost Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="features-style2-banner-box">
                              <div className="text-box">
                                <div
                                  className="owl-carousel owl-theme thm-owl__carousel features-style2-banner-carousel owl-dot-style2"
                                  data-owl-options='{
                                                                  "loop": true,
                                                                  "autoplay": false,
                                                                  "margin": 0,
                                                                  "nav": false,
                                                                  "dots": true,
                                                                  "smartSpeed": 500,
                                                                  "autoplayTimeout": 10000,
                                                                  "navText": ["<span class=\"left icon-right-arrow\"></span>","<span class=\"right icon-right-arrow\"></span>"],
                                                                  "responsive": {
                                                                          "0": {
                                                                              "items": 1
                                                                          },
                                                                          "768": {
                                                                              "items": 1
                                                                          },
                                                                          "992": {
                                                                              "items": 1
                                                                          },
                                                                          "1200": {
                                                                              "items": 1
                                                                          }
                                                                      }
                                                                  }'
                                >
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                </div>
                              </div>
                              <div className="img-box">
                                <div
                                  className="img-box-bg"
                                  style={{
                                    backgroundImage:
                                      "url(assets/images/resources/features-style2-banner-2.jpg)",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Tab*/}
                    <div className="tab-content-box-item" id="tabid33">
                      <div className="features-style2-tab-content-box-item">
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="features-style2-text-box">
                              <ul>
                                <li>
                                  <a href="#">
                                    Account Details Changing
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Unlock Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Generate Debit Card Pin Number
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Reissue Lost Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="features-style2-banner-box">
                              <div className="text-box">
                                <div
                                  className="owl-carousel owl-theme thm-owl__carousel features-style2-banner-carousel owl-dot-style2"
                                  data-owl-options='{
                                                                  "loop": true,
                                                                  "autoplay": false,
                                                                  "margin": 0,
                                                                  "nav": false,
                                                                  "dots": true,
                                                                  "smartSpeed": 500,
                                                                  "autoplayTimeout": 10000,
                                                                  "navText": ["<span class=\"left icon-right-arrow\"></span>","<span class=\"right icon-right-arrow\"></span>"],
                                                                  "responsive": {
                                                                          "0": {
                                                                              "items": 1
                                                                          },
                                                                          "768": {
                                                                              "items": 1
                                                                          },
                                                                          "992": {
                                                                              "items": 1
                                                                          },
                                                                          "1200": {
                                                                              "items": 1
                                                                          }
                                                                      }
                                                                  }'
                                >
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                </div>
                              </div>
                              <div className="img-box">
                                <div
                                  className="img-box-bg"
                                  style={{
                                    backgroundImage:
                                      "url(assets/images/resources/features-style2-banner-3.jpg)",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Tab*/}
                    <div className="tab-content-box-item" id="tabid44">
                      <div className="features-style2-tab-content-box-item">
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="features-style2-text-box">
                              <ul>
                                <li>
                                  <a href="#">
                                    Cheque Book / DD Related
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Reissue Lost Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Unlock Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Generate Debit Card Pin Number
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="features-style2-banner-box">
                              <div className="text-box">
                                <div
                                  className="owl-carousel owl-theme thm-owl__carousel features-style2-banner-carousel owl-dot-style2"
                                  data-owl-options='{
                                                                  "loop": true,
                                                                  "autoplay": false,
                                                                  "margin": 0,
                                                                  "nav": false,
                                                                  "dots": true,
                                                                  "smartSpeed": 500,
                                                                  "autoplayTimeout": 10000,
                                                                  "navText": ["<span class=\"left icon-right-arrow\"></span>","<span class=\"right icon-right-arrow\"></span>"],
                                                                  "responsive": {
                                                                          "0": {
                                                                              "items": 1
                                                                          },
                                                                          "768": {
                                                                              "items": 1
                                                                          },
                                                                          "992": {
                                                                              "items": 1
                                                                          },
                                                                          "1200": {
                                                                              "items": 1
                                                                          }
                                                                      }
                                                                  }'
                                >
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                </div>
                              </div>
                              <div className="img-box">
                                <div
                                  className="img-box-bg"
                                  style={{
                                    backgroundImage:
                                      "url(assets/images/resources/features-style2-banner-4.jpg)",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Tab*/}
                    <div className="tab-content-box-item" id="tabid55">
                      <div className="features-style2-tab-content-box-item">
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="features-style2-text-box">
                              <ul>
                                <li>
                                  <a href="#">
                                    Cheque Book / DD Related
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Reissue Lost Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Unlock Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Generate Debit Card Pin Number
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="features-style2-banner-box">
                              <div className="text-box">
                                <div
                                  className="owl-carousel owl-theme thm-owl__carousel features-style2-banner-carousel owl-dot-style2"
                                  data-owl-options='{
                                                                  "loop": true,
                                                                  "autoplay": false,
                                                                  "margin": 0,
                                                                  "nav": false,
                                                                  "dots": true,
                                                                  "smartSpeed": 500,
                                                                  "autoplayTimeout": 10000,
                                                                  "navText": ["<span class=\"left icon-right-arrow\"></span>","<span class=\"right icon-right-arrow\"></span>"],
                                                                  "responsive": {
                                                                          "0": {
                                                                              "items": 1
                                                                          },
                                                                          "768": {
                                                                              "items": 1
                                                                          },
                                                                          "992": {
                                                                              "items": 1
                                                                          },
                                                                          "1200": {
                                                                              "items": 1
                                                                          }
                                                                      }
                                                                  }'
                                >
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                </div>
                              </div>
                              <div className="img-box">
                                <div
                                  className="img-box-bg"
                                  style={{
                                    backgroundImage:
                                      "url(assets/images/resources/features-style2-banner-1.jpg)",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Tab*/}
                    <div className="tab-content-box-item" id="tabid66">
                      <div className="features-style2-tab-content-box-item">
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="features-style2-text-box">
                              <ul>
                                <li>
                                  <a href="#">
                                    Cheque Book / DD Related
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Reissue Lost Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Unlock Debit / ATM Card
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    Generate Debit Card Pin Number
                                    <span className="icon-right-arrow" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="features-style2-banner-box">
                              <div className="text-box">
                                <div
                                  className="owl-carousel owl-theme thm-owl__carousel features-style2-banner-carousel owl-dot-style2"
                                  data-owl-options='{
                                                                  "loop": true,
                                                                  "autoplay": false,
                                                                  "margin": 0,
                                                                  "nav": false,
                                                                  "dots": true,
                                                                  "smartSpeed": 500,
                                                                  "autoplayTimeout": 10000,
                                                                  "navText": ["<span class=\"left icon-right-arrow\"></span>","<span class=\"right icon-right-arrow\"></span>"],
                                                                  "responsive": {
                                                                          "0": {
                                                                              "items": 1
                                                                          },
                                                                          "768": {
                                                                              "items": 1
                                                                          },
                                                                          "992": {
                                                                              "items": 1
                                                                          },
                                                                          "1200": {
                                                                              "items": 1
                                                                          }
                                                                      }
                                                                  }'
                                >
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                  {/*Start Single Item*/}
                                  <div className="single-item">
                                    <span className="icon-headphones" />
                                    <h4>Call for</h4>
                                    <h3>Private Banking</h3>
                                    <h2>
                                      <a href="tel:2512353256">
                                        +8 (222) 123 456 78
                                      </a>
                                    </h2>
                                  </div>
                                  {/*End Single Item*/}
                                </div>
                              </div>
                              <div className="img-box">
                                <div
                                  className="img-box-bg"
                                  style={{
                                    backgroundImage:
                                      "url(assets/images/resources/features-style2-banner-1.jpg)",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*End Tabs Content Box*/}
                </div>
                {/*End Features Style2 Tab*/}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Features Style2 Area*/}
    </>
  );
};

export default ContactPage;
