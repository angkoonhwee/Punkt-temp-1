import React from "react";
import "./forgotPassword.css";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import Footer from "../../components/footer/Footer";

export default function ForgotPassword() {
  return (
    <>
      <NavbarHome />
      <div className="container-success">
        <form className="form-login" action="/forgot-password" method="POST">
          <br />
          <h2 className="form-title">Forgot Password?</h2>
          <p>
            Enter your email address to receive further instructions to reset
            your password.
          </p>
          <div className="input-field" id="input-long">
            <i className="fas fa-envelope"></i>
            <input type="emaill" name="username" placeholder="Email Address" />
          </div>
          <button className="bton" type="submit" name="button">
            Send Email
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
