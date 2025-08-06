import React, { useState } from "react";
import ConfessionForm from "./ConfessionForm";
import NewsletterForm from "./NewsletterForm";
import PartnershipForm from "./PartnershipForm";
import ScrollingBrands from "./ScrollingBrands";
import "./App.css";
import amazonLogo from "./logos/HBCULogoforWhite.png";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(""); // no default form
  const [showNewsletterForm, setShowNewsletterForm] = useState(true); // show newsletter by default
  const [showPartnershipForm, setShowPartnershipForm] = useState(false);

  return (
    <div className={`app-container ${menuOpen ? "no-scroll" : ""}`}>
      {/* Hamburger Icon */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(true)}>
        ☰
      </div>

      {/* Full-screen Overlay Menu */}
      {menuOpen && (
        <div className="overlay-menu">
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            ✖
          </button>
          <ul className="menu-list">
            <li
              onClick={() => {
                setSelectedForm("confession");
                setShowNewsletterForm(false);
                setShowPartnershipForm(false);
                setMenuOpen(false);
              }}
            >
              📜 Submit a Confession
            </li>
            <li
              onClick={() => {
                setShowPartnershipForm(true);
                setShowNewsletterForm(false);
                setMenuOpen(false);
              }}
            >
              🤝 Partnerships
            </li>
            <li
              onClick={() => {
                setShowNewsletterForm(true);
                setShowPartnershipForm(false);
                setMenuOpen(false);
              }}
            >
              📰 Join our Newsletter
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="confession-form-wrapper">
        <div className="confession-form-image-placeholder">
          <img src={amazonLogo} alt="Confession Form Banner" />
        </div>
        <p className="centerText">
          A safe space for students, so be shady baby!
        </p>

        {/* Render Selected Form */}
        {showPartnershipForm ? (
          <PartnershipForm />
        ) : showNewsletterForm ? (
          <NewsletterForm />
        ) : (
          <ConfessionForm />
        )}
      </div>

      <h5 className="white-text marginMinusTen">Our Partners.</h5>
      <span className="marginMinusthirdteen">
        Want to become a partner?{" "}
        <span
          className="clickable-link"
          onClick={() => {
            setShowNewsletterForm(false);
            setSelectedForm("");
            setShowPartnershipForm(false);
            setTimeout(() => {
              setShowPartnershipForm(true);
              window.scrollTo(0, 0);
            }, 10);
          }}
        >
          Click here
        </span>
      </span>

      <ScrollingBrands className="transparent-background" />
    </div>
  );
}

export default App;
