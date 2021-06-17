import React from "react";
import "./navbarHome.css";
import HelpIcon from "@material-ui/icons/Help";
import { Link } from "react-router-dom";

function NavbarHome() {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" id="punkt" href="/">
          Punkt.
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link nav-home-name"
                id="home-nav-btn"
                href="https://github.com/Xiaoyunnn/Punkt-Orbital-2021"
              >
                Help
                {/* <HelpIcon className="searchIcon navbar-icon" /> */}
                {/* <p className="nav-name">Help</p> */}
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="home-nav-btn" to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="home-nav-btn" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* <img src="/assets/img/buddy.svg"> */}
    </div>
  );
}

export default NavbarHome;
