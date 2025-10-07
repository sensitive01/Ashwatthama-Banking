import React from "react";

const AboutPage = () => {
  return (
    <>
      <div className="stricky-header stricked-menu main-menu">
        <div className="sticky-header__content" />
        {/* /.sticky-header__content */}
      </div>
      {/* /.stricky-header */}
      {/*Start breadcrumb area*/}
      <section className="breadcrumb-area">
        <div
          className="breadcrumb-area-bg"
          style={{ backgroundImage: "url(assets/images/resources/about.png)" }}
        />
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content">
                <div
                  className="title"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <h2>About Ashwatthama Core Banking Services</h2>
                </div>
                <div
                  className="breadcrumb-menu"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <ul>
                    <li>
                      <a href="/home">Home</a>
                    </li>
                    <li className="active">About Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End breadcrumb area*/}
      {/*Start Intro Style1 Area*/}
      <section className="intro-style1-area">
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
                  <hr />
                  <h2>
                    Known for Trust,
                    <br /> Honesty &amp; Customer
                    <br /> Support
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
      {/*Start Choose Style1 Area*/}
      <section className="choose-style1-area">
        <div className="container">
          <ul className="row choose-style1__content">
            {/*Start Single Choose Style1*/}
            <li className="col-xl-4 col-lg-4 single-choose-style1-colum text-center">
              <div className="single-choose-style1">
                <div className="icon">
                  <div className="icon-inner">
                    <span className="icon-crowd" />
                  </div>
                  <div className="counting">01</div>
                </div>
                <div className="text">
                  <h3>Community</h3>
                </div>
              </div>
            </li>
            {/*End Single Choose Style1*/}
            {/*Start Single Choose Style1*/}
            <li className="col-xl-4 col-lg-4 single-choose-style1-colum text-center">
              <div className="single-choose-style1">
                <div className="icon">
                  <div className="icon-inner">
                    <span className="icon-commitment" />
                  </div>
                  <div className="counting">02</div>
                </div>
                <div className="text">
                  <h3>Commitment</h3>
                </div>
              </div>
            </li>
            {/*End Single Choose Style1*/}
            {/*Start Single Choose Style1*/}
            <li className="col-xl-4 col-lg-4 single-choose-style1-colum text-center">
              <div className="single-choose-style1">
                <div className="icon">
                  <div className="icon-inner">
                    <span className="icon-consistency" />
                  </div>
                  <div className="counting">03</div>
                </div>
                <div className="text">
                  <h3>Consistency</h3>
                </div>
              </div>
            </li>
            {/*End Single Choose Style1*/}
          </ul>
        </div>
      </section>
      {/*End Choose Style1 Area*/}
      {/*Start Statements Area*/}
      <section className="statements-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="statements-content-box">
                <ul>
                  <li>
                    <div className="single-statements-box">
                      <div className="img-box">
                        <img
                          src="assets/images/resources/statements-1.jpg"
                          alt=""
                        />
                        <div className="static-content">
                          <h2>Mission</h2>
                        </div>
                        <div className="overlay-content">m</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-statements-box">
                      <div className="img-box">
                        <img
                          src="assets/images/resources/statements-2.jpg"
                          alt=""
                        />
                        <div className="static-content">
                          <h2>Vision</h2>
                        </div>
                        <div className="overlay-content">v</div>
                      </div>
                    </div>
                    <div className="single-statements-box">
                      <div className="img-box">
                        <img
                          src="assets/images/resources/statements-3.jpg"
                          alt=""
                        />
                        <div className="static-content">
                          <h2>Core Value</h2>
                        </div>
                        <div className="overlay-content">c</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="statements-text-box">
                <div className="shape">
                  <span className="icon-origami" />
                </div>
                <div className="inner-title">
                  <h2>
                    A Great
                    <br /> Mission Statement
                  </h2>
                </div>
                <div className="text" align="justify">
                  <p>
                    Our mission is to provide accessible, reliable, and
                    innovative financial solutions that empower individuals,
                    families, and businesses to achieve their financial goals.
                    We are committed to fostering long-term relationships built
                    on trust, transparency, and exceptional service, while
                    promoting financial inclusion and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Statements Area*/}
      {/*Start Facts Area*/}
      <section className="facts-area">
        <div
          className="facts-area-bg"
          style={{
            backgroundImage: "url(assets/images/backgrounds/facts-area-bg.jpg)",
          }}
        ></div>
        <div className="container">
          <div className="sec-title text-center">
            <h2>Few Interesting Numbers</h2>
            <div className="sub-title">
              <p>Numbers that speak about banking service.</p>
            </div>
          </div>
          <div className="row">
            {/*Start Single Fact Box*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-fact-box">
                <div className="icon">
                  <span className="icon-bank">
                    <span className="path1" />
                    <span className="path2" />
                    <span className="path3" />
                    <span className="path4" />
                    <span className="path5" />
                    <span className="path6" />
                    <span className="path7" />
                    <span className="path8" />
                    <span className="path9" />
                    <span className="path10" />
                    <span className="path11" />
                    <span className="path12" />
                    <span className="path13" />
                    <span className="path14" />
                    <span className="path15" />
                    <span className="path16" />
                  </span>
                </div>
                <div className="text">
                  <h3>Our Network</h3>
                  <p>86 Branches around the country</p>
                </div>
              </div>
            </div>
            {/*End Single Fact Box*/}
            {/*Start Single Fact Box*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-fact-box">
                <div className="icon">
                  <span className="icon-expert">
                    <span className="path1" />
                    <span className="path2" />
                  </span>
                </div>
                <div className="text">
                  <h3>Customers</h3>
                  <p>More than 1.5 illion customers</p>
                </div>
              </div>
            </div>
            {/*End Single Fact Box*/}
            {/*Start Single Fact Box*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-fact-box">
                <div className="icon">
                  <span className="icon-human">
                    <span className="path1" />
                    <span className="path2" />
                    <span className="path3" />
                    <span className="path4" />
                    <span className="path5" />
                    <span className="path6" />
                    <span className="path7" />
                    <span className="path8" />
                    <span className="path9" />
                    <span className="path10" />
                    <span className="path11" />
                    <span className="path12" />
                    <span className="path13" />
                    <span className="path14" />
                    <span className="path15" />
                  </span>
                </div>
                <div className="text">
                  <h3>Employee</h3>
                  <p>1.6k professional employees</p>
                </div>
              </div>
            </div>
            {/*End Single Fact Box*/}
            {/*Start Single Fact Box*/}
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-fact-box">
                <div className="icon">
                  <span className="icon-money-bag">
                    <span className="path1" />
                    <span className="path2" />
                  </span>
                </div>
                <div className="text">
                  <h3>Loans Disbursed</h3>
                  <p>45.6 Cr loans for 258 customers</p>
                </div>
              </div>
            </div>
            {/*End Single Fact Box*/}
          </div>
        </div>
      </section>
      {/*End Facts Area*/}
      {/*Start Statistics Area*/}
      <section className="statistics-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="statistics-content-box">
                <div className="sec-title">
                  <h2>
                    Better Value
                    <br /> Banking Experience
                  </h2>
                </div>
                <br />
                <hr />
                <br />
                <div className="download-box">
                  <div className="icon">
                    <span className="icon-pdf" />
                  </div>
                  <div className="title">
                    <h5>
                      <a href="#">Download</a>
                    </h5>
                    <h3>Report for the Year 2021</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="statistics-chart">
                <img
                  src="assets/images/resources/statistics-chart.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Statistics Area*/}
      {/*Start Awards Achivements Area*/}
      <section
        className="awards-achivements-area"
        style={{ backgroundColor: "#f7f1eb" }}
      >
        <div className="container">
          <div className="sec-title text-center">
            <h2>Awards &amp; Major Achivements</h2>
            <div className="sub-title">
              <p>Outstanding performance and achievements.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4">
              <div className="awards-achivements-left-box">
                {/*Start single awards achivements box */}
                <div className="single-awards-achivements-box">
                  <div className="top">
                    <div className="icon">
                      <img src="assets/images/icon/award-1.png" alt="" />
                    </div>
                    <div className="inner-title">
                      <h3>
                        Bank of the Year
                        <br /> India
                      </h3>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <span>Year</span>
                      <b>:</b> 2020-2021
                    </li>
                    <li>
                      <span>Award by</span>
                      <b>:</b> Business Time
                    </li>
                  </ul>
                </div>
                {/*End single awards achivements box */}
                {/*Start single awards achivements box */}
                <div className="single-awards-achivements-box">
                  <div className="top">
                    <div className="icon">
                      <img src="assets/images/icon/award-1.png" alt="" />
                    </div>
                    <div className="inner-title">
                      <h3>
                        Best Commercial
                        <br /> Bank Award
                      </h3>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <span>Year</span>
                      <b>:</b> 2017-2018
                    </li>
                    <li>
                      <span>Award by</span>
                      <b>:</b> Business Time
                    </li>
                  </ul>
                </div>
                {/*End single awards achivements box */}
              </div>
            </div>
            <div className="col-xl-4">
              <div className="awards-img-box">
                <div className="round-box" />
                <div className="shape1">
                  <img
                    src="assets/images/resources/trophy-shape-1.png"
                    alt=""
                  />
                </div>
                <div className="shape2">
                  <img
                    src="assets/images/resources/trophy-shape-2.png"
                    alt=""
                  />
                </div>
                <div className="inner">
                  <img src="assets/images/resources/trophy.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="awards-achivements-right-box">
                {/*Start single awards achivements box */}
                <div className="single-awards-achivements-box">
                  <div className="top">
                    <div className="icon">
                      <img src="assets/images/icon/award-1.png" alt="" />
                    </div>
                    <div className="inner-title">
                      <h3>
                        Best Private Bank
                        <br /> Award
                      </h3>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <span>Year</span>
                      <b>:</b> 2018-2019
                    </li>
                    <li>
                      <span>Award by</span>
                      <b>:</b> Business Time
                    </li>
                  </ul>
                </div>
                {/*End single awards achivements box */}
                {/*Start single awards achivements box */}
                <div className="single-awards-achivements-box">
                  <div className="top">
                    <div className="icon">
                      <img src="assets/images/icon/award-1.png" alt="" />
                    </div>
                    <div className="inner-title">
                      <h3>
                        Banker’s Bank of the
                        <br /> Year Awards
                      </h3>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <span>Year</span>
                      <b>:</b> 2014-2015
                    </li>
                    <li>
                      <span>Award by</span>
                      <b>:</b> Business Time
                    </li>
                  </ul>
                </div>
                {/*End single awards achivements box */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Awards Achivements Area*/}
    </>
  );
};

export default AboutPage;
