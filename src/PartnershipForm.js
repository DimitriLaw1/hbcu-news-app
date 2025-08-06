import React, { useState } from "react";
import "./App.css"; // ✅ Ensure consistent styling

const PartnershipForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    brandName: "",
    email: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submission via JavaScript (Fixes Formspree Issue)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xanqgkol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("⚠️ There was an issue submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("❌ Submission failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset Form to Allow Another Submission
  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      brandName: "",
      email: "",
      description: "",
    });
  };

  return (
    <div className="partnership-form">
      <h2 className="centerText">🤝 Ready to partner with HBCU Shaderoom?</h2>
      <p className="partnership-subtext">
        We'd love to hear from you! The average response time is 1-3 business
        days.
      </p>

      {submitted ? (
        <div className="success-message">
          <p>✅ Your request has been sent! We'll be in touch soon.</p>
          <button onClick={handleReset} className="button2">
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label className="form-label">
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </label>

          {/* Brand Name */}
          <label className="form-label">
            Brand Name:
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              required
              placeholder="Enter your brand name"
            />
          </label>

          {/* Email */}
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </label>

          {/* Description */}
          <label className="form-label">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Tell us about your brand & how you’d like to partner..."
              rows="4"
            />
          </label>

          {/* Submit Button */}
          <button type="submit" className="button2" disabled={loading}>
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PartnershipForm;
