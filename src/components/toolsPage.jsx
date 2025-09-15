import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import "./toolsPage.css";

function ToolsPage() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch("/images.json")
      .then((response) => response.json())
      .then((data) => setTools(data.toolsAndPots))
      .catch((error) => console.error("Error fetching tools data:", error));
  }, []);

  return (
    <div className="tools-page">
      <h1>Tools & Pots</h1>
      <div className="tools-grid">
        {tools.map((item) => (
          <div key={item.id} className="grid-item">
            <Link to={`/tools/${item.id}`}>
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

export default ToolsPage;
