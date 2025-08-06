import React, { useState } from "react";
import HBCUs from "./hbcuList"; // ✅ Import HBCU list
import "./App.css"; // ✅ Ensure styling is consistent

const MemeForm = () => {
  const [memeText, setMemeText] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(""); // ✅ Store selected HBCU
  const [memeImages, setMemeImages] = useState([]); // ✅ Store multiple files
  const [imagePreviews, setImagePreviews] = useState([]); // ✅ Store multiple preview URLs

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      const newPreviews = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setMemeImages((prev) => [...prev, ...files]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleDeleteImage = (index) => {
    setMemeImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (memeImages.length === 0) {
      alert("Please upload at least one image for your meme.");
      return;
    }

    console.log("Meme Submitted:", {
      memeText,
      selectedSchool,
      memeImages,
    });

    alert("✅ Meme successfully submitted!");

    // Clear form after submission
    setMemeText("");
    setSelectedSchool("");
    setMemeImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="meme-form">
      <h2 className="centerText">Submit a Meme</h2>

      {/* HBCU Selection Dropdown */}
      <label className="meme-label">
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

      <form onSubmit={handleSubmit}>
        {/* Meme Text Input */}
        <label className="meme-label">
          Add a caption to your meme:
          <textarea
            value={memeText}
            onChange={(e) => setMemeText(e.target.value)}
            placeholder="Write something funny..."
            rows="3"
          />
        </label>

        {/* Multiple Meme Image Upload */}
        <label className="meme-label">
          Upload Photo(s) for Meme:
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>

        {/* Show Multiple Image Previews with Delete Option */}
        {imagePreviews.length > 0 && (
          <div className="meme-preview">
            <p>Image Previews:</p>
            <div className="preview-container">
              {imagePreviews.map((media, index) => (
                <div key={index} className="preview-item">
                  <img src={media.preview} alt="Meme Preview" />
                  <button
                    className="delete-media"
                    onClick={() => handleDeleteImage(index)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="button2">
          Submit Meme
        </button>
      </form>
    </div>
  );
};

export default MemeForm;
