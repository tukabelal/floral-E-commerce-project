import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "https://api.escuelajs.co/api/v1/users/" 
      : "https://api.escuelajs.co/api/v1/auth/login"; 

    const data = isSignup
      ? {
          email,
          password,
          name: "Test User",
          avatar: avatar || "https://via.placeholder.com/150", 
        }
      : { email, password };

    console.log("Request Payload:", data);

    try {
      const response = await axios.post(url, data, { headers: { "Content-Type": "application/json" } });
      console.log("API Response:", response.data); 

      if (isSignup) {
        setMessage("Signup successful! You can now log in.");
      } else {
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token); 
        setMessage("Login successful!");
        navigate("/"); }
      setError(""); 
    } catch (err) {
      console.error("Error Details:", err.response?.data || err.message); 

      const errorMessage = Array.isArray(err.response?.data?.message)
        ? err.response?.data?.message.join(", ")
        : err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      setMessage(""); 
    }
  };

  return (
    <div className="login">
      <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FontAwesomeIcon icon={faUser} size="s" style={{ color: "#3f4e18" }} className="user" />
        <br />
        <br />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon icon={faLock} size="s" style={{ color: "#3f4e18" }} className="lock" />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`toggle-password ${passwordVisible ? "active" : ""}`}
          >
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              size="s"
              style={{ color: "#3f4e18" }}
            />
          </button>
        </div>
        <br />
        <button className="logbut" type="submit">
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>
      <br />
      <button
        className="toggle-signup"
        onClick={() => {
          setIsSignup(!isSignup);
          setError("");
          setMessage("");
        }}
      >
        {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default Login;