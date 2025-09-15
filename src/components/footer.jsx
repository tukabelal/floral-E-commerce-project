import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import "./footer.css";

function Footer() {
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const footerStyle = {
    backgroundColor: isLogin ? "black" : "#E1FABF",
  };

  const linkStyle = {
    color: isLogin ? "white" : "#3F4E18",
  };

  const textStyle = {
    color: isLogin ? "white" : "#3F4E18",
  };

  return (
    <>
      <div className="footer" style={footerStyle}>
        <Link to="/">
          <img
            src="/small logo for Bloom & Beyond plant shop.png"
            className="logo"
          />
        </Link>

        <h3>
          <pre className="blooom" style={textStyle}>
            Bloom & <br /> Beyond
          </pre>
        </h3>
        <span id="join" style={textStyle}>
          Join Our Garden
        </span>
        <h3 className="head" style={textStyle}>
          We'll tell you about monthly drops and plant care tips. <br />
          No spam, we promise.
          <br />
          <br />
          <br />
          <input type="text" className="email2" placeholder="Enter Email " />
          <br />
        </h3>
        <br />
        <FontAwesomeIcon
          icon={faPaperPlane}
          size="xsmall"
          className="send"
          style={linkStyle}
        />
        <br />
        <Link to="/aboutUs" className="about" style={linkStyle}>
          About Us
        </Link>
        <Link to="/privacy" className="privacy" style={linkStyle}>
          Privacy Policy
        </Link>
        <Link to="/terms" className="terms" style={linkStyle}>
          Terms & Conditions
        </Link>
        <Link to="/shipping" className="shipping" style={linkStyle}>
          Shipping Policy
        </Link>
        <Link to="/refund" className="refund" style={linkStyle}>
          Refund Policy
        </Link>
        <Link to="/cutomerService" className="custSer" style={linkStyle}>
          Cutomer Service
        </Link>
        <div className="icons">
          <FontAwesomeIcon
            icon={faFacebook}
            size="xl"
            className="facebook"
            style={linkStyle}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            size="xl"
            className="instagram"
            style={linkStyle}
          />
          <FontAwesomeIcon
            icon={faTwitter}
            size="xl"
            className="twitter"
            style={linkStyle}
          />
        </div>
      </div>
    </>
  );
}
export default Footer;
