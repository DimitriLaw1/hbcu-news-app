import React from "react";
import { motion } from "framer-motion";
import "./ScrollingBrands.css";

//my logos
import youtubeLogo from "./logos/YouTubeLogo.png";
import appleMusicLogo from "./logos/AppleMusicLogo.png";
import SpotifyLogo from "./logos/SpotifyLogo.png";
import amazonlogo from "./logos/amazonlogo.png";
import fashionNova from "./logos/FashionNovaLogo.png";

const brands = [
  { name: "YouTube", image: youtubeLogo },
  { name: "fashion Nova", image: fashionNova },
  { name: "Apple", image: appleMusicLogo },
  { name: "Spotify", image: SpotifyLogo },
  { name: "Amazon", image: amazonlogo },
];

const ScrollingBrands = () => {
  return (
    <div className="scrolling-container">
      {/* <div className="fade-left"></div> */}
      <motion.div
        className="scrolling-wrapper"
        initial={{ x: "100%", opacity: 0.8 }}
        animate={{ x: "-100%", opacity: 1 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="brand-item">
            <img src={brand.image} alt={brand.name} />
          </div>
        ))}
      </motion.div>
      {/* <div className="fade-right"></div> */}
    </div>
  );
};

export default ScrollingBrands;
