import React, { useState, useEffect } from "react";
import "./slideshow.css"; 

const Slideshow = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer); 
  }, [images, interval]);

  return (
    <div className="slideshow-container">
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="image-container">
            <img src={src} alt={`Slide ${index}`} className="image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
