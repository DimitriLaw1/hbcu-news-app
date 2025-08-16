import React, { useState } from "react";
import axios from "axios";
import HBCUs from "./hbcuList";
import "./App.css";

const collegeMajors = [
  "Accounting",
  "Art/ Design",
  "Biology / Science related",
  "Business Administration / Management",
  "Communication / Media Studies",
  "Criminal Justice / Law Enforcement",
  "Education",
  "Engineering",
  "Fashion",
  "Film and Production",
  "Music",
  "Nursing",
  "Political Science / Government",
  "Psychology",
  "Sociology",
  "Tech related / IT",
  "Other",
].sort((a, b) => {
  if (a === "Other") return 1;
  if (b === "Other") return -1;
  return a.localeCompare(b);
});

const classifications = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate Student",
  "Alumni",
  "Other",
];

const ageRanges = ["17-20", "21-23", "24+"];

const NewsletterForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedAgeRange, setSelectedAgeRange] = useState(""); // ⭐ ADDED

  const options = [
    "📢 Job Opportunities (Brand Ambassador, Internships, etc)",
    "🎉 Events/Parties",
    "📢 News Alerts & Tea at your school",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email,
      SCHOOL: selectedSchool,
      OPTIONS: selectedOptions.join(", "),
      MAJOR: selectedMajor || "N/A",
      CLASSIFICATION: selectedClassification || "N/A",
      AGE_RANGE: selectedAgeRange || "N/A", // ⭐ ADDED: include age in payload
      INSTAGRAM: instagramHandle || "N/A",
    };

    try {
      const response = await axios.post(
        "https://us-central1-confession-app-d0966.cloudfunctions.net/subscribeToNewsletter",
        payload
      );

      if (response.status === 201) {
        alert(`✅ Successfully subscribed!`);
        setEmail("");
        setInstagramHandle("");
        setSelectedSchool("");
        setSelectedOptions([]);
        setSelectedMajor("");
        setSelectedClassification("");
        setSelectedAgeRange("");
        setStep(1);
        setErrorMessage("");
      } else {
        alert("⚠️ There was an issue with your subscription.");
      }
    } catch (error) {
      console.error("Brevo API Error:", error);
      alert("⚠️ Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const progressPercent = (step / 3) * 100;

  const canAdvance = () => {
    if (step === 1) return selectedOptions.length > 0;
    if (step === 2)
      return (
        selectedMajor &&
        selectedClassification &&
        selectedSchool &&
        selectedAgeRange
      );
    return true;
  };

  return (
    <div className="newsletter-form">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${progressPercent}%`,
            height: "10px",
            backgroundColor: "#00BFFF",
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>

      <h2 className="centerText">🔥 The Most Lit Newsletter</h2>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <p className="newsletter-subtext">
              Select all that apply of newsletters you want to join
            </p>
            {options.map((option, index) => (
              <label key={index} className="checkbox-container">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <label className="email-label">
              Select Your Major:
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
              >
                <option value="">-- Choose Your Major --</option>
                {collegeMajors.map((major, index) => (
                  <option key={index} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </label>

            <label className="email-label">
              Select Your Classification:
              <select
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
              >
                <option value="">-- Choose Your Classification --</option>
                {classifications.map((classification, index) => (
                  <option key={index} value={classification}>
                    {classification}
                  </option>
                ))}
              </select>
            </label>

            {/* ⭐ ADDED: Age range dropdown */}
            <label className="email-label">
              Select Your Age Range: {/* ⭐ ADDED */}
              <select
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
              >
                <option value="">-- Choose Your Age Range --</option>
                {ageRanges.map((range, index) => (
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </label>
            {/* ⭐ ADDED END */}

            <label className="email-label">
              School Name:
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="">-- Choose Your School --</option>
                {HBCUs.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <label className="email-label">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </label>

            <label className="email-label">
              Instagram Username or N/A:
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                placeholder="@yourhandle"
              />
            </label>

            <button type="submit" className="button2" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "1.5rem",
          }}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                setStep(step - 1);
              }}
              className="button2"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={() => {
                if (canAdvance()) {
                  setErrorMessage("");
                  setStep(step + 1);
                } else {
                  setErrorMessage(
                    "⚠️ Please fill out all fields before continuing."
                  );
                }
              }}
              className="button2"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;
