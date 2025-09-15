import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./plants.css";

function PlantsPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/images.json")
      .then((response) => response.json())
      .then((data) => setPlants(data.plants))
      .catch((error) => console.error("Error fetching tools data:", error));
  }, []);

  return (
    <div className="plants-page">
      <h1>Plants</h1>
      <div className="tools-grid">
        {plants.map((item) => (
          <div key={item.id} className="grid-item">
            <Link to={`/plants/${item.id}`}>
              <img src={item.url} alt={item.name} className="tool-image" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              {item.sale && <div className="sale-tag">Sale</div>}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantsPage;
