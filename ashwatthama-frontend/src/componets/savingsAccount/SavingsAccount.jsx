import React from "react";

const SavingsAccount = () => {
  return (
    <>
      !--Start breadcrumb area--&gt;
      <section className="breadcrumb-area">
        <div
          className="breadcrumb-area-bg"
          style={{
            backgroundImage:
              "url(assets/images/backgrounds/breadcrumb-area-bg-3.jpg)",
          }}
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
                  <h2>Savings Account</h2>
                </div>
                <div
                  className="breadcrumb-menu"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <ul>
                    <li>
                      <a href="index.php">Home</a>
                    </li>
                    <li className="active">Savings Account</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End breadcrumb area*/}
      {/*Start Overview Area*/}
      <section className="overview-area">
        <div className="container">
          <div className="sec-title text-center">
            <h2>Get More From Your Money</h2>
            <div className="sub-title">
              <p>Access your money anytime and anywhere.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="overview-content-box-one">
                <ul className="clearfix">
                  <li>
                    <div className="single-overview-box">
                      <div className="icon">
                        <span className="icon-checkbox-mark" />
                      </div>
                      <div className="title">
                        <h3>
                          <a href="#">
                            Instant Account
                            <br /> Opening
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-overview-box">
                      <div className="icon">
                        <span className="icon-checkbox-mark" />
                      </div>
                      <div className="title">
                        <h3>
                          <a href="#">
                            Exciting Offers &amp;
                            <br /> Discounts
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-overview-box">
                      <div className="icon">
                        <span className="icon-checkbox-mark" />
                      </div>
                      <div className="title">
                        <h3>
                          <a href="#">
                            Secure Internet &amp;
                            <br /> Mob Banking
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-overview-box">
                      <div className="icon">
                        <span className="icon-checkbox-mark" />
                      </div>
                      <div className="title">
                        <h3>
                          <a href="#">
                            Earn
                            <br /> Reward Points
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="overview-content-box-two">
                <div className="inner-title">
                  <h5>Know About</h5>
                  <h2>Savings Account</h2>
                </div>
                <hr />
                <div className="text">
                  <p align="justify">
                    A savings account is a type of bank account that allows you
                    to deposit money securely while earning interest on the
                    balance.
                  </p>
                  <br />
                  <p align="justify">
                    <b>Some key features of savings accounts:</b>
                    <br />
                    <br />
                  </p>
                  <ul>
                    <li align="justify">
                      <b className="text-danger">Interest rates:</b> Banks pay
                      you interest based on the balance in the account. Rates
                      vary depending on the bank and the economy.
                    </li>
                    <br />
                    <li align="justify">
                      <b className="text-danger">Liquidity:</b> Savings accounts
                      offer easy access to your money, though they might limit
                      the number of withdrawals or transfers per month.
                    </li>
                    <br />
                    <li align="justify">
                      <b className="text-danger">Safety:</b> In most countries,
                      savings accounts are insured by government programs (like
                      FDIC in the U.S.), which protect your deposits up to a
                      certain limit.
                    </li>
                  </ul>
                  <p />
                </div>
                <div className="btns-box">
                  <a className="btn-one" href="contact.php">
                    <span className="txt">
                      <i className="icon-payment" />
                      Open an Account
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Overview Area*/}
      {/*Start page Contains Area*/}
      <section className="page-contains-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="page-contains-box">
                <div className="page-contains-btn">
                  <ul className="navigation clearfix scroll-nav">
                    <li className="current">
                      <a href="#benefits">
                        <span className="icon-right-arrow" />
                        Benefits
                      </a>
                    </li>
                    <li>
                      <a href="#eligibility">
                        <span className="icon-right-arrow" />
                        Eligibility
                      </a>
                    </li>
                    <li>
                      <a href="#required">
                        <span className="icon-right-arrow" />
                        Documents Required
                      </a>
                    </li>
                    <li>
                      <a href="#interest">
                        <span className="icon-right-arrow" />
                        Interest &amp; Charges
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="right-btn">
                  <a href="contact.php">Know More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End page Contains Area*/}
      {/*Start Benefits Style2 Area*/}
      <section id="benefits" className="benefits-style2-area">
        <div className="container">
          <div className="sec-title text-center">
            <h2>Our Savings Account Benefits</h2>
            <div className="sub-title">
              <p>We help businesses and customers achieve more.</p>
            </div>
          </div>
          <ul className="row benefits-content text-center">
            {/*Start Single Benefits Box Colum*/}
            <li className="col-xl-4 single-benefits-box-colum">
              <div className="single-benefits-box">
                <div className="icon">
                  <span className="icon-high" />
                </div>
                <div className="text">
                  <h3>Earn Interest up to 7%</h3>
                </div>
              </div>
            </li>
            {/*End Single Benefits Box Colum*/}
            {/*Start Single Benefits Box Colum*/}
            <li className="col-xl-4 single-benefits-box-colum">
              <div className="single-benefits-box">
                <div className="icon">
                  <span className="icon-notification" />
                </div>
                <div className="text">
                  <h3>Free SMS Alerts</h3>
                </div>
              </div>
            </li>
            {/*End Single Benefits Box Colum*/}
            {/*Start Single Benefits Box Colum*/}
            <li className="col-xl-4 single-benefits-box-colum">
              <div className="single-benefits-box">
                <div className="icon">
                  <span className="icon-safebox" />
                </div>
                <div className="text">
                  <h3>Discounts on Locker</h3>
                </div>
              </div>
            </li>
            {/*End Single Benefits Box Colum*/}
            {/*Start Single Benefits Box Colum*/}
            <li className="col-xl-4 single-benefits-box-colum">
              <div className="single-benefits-box">
                <div className="icon">
                  <span className="icon-credit-card-2" />
                </div>
                <div className="text">
                  <h3>International Debit Cards</h3>
                </div>
              </div>
            </li>
            {/*End Single Benefits Box Colum*/}
            {/*Start Single Benefits Box Colum*/}
            <li className="col-xl-4 single-benefits-box-colum">
              <div className="single-benefits-box">
                <div className="icon">
                  <span className="icon-shield-1" />
                </div>
                <div className="text">
                  <h3>Provides Safety</h3>
                </div>
              </div>
            </li>
            {/*End Single Benefits Box Colum*/}
            {/*Start Single Benefits Box Colum*/}
            <li className="col-xl-4 single-benefits-box-colum">
              <div className="single-benefits-box">
                <div className="icon">
                  <span className="icon-paperless" />
                </div>
                <div className="text">
                  <h3>Paperless Banking</h3>
                </div>
              </div>
            </li>
            {/*End Single Benefits Box Colum*/}
          </ul>
        </div>
      </section>
      {/*End Benefits Style2 Area*/}
      {/*Start Eligibility Area*/}
      <section id="eligibility" className="eligibility-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="eligibility-img-box">
                <div className="sec-title">
                  <h2>
                    Eligibility to <br />
                    Open Savings Account
                  </h2>
                  <div className="sub-title">
                    <p>Eligibility parameters for saving account.</p>
                  </div>
                </div>
                <div className="eligibility-img-box__inner">
                  <img
                    src="assets/images/resources/eligibility-img-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="eligibility-content-box">
                <div className="eligibility-content-box__inner">
                  <ul>
                    <li>
                      <div className="inner">
                        <div className="counting">1</div>
                        <div className="text">
                          <h3>Nationality</h3>
                          <p>Indian Residents, and Non-Resident individuals</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="inner">
                        <div className="counting">2</div>
                        <div className="text">
                          <h3>Age</h3>
                          <p>18 Years old or above</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="inner">
                        <div className="counting">3</div>
                        <div className="text">
                          <h3>Nationality</h3>
                          <p>Residents, and Non-Resident individuals</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="inner">
                        <div className="counting">4</div>
                        <div className="text">
                          <h3>Age</h3>
                          <p>18 Years old or above</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="facts-box-style2">
                  <div className="counting">
                    <h2 className="odometer" data-count="2.3">
                      00
                    </h2>
                    <span className="k">k</span>
                  </div>
                  <div className="inner-title">
                    <h3>
                      Saving account opened
                      <br /> in last year
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Eligibility Area*/}
      {/*Start Documents Area*/}
      <section id="required" className="documents-area">
        <div className="container">
          <div className="sec-title text-center">
            <h2>Savings A/c Required Documents</h2>
            <div className="sub-title">
              <p>Basic documents required for opening a savings account.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-6">
              {/*Start Single Documents Box*/}
              <div className="single-documents-box">
                <div className="inner-title">
                  <h3>
                    PAN Card
                    <br /> is Mandatory
                  </h3>
                </div>
              </div>
              {/*End Single Documents Box*/}
              {/*Start Single Documents Box*/}
              <div className="single-documents-box">
                <div className="inner-title">
                  <h3>
                    Duly Filled
                    <br /> Application Form
                  </h3>
                </div>
              </div>
              {/*End Single Documents Box*/}
            </div>
            <div className="col-xl-3 col-lg-6">
              {/*Start Single Documents Box*/}
              <div className="single-documents-box">
                <div className="inner-title">
                  <h3>Non Resident</h3>
                </div>
                <ul>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Passport</a>
                  </li>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Driving License</a>
                  </li>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Aadhaar Number</a>
                  </li>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Voter’s Identity Card</a>
                  </li>
                </ul>
              </div>
              {/*End Single Documents Box*/}
            </div>
            <div className="col-xl-3 col-lg-6">
              {/*Start Single Documents Box*/}
              <div className="single-documents-box">
                <div className="inner-title">
                  <h3>For Resident</h3>
                </div>
                <ul>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Passport</a>
                  </li>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Visa</a>
                  </li>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Bank Statement (If any)</a>
                  </li>
                  <li>
                    <span className="icon-play-button-1" />
                    <a href="#">Company Proof</a>
                  </li>
                </ul>
              </div>
              {/*End Single Documents Box*/}
            </div>
            <div className="col-xl-3 col-lg-6">
              {/*Start Single Documents Box*/}
              <div className="single-documents-box">
                <div className="inner-title">
                  <h3>
                    Color &amp; Passport Size
                    <br />
                    Photographs
                  </h3>
                </div>
              </div>
              {/*End Single Documents Box*/}
              {/*Start Single Documents Box*/}
              <div className="single-documents-box">
                <div className="inner-title">
                  <h3>
                    Color &amp; Passport Size
                    <br />
                    Photographs
                  </h3>
                </div>
              </div>
              {/*End Single Documents Box*/}
            </div>
          </div>
        </div>
      </section>
      {/*End Documents Area*/}
      {/*Start Interest Charges Area*/}
      <section id="interest" className="interest-charges-area">
        <div className="interest-charges-area-shape1">
          <img
            src="assets/images/shapes/interest-charges-area-shape-1.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="sec-title text-center">
            <h2>Account Interest &amp; Charges</h2>
            <div className="sub-title">
              <p>Your money is making money for you &amp; Your Family.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="interest-charges-table-box">
                <div className="table-outer">
                  <table className="interest-charges-table">
                    <tbody>
                      <tr>
                        <td className="title">
                          <h3>
                            Account Interest Rates
                            <br /> Per Annum
                          </h3>
                        </td>
                        <td className="balance">
                          <div className="inner-title">
                            <h3>Balance in a/c</h3>
                          </div>
                          <ul>
                            <li>Up to Rs. 1 Lakh</li>
                            <li>Above 1 Lakh to 5 Lakh</li>
                            <li>Above 5 Lakh to 10 Lakh</li>
                            <li>Above 10Lakh</li>
                          </ul>
                        </td>
                        <td className="interest">
                          <div className="inner-title">
                            <h3>Interest</h3>
                          </div>
                          <ul>
                            <li>3.00%</li>
                            <li>5.00%</li>
                            <li>8.25%</li>
                            <li>10.00%</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="title">
                          <h3>Debit Card</h3>
                        </td>
                        <td className="balance">
                          <ul>
                            <li>Annual Fees</li>
                            <li>Transaction Limit</li>
                            <li>Card Replacement</li>
                          </ul>
                        </td>
                        <td className="interest">
                          <ul>
                            <li>Nill</li>
                            <li>20 Lakh / Annum</li>
                            <li>Rs.600+Taxes</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="title">
                          <h3>Credit Card</h3>
                        </td>
                        <td className="balance">
                          <ul>
                            <li>Annual Fees</li>
                            <li>Card Replacement</li>
                          </ul>
                        </td>
                        <td className="interest">
                          <ul>
                            <li>Rs.1500</li>
                            <li>Rs.600+Taxes</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavingsAccount;
