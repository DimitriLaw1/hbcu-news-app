import React, { useState } from "react";
import HBCUs from "./hbcuList";
import "./App.css";
import { newsDB } from "./firebase"; // ✅ Correct project
import { collection, addDoc, Timestamp } from "firebase/firestore";

const NewsForm = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [newsText, setNewsText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newsText.trim() || !selectedSchool) {
      alert("Please select a school and enter the news details.");
      return;
    }

    try {
      await addDoc(collection(newsDB, "submitted_news"), {
        school: selectedSchool,
        text: newsText,
        submittedAt: Timestamp.now(),
      });

      alert("✅ News successfully submitted!");

      // Clear form
      setSelectedSchool("");
      setNewsText("");
    } catch (error) {
      console.error("Error submitting news:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="news-form">
      <h2 className="centerText">🗞️ Submit News</h2>

      <form onSubmit={handleSubmit}>
        {/* HBCU Selection Dropdown */}
        <label className="news-label">
          Select School:
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            required
          >
            <option value="">-- Choose Your School --</option>
            {HBCUs.map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </select>
        </label>

        {/* News Text Input */}
        <label className="news-label">
          Write News Details:
          <textarea
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="Describe the news or event..."
            rows="4"
            required
          />
        </label>

        <button type="submit" className="button2">
          Submit News
        </button>
      </form>
    </div>
  );
};

export default NewsForm;
