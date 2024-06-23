import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    const footerPosition = document.querySelector(".footer").offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;
    if (scrollPosition >= footerPosition) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <footer className={`footer ${isVisible ? "visible" : ""}`}>
      <div className="footer-column">
        <h3>Address</h3>
        <p>123 Main Street, city, country, pin-code</p>
      </div>
      <div className="footer-column">
        <h3>Email</h3>
        <p>contact@spacepark.com</p>
      </div>
      <div className="footer-column">
        <h3>Phone No</h3>
        <p>+123 456 7890</p>
      </div>
      <div className="footer-column">
        <h3>Social Icons</h3>
        <div className="social-icons">
          <a href="#!" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#!" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#!" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#!" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
{
  /* <a href="#" className="social-icon">
<FontAwesomeIcon icon={faLinkedinIn} />
</a> */
}
