import React, { useState, useEffect } from "react";
import Slideshow from "./slideshow";
import { Link } from "react-router-dom";
import "./home.css";


const Home = () => {
  const [best, setBest] = useState([]); 
  const images = [
    "/plants/Chlorophytum Variegatum - Spider Plant - 19 x 60cm (1).jpeg",
    "/toolsPots/Olly & Rose Charcoal Grey Black Plant Pot 25cm Large Textured Washed Finish Outdoor and Indoor Plant Pot Planter for Flowers and Plants.jpeg",
    "/plants/Fibre Clay Plant Pots Indoor_Outdoor Modern Contemporary Flower Pot Planters Patio Decking Lawn Doorstep Porch Houseplant Shrub Topiary Bush Plant Pot Clay Planters (Grey, Small).jpeg",
    "/plants/Greeneria Round Sleek Black Ceramic Centerpiece Planter Pot - Modern Decorative Indoor Outdoor 5_ H x 12_ Flower Pot.jpeg",
    "/toolsPots/White Flower Pot With Stand _ Hobby Lobby _ 1725639.jpeg",
    "/plants/LuxenHome Round Tapered 9_2_ H House Planter, Indoor_Outdoor Black.jpeg",
    "/toolsPots/977225d6-90c8-423e-9963-3349cba56437.jpeg",
  ];

  useEffect(() => {
    fetch("/images.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.plants && data.toolsAndPots) {
          // Combine the arrays and filter only items with the "best" property
          const combinedArray = [...data.plants, ...data.toolsAndPots];
          const filteredBest = combinedArray.filter((item) => item.best); // Ensure `best` is properly set in JSON
          setBest(filteredBest); // Update the state with filtered items
        } else {
          console.error("Unexpected data structure or missing keys:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="home">
      <div>
        <img
          src="/spacejoy-mweDhudGmIc-unsplash.jpg"
          className="pic"
          alt="Decorative background"
        />
        <div className="footer2">
          <h2 className="text">
            The Essentials for Your
            <br /> Plant Passion and Beyond
          </h2>
          <Link to="/plants" className="linkk">
            <h4>Shop Plants</h4>
          </Link>
        </div>
      </div>
      <Slideshow images={images} interval={4000} />
      <div className="best-seller">
        <h1 className="best">Best Seller</h1>
        <div className="plants-grid">
          {best.map((item) => (
            <div key={item.id} className="grid-item">
              {/* Dynamically set the link based on category */}
              <Link
                to={`/${item.category === "plants" ? "plants" : "tools"}/${
                  item.id
                }`}
              >
                <img src={item.url} alt={item.name} className="plants-image" />
                <p>{item.name}</p>
                <p>${item.price || "Price not available"}</p>
                {item.sale && <div className="sale-tag">Sale</div>}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="seller">
        <img
          src="/a beautiful woman in her thirties .png"
          className="woman"
          alt="Bloom Founder"
        />
        <span className="amelia">Amelia Delos, Bloom&Beyond Founder</span>
        <div className="seller-text">
          <span className="effort">
            Effortless Indoor
            <br /> Gardening
          </span>
          <br />
          This is the space to introduce the business and what it has to offer.
          <br />
          Define the qualities and values that make it unique.
          <br />
          <br /> This is the space to introduce visitors to the business or
          brand.
          <br /> Briefly explain who's behind it, what it does, and what makes
          it unique. <br />
          Share its core values and what this site has to offer.
        </div>
      </div>
    </div>
  );
};

export default Home;
