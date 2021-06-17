import React from "react";
import "./signup.css";
import Footer from "../../components/footer/Footer";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import LoginSignupForms from "../../components/loginSignupForms/LoginSignupForms";
import LoginSignupPanels from "../../components/loginSignupForms/LoginSignupPanels";

// import { Container } from './styles';

function Signup() {
  return (
    <>
      <NavbarHome />
      <div className="container-main signup-mode">
        <LoginSignupForms />
        <LoginSignupPanels />
      </div>
      <Footer />
    </>
  );
}

export default Signup;
