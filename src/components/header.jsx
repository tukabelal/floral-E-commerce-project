import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import CartSidebar from "./CartSideBar";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState({ plants: [], toolsAndPots: [] });
  const isAuthenticated = !!localStorage.getItem("access_token");

  useEffect(() => {
    fetch("/images.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".account-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    const plantMatches = data.plants
      .map((item) => ({ ...item, category: "plants" }))
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const toolMatches = data.toolsAndPots
      .map((item) => ({ ...item, category: "toolsAndPots" }))
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const results = [...plantMatches, ...toolMatches];
    navigate("/search-results", { state: { results } });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    setIsDropdownOpen(false);
    alert("You have been logged out.");
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in to delete your account.");
      return;
    }

    try {
      const response = await axios.get("https://fakestoreapi.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = response.data[0]?.id;
      if (!userId) {
        alert("User ID not found. Unable to delete account.");
        return;
      }

      await axios.delete(`https://fakestoreapi.com/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("access_token");
      alert("Account deleted successfully.");
      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="logo2"
          src="/small logo for Bloom & Beyond plant shop.png"
          alt="Bloom & Beyond Logo"
        />
      </Link>
      <h5>
        <pre className="bloom2">
          Bloom & <br /> Beyond
        </pre>
      </h5>
      <div className="links">
        <Link to="/" className="home2">
          Home
        </Link>
        <Link to="/plants" className="plants">
          Plants
        </Link>
        <Link to="/tools" className="tools">
          Tools & Pots
        </Link>
        <Link to="/sale" className="sale">
          Sale
        </Link>
      </div>
      <div className="icons2">
        <div className="account-container">
          {isAuthenticated ? (
            <div className="logged-in">
              <div
                className="log"
                onClick={handleDropdownToggle}
                aria-expanded={isDropdownOpen}
              >
                <p className="loginn">Account</p>
                <FontAwesomeIcon icon={faUser} size="lg" className="user2" />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu" role="menu">
                  <span
                    onClick={handleLogout}
                    className="dropdown-item"
                    role="menuitem"
                  >
                    Log Out
                  </span>
                  <span
                    onClick={handleDeleteAccount}
                    className="dropdown-item"
                    role="menuitem"
                  >
                    Delete Account
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="log" onClick={() => navigate("/login")}>
              <p className="loginn">Log In</p>
              <FontAwesomeIcon icon={faUser} size="lg" className="user2" />
            </div>
          )}
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            className="search"
            onClick={() =>
              navigate("/search-results", { state: { searchQuery } })
            }
          />
        </div>
        <FontAwesomeIcon
          icon={faCartShopping}
          size="lg"
          className="cart"
          onClick={toggleSidebar}
        />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <CartSidebar />
      </div>
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </div>
  );
}

export default Header;
