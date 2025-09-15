import React, { useEffect, useState } from "react";
import "./plants.css";
import { Link } from "react-router";
function Sale() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("/images.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.plants) && Array.isArray(data.toolsAndPots)) {
          const combinedArray = [...data.plants, ...data.toolsAndPots];
          const filteredSales = combinedArray.filter((item) => item.sale);
          setSales(filteredSales);
        } else {
          console.error("Invalid data structure or missing arrays:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="plants-page">
      <h1>Sale</h1>
      <div className="tools-grid">
        {sales.length > 0 ? (
          sales.map((item, index) => (
            <div key={`${item.id}-${index}`} className="grid-item">
              <Link to={`/${item.category}/${item.id}`} className="link">
                <img src={item.url} alt={item.name} className="tool-image" />
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                {item.sale && <div className="sale-tag">Sale</div>}
              </Link>
            </div>
          ))
        ) : (
          <p>No items for sale</p>
        )}
      </div>
    </div>
  );
}

export default Sale;
