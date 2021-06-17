import React from "react";
import "./footer.css";

// import { Container } from './styles';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container-fluid foot">
        <a
          className="footer-contact"
          href="https://github.com/Xiaoyunnn/Punkt-Orbital-2021"
        >
          Contact Us
        </a>
        <p>Punkt. {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
