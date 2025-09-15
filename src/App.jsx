import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import Footer from "./components/footer";
import ToolsPage from "./components/toolsPage";
import ProductDetails from "./components/productDetails";
import PlantsPage from "./components/plants";
import Home from "./components/home";
import Sale from "./components/sale";
import SearchResults from "./components/searchResult";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", 
    });
  }, [pathname]);

  return null;
}
function App() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("access_token");

  useEffect(() => {
    if (location.pathname === "/login") {
      document.body.classList.add("login-wallpaper");
    } else {
      document.body.classList.remove("login-wallpaper");
    }
    return () => document.body.classList.remove("login-wallpaper");
  }, [location.pathname]);

  return (
    <div>
      {location.pathname !== "/login" && <Header />}
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route
          path="/plants/:id"
          element={<ProductDetails category="plants" />}
        />
        <Route
          path="/tools/:id"
          element={<ProductDetails category="toolsAndPots" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;