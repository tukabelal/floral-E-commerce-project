import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./searchResult.css";

function SearchResults() {
  const location = useLocation();
  const query = location.state?.searchQuery || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = (searchQuery) => {
    fetch("/images.json")
      .then((response) => response.json())
      .then((data) => {
        const combinedArray = [...data.plants, ...data.toolsAndPots];
        const filteredResults = combinedArray.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );
        setResults(filteredResults);
      })
      .catch(() => {
        setResults([]);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchResults(query);
    }
  };

  return (
    <div className="search-results-page" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="results-grid">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={`${item.id}-${item.category}`} className="result-item">
              <Link to={`/${item.category}/${item.id}`} className="result-link">
                <img src={item.url} alt={item.name} className="result-image" />
                <h2>{item.name}</h2>
                <p>{item.description || "No description available."}</p>
                <p>Price: ${item.price || "N/A"}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No products match your search query.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;