import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("social");
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const headerTextEl = document.querySelector(".header-text");
      const headerEl = document.querySelector("header");

      if (headerTextEl && headerEl) {
        const box = headerTextEl.offsetHeight;
        const header = headerEl.offsetHeight;

        if (scroll >= box - header) {
          setIsHeaderFixed(true);
        } else {
          setIsHeaderFixed(false);
        }
      }

      const scrollPos = window.scrollY;
      document.querySelectorAll(".nav a").forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const refElement = document.querySelector(href);
          if (refElement) {
            const top = refElement.offsetTop;
            const height = refElement.offsetHeight;
            if (top <= scrollPos && top + height > scrollPos) {
              document
                .querySelectorAll(".nav ul li a")
                .forEach((a) => a.classList.remove("active"));
              link.classList.add("active");
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const width = window.innerWidth;
      if (width < 991) {
        setIsMobileMenuOpen(false);
      }
      window.scrollTo({
        top: target.offsetTop + 1,
        behavior: "smooth",
      });
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setModalView("social");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalView("social");
  };

  return (
    <>
      <header
        className={`header-area header-sticky wow slideInDown ${
          isHeaderFixed ? "background-header" : ""
        }`}
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="index.html" className="logo">
                  <img src="assets/images/logo.png" alt="Chain App Dev" />
                </a>
                <ul
                  className="nav"
                  style={{ display: isMobileMenuOpen ? "block" : "" }}
                >
                  <li className="scroll-to-section">
                    <a
                      href="#top"
                      className="active"
                      onClick={(e) => scrollToSection(e, "#top")}
                    >
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#services"
                      onClick={(e) => scrollToSection(e, "#services")}
                    >
                      Services
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#about"
                      onClick={(e) => scrollToSection(e, "#about")}
                    >
                      About
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#pricing"
                      onClick={(e) => scrollToSection(e, "#pricing")}
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#newsletter"
                      onClick={(e) => scrollToSection(e, "#newsletter")}
                    >
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <div className="gradient-button">
                      <a id="modal_trigger" href="#modal" onClick={openModal}>
                        <i className="fa fa-sign-in-alt" /> Sign In Now
                      </a>
                    </div>
                  </li>
                </ul>
                <a
                  className={`menu-trigger ${isMobileMenuOpen ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {isModalOpen && <div className="modal-overlay" onClick={closeModal} />}

      <div
        id="modal"
        className="popupContainer"
        style={{
          display: isModalOpen ? "block" : "none",
          zIndex: 99999,
          position: "fixed",
        }}
      >
        <div className="popupHeader">
          <span className="header_title">
            {modalView === "register" ? "Register" : "Login"}
          </span>
          <span className="modal_close" onClick={closeModal}>
            <i className="fa fa-times" />
          </span>
        </div>
        <section className="popupBody">
          <div
            className="social_login"
            style={{ display: modalView === "social" ? "block" : "none" }}
          >
            <div className="">
              <a href="#" className="social_box fb">
                <span className="icon">
                  <i className="fab fa-facebook" />
                </span>
                <span className="icon_title">Connect with Facebook</span>
              </a>
              <a href="#" className="social_box google">
                <span className="icon">
                  <i className="fab fa-google-plus" />
                </span>
                <span className="icon_title">Connect with Google</span>
              </a>
            </div>
            <div className="centeredText">
              <span>Or use your Email address</span>
            </div>
            <div className="action_btns">
              <div className="one_half">
                <a
                  href="#"
                  id="login_form"
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalView("login");
                  }}
                >
                  Login
                </a>
              </div>
              <div className="one_half last">
                <a
                  href="#"
                  id="register_form"
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalView("register");
                  }}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>

          <div
            className="user_login"
            style={{ display: modalView === "login" ? "block" : "none" }}
          >
            <div>
              <label>Email / Username</label>
              <input type="text" />
              <br />
              <label>Password</label>
              <input type="password" />
              <br />
              <div className="checkbox">
                <input id="remember" type="checkbox" />
                <label htmlFor="remember">Remember me on this computer</label>
              </div>
              <div className="action_btns">
                <div className="one_half">
                  <a
                    href="#"
                    className="btn back_btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalView("social");
                    }}
                  >
                    <i className="fa fa-angle-double-left" /> Back
                  </a>
                </div>
                <div className="one_half last">
                  <a href="#" className="btn btn_red">
                    Login
                  </a>
                </div>
              </div>
            </div>
            <a href="#" className="forgot_password">
              Forgot password?
            </a>
          </div>

          <div
            className="user_register"
            style={{ display: modalView === "register" ? "block" : "none" }}
          >
            <div>
              <label>Full Name</label>
              <input type="text" />
              <br />
              <label>Email Address</label>
              <input type="email" />
              <br />
              <label>Password</label>
              <input type="password" />
              <br />
              <div className="checkbox">
                <input id="send_updates" type="checkbox" />
                <label htmlFor="send_updates">
                  Send me occasional email updates
                </label>
              </div>
              <div className="action_btns">
                <div className="one_half">
                  <a
                    href="#"
                    className="btn back_btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalView("social");
                    }}
                  >
                    <i className="fa fa-angle-double-left" /> Back
                  </a>
                </div>
                <div className="one_half last">
                  <a href="#" className="btn btn_red">
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className="main-banner wow fadeIn"
        id="top"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div
                    className="left-content show-up header-text wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay="1s"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>Get The Latest App From App Stores</h2>
                        <p>
                          Chain App Dev is an app landing page HTML5 template
                          based on Bootstrap v5.1.3 CSS layout provided by
                          TemplateMo, a great website to download free CSS
                          templates.
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <div className="white-button first-button scroll-to-section">
                          <a href="#contact">
                            Free Quote <i className="fab fa-apple" />
                          </a>
                        </div>
                        <div className="white-button scroll-to-section">
                          <a href="#contact">
                            Free Quote <i className="fab fa-google-play" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="right-image wow fadeInRight"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <img src="assets/images/slider-dec.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div
                className="section-heading  wow fadeInDown"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <h4>
                  Amazing <em>Services &amp; Features</em> for you
                </h4>
                <img src="assets/images/heading-line-dec.png" alt="" />
                <p>
                  If you need the greatest collection of HTML templates for your
                  business, please visit{" "}
                  <a
                    rel="nofollow"
                    href="https://www.toocss.com/"
                    target="_blank"
                  >
                    TooCSS
                  </a>{" "}
                  Blog. If you need to have a contact form PHP script, go to{" "}
                  <a href="https://templatemo.com/contact" target="_parent">
                    our contact page
                  </a>{" "}
                  for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="service-item first-service">
                <div className="icon" />
                <h4>App Maintenance</h4>
                <p>
                  You are not allowed to redistribute this template ZIP file on
                  any other website.
                </p>
                <div className="text-button">
                  <a href="#">
                    Read More <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="service-item second-service">
                <div className="icon" />
                <h4>Rocket Speed of App</h4>
                <p>
                  You are allowed to use the Chain App Dev HTML template. Feel
                  free to modify or edit this layout.
                </p>
                <div className="text-button">
                  <a href="#">
                    Read More <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="service-item third-service">
                <div className="icon" />
                <h4>Multi Workflow Idea</h4>
                <p>
                  If this template is beneficial for your work, please support
                  us{" "}
                  <a
                    rel="nofollow"
                    href="https://paypal.me/templatemo"
                    target="_blank"
                  >
                    a little via PayPal
                  </a>
                  . Thank you.
                </p>
                <div className="text-button">
                  <a href="#">
                    Read More <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="service-item fourth-service">
                <div className="icon" />
                <h4>24/7 Help &amp; Support</h4>
                <p>
                  Lorem ipsum dolor consectetur adipiscing elit sedder
                  williamsburg photo booth quinoa and fashion axe.
                </p>
                <div className="text-button">
                  <a href="#">
                    Read More <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="about-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="section-heading">
                <h4>
                  About <em>What We Do</em> &amp; Who We Are
                </h4>
                <img src="assets/images/heading-line-dec.png" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eismod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="box-item">
                    <h4>
                      <a href="#">Maintance Problems</a>
                    </h4>
                    <p>Lorem Ipsum Text</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="box-item">
                    <h4>
                      <a href="#">24/7 Support &amp; Help</a>
                    </h4>
                    <p>Lorem Ipsum Text</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="box-item">
                    <h4>
                      <a href="#">Fixing Issues About</a>
                    </h4>
                    <p>Lorem Ipsum Text</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="box-item">
                    <h4>
                      <a href="#">Co. Development</a>
                    </h4>
                    <p>Lorem Ipsum Text</p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eismod tempor idunte ut labore et dolore adipiscing
                    magna.
                  </p>
                  <div className="gradient-button">
                    <a href="#">Start 14-Day Free Trial</a>
                  </div>
                  <span>*No Credit Card Required</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-image">
                <img src="assets/images/about-right-dec.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="clients" className="the-clients">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="section-heading">
                <h4>
                  Check What <em>The Clients Say</em> About Our App Dev
                </h4>
                <img src="assets/images/heading-line-dec.png" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eismod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="naccs">
                <div className="grid">
                  <div className="row">
                    <div className="col-lg-7 align-self-center">
                      <div className="menu">
                        <div
                          className={
                            activeTestimonial === 0
                              ? "first-thumb active"
                              : "first-thumb"
                          }
                          onClick={() => handleTestimonialClick(0)}
                        >
                          <div className="thumb">
                            <div className="row">
                              <div className="col-lg-4 col-sm-4 col-12">
                                <h4>David Martino Co</h4>
                                <span className="date">30 November 2021</span>
                              </div>
                              <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                                <span className="category">Financial Apps</span>
                              </div>
                              <div className="col-lg-4 col-sm-4 col-12">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="rating">4.8</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={activeTestimonial === 1 ? "active" : ""}
                          onClick={() => handleTestimonialClick(1)}
                        >
                          <div className="thumb">
                            <div className="row">
                              <div className="col-lg-4 col-sm-4 col-12">
                                <h4>Jake Harris Nyo</h4>
                                <span className="date">29 November 2021</span>
                              </div>
                              <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                                <span className="category">
                                  Digital Business
                                </span>
                              </div>
                              <div className="col-lg-4 col-sm-4 col-12">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="rating">4.5</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={activeTestimonial === 2 ? "active" : ""}
                          onClick={() => handleTestimonialClick(2)}
                        >
                          <div className="thumb">
                            <div className="row">
                              <div className="col-lg-4 col-sm-4 col-12">
                                <h4>May Catherina</h4>
                                <span className="date">27 November 2021</span>
                              </div>
                              <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                                <span className="category">
                                  Business &amp; Economics
                                </span>
                              </div>
                              <div className="col-lg-4 col-sm-4 col-12">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="rating">4.7</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={activeTestimonial === 3 ? "active" : ""}
                          onClick={() => handleTestimonialClick(3)}
                        >
                          <div className="thumb">
                            <div className="row">
                              <div className="col-lg-4 col-sm-4 col-12">
                                <h4>Random User</h4>
                                <span className="date">24 November 2021</span>
                              </div>
                              <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                                <span className="category">
                                  New App Ecosystem
                                </span>
                              </div>
                              <div className="col-lg-4 col-sm-4 col-12">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="rating">3.9</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeTestimonial === 4
                              ? "last-thumb active"
                              : "last-thumb"
                          }
                          onClick={() => handleTestimonialClick(4)}
                        >
                          <div className="thumb">
                            <div className="row">
                              <div className="col-lg-4 col-sm-4 col-12">
                                <h4>Mark Amber Do</h4>
                                <span className="date">21 November 2021</span>
                              </div>
                              <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                                <span className="category">
                                  Web Development
                                </span>
                              </div>
                              <div className="col-lg-4 col-sm-4 col-12">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="rating">4.3</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <ul className="nacc">
                        <li className={activeTestimonial === 0 ? "active" : ""}>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="client-content">
                                    <img src="assets/images/quote.png" alt="" />
                                    <p>
                                      "Lorem ipsum dolor sit amet, consectetur
                                      adpiscing elit, sed do eismod tempor
                                      idunte ut labore et dolore magna aliqua
                                      darwin kengan lorem ipsum dolor sit amet,
                                      consectetur picing elit massive big
                                      blasta."
                                    </p>
                                  </div>
                                  <div className="down-content">
                                    <img
                                      src="assets/images/client-image.jpg"
                                      alt=""
                                    />
                                    <div className="right-content">
                                      <h4>David Martino</h4>
                                      <span>CEO of David Company</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className={activeTestimonial === 1 ? "active" : ""}>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="client-content">
                                    <img src="assets/images/quote.png" alt="" />
                                    <p>
                                      "CTO, Lorem ipsum dolor sit amet,
                                      consectetur adpiscing elit, sed do eismod
                                      tempor idunte ut labore et dolore magna
                                      aliqua darwin kengan lorem ipsum dolor sit
                                      amet, consectetur picing elit massive big
                                      blasta."
                                    </p>
                                  </div>
                                  <div className="down-content">
                                    <img
                                      src="assets/images/client-image.jpg"
                                      alt=""
                                    />
                                    <div className="right-content">
                                      <h4>Jake H. Nyo</h4>
                                      <span>CTO of Digital Company</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className={activeTestimonial === 2 ? "active" : ""}>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="client-content">
                                    <img src="assets/images/quote.png" alt="" />
                                    <p>
                                      "May, Lorem ipsum dolor sit amet,
                                      consectetur adpiscing elit, sed do eismod
                                      tempor idunte ut labore et dolore magna
                                      aliqua darwin kengan lorem ipsum dolor sit
                                      amet, consectetur picing elit massive big
                                      blasta."
                                    </p>
                                  </div>
                                  <div className="down-content">
                                    <img
                                      src="assets/images/client-image.jpg"
                                      alt=""
                                    />
                                    <div className="right-content">
                                      <h4>May C.</h4>
                                      <span>Founder of Catherina Co.</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className={activeTestimonial === 3 ? "active" : ""}>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="client-content">
                                    <img src="assets/images/quote.png" alt="" />
                                    <p>
                                      "Lorem ipsum dolor sit amet, consectetur
                                      adpiscing elit, sed do eismod tempor
                                      idunte ut labore et dolore magna aliqua
                                      darwin kengan lorem ipsum dolor sit amet,
                                      consectetur picing elit massive big
                                      blasta."
                                    </p>
                                  </div>
                                  <div className="down-content">
                                    <img
                                      src="assets/images/client-image.jpg"
                                      alt=""
                                    />
                                    <div className="right-content">
                                      <h4>Random Staff</h4>
                                      <span>Manager, Digital Company</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className={activeTestimonial === 4 ? "active" : ""}>
                          <div>
                            <div className="thumb">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="client-content">
                                    <img src="assets/images/quote.png" alt="" />
                                    <p>
                                      "Mark, Lorem ipsum dolor sit amet,
                                      consectetur adpiscing elit, sed do eismod
                                      tempor idunte ut labore et dolore magna
                                      aliqua darwin kengan lorem ipsum dolor sit
                                      amet, consectetur picing elit massive big
                                      blasta."
                                    </p>
                                  </div>
                                  <div className="down-content">
                                    <img
                                      src="assets/images/client-image.jpg"
                                      alt=""
                                    />
                                    <div className="right-content">
                                      <h4>Mark Am</h4>
                                      <span>CTO, Amber Do Company</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" className="pricing-tables">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="section-heading">
                <h4>
                  We Have The Best Pre-Order <em>Prices</em> You Can Get
                </h4>
                <img src="assets/images/heading-line-dec.png" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eismod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-item-regular">
                <span className="price">$12</span>
                <h4>Standard Plan App</h4>
                <div className="icon">
                  <img src="assets/images/pricing-table-01.png" alt="" />
                </div>
                <ul>
                  <li>Lorem Ipsum Dolores</li>
                  <li>20 TB of Storage</li>
                  <li className="non-function">Life-time Support</li>
                  <li className="non-function">Premium Add-Ons</li>
                  <li className="non-function">Fastest Network</li>
                  <li className="non-function">More Options</li>
                </ul>
                <div className="border-button">
                  <a href="#">Purchase This Plan Now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-item-pro">
                <span className="price">$25</span>
                <h4>Business Plan App</h4>
                <div className="icon">
                  <img src="assets/images/pricing-table-01.png" alt="" />
                </div>
                <ul>
                  <li>Lorem Ipsum Dolores</li>
                  <li>50 TB of Storage</li>
                  <li>Life-time Support</li>
                  <li>Premium Add-Ons</li>
                  <li className="non-function">Fastest Network</li>
                  <li className="non-function">More Options</li>
                </ul>
                <div className="border-button">
                  <a href="#">Purchase This Plan Now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-item-regular">
                <span className="price">$66</span>
                <h4>Premium Plan App</h4>
                <div className="icon">
                  <img src="assets/images/pricing-table-01.png" alt="" />
                </div>
                <ul>
                  <li>Lorem Ipsum Dolores</li>
                  <li>120 TB of Storage</li>
                  <li>Life-time Support</li>
                  <li>Premium Add-Ons</li>
                  <li>Fastest Network</li>
                  <li>More Options</li>
                </ul>
                <div className="border-button">
                  <a href="#">Purchase This Plan Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer id="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="section-heading">
                <h4>
                  Join our mailing list to receive the news &amp; latest trends
                </h4>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-3">
              <div id="search">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <fieldset>
                      <input
                        type="address"
                        name="address"
                        className="email"
                        placeholder="Email Address..."
                        autoComplete="on"
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <fieldset>
                      <button type="submit" className="main-button">
                        Subscribe Now <i className="fa fa-angle-right" />
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>Contact Us</h4>
                <p>Rio de Janeiro - RJ, 22795-008, Brazil</p>
                <p>
                  <a href="#">010-020-0340</a>
                </p>
                <p>
                  <a href="#">info@company.co</a>
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>About Us</h4>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <a href="#">Free Apps</a>
                  </li>
                  <li>
                    <a href="#">App Engine</a>
                  </li>
                  <li>
                    <a href="#">Programming</a>
                  </li>
                  <li>
                    <a href="#">Development</a>
                  </li>
                  <li>
                    <a href="#">App News</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">App Dev Team</a>
                  </li>
                  <li>
                    <a href="#">Digital Web</a>
                  </li>
                  <li>
                    <a href="#">Normal Apps</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>About Our Company</h4>
                <div className="logo">
                  <img src="assets/images/white-logo.png" alt="" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="copyright-text">
                <p>
                  Copyright © 2022 Chain App Dev Company. All Rights Reserved.
                  <br />
                  Design:{" "}
                  <a
                    href="https://templatemo.com/"
                    target="_blank"
                    title="css templates"
                  >
                    TemplateMo
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
