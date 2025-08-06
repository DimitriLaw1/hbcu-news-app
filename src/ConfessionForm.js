import React, { useState } from "react";
import { confessionsDB } from "./firebaseConfig"; // ✅ Firestore only
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import HBCUs from "./hbcuList";
import "./App.css";

const ConfessionForm = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    confession: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.schoolName) {
      tempErrors.schoolName = "Please select a school.";
    }
    if (!formData.confession.trim()) {
      tempErrors.confession = "Confession cannot be empty.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await addDoc(collection(confessionsDB, "confessions"), {
        schoolName: formData.schoolName,
        confession: formData.confession,
        createdAt: serverTimestamp(),
        status: "pending",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error adding confession:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 className="centerText">Submit a Confession</h2>

      {submitted ? (
        <div>
          <p style={{ color: "green", fontWeight: "bold" }}>
            ✅ Confession successfully submitted!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Submit Another Confession
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>School Name:</label>
            <select
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            >
              <option value="">-- Choose Your School --</option>
              {HBCUs.map((school, index) => (
                <option key={index} value={school}>
                  {school || "Select a School"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Confession:</label>
            <textarea
              name="confession"
              value={formData.confession}
              onChange={handleChange}
              required
              rows="4"
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </div>

          <button type="submit" disabled={loading} className="button2">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ConfessionForm;
