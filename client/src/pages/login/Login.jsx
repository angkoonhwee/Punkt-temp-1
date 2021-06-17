import React from "react";
import "./login.css";
import Footer from "../../components/footer/Footer";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import LoginSignupForms from "../../components/loginSignupForms/LoginSignupForms";
import LoginSignupPanels from "../../components/loginSignupForms/LoginSignupPanels";


function Login() {
  return (
    <>
      <NavbarHome />
      <div className="container-main">
        <LoginSignupForms />
        <LoginSignupPanels />
      </div>
      <Footer />
    </>
  );
}

export default Login;
