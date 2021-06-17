import React from "react";
import "./loginSignup.css";
import stepToSunImg from "./step-to-sun.svg";
import amongNatureImg from "./among-nature.svg";

function LoginSignupPanels() {
  // function handleLogin() {
  //   document.querySelector("#login-btn").addEventListener("click", () => {
  //     document.querySelector(".container-main").classList.remove("signup-mode");
  //   });
  // }

  // function handleSignup() {
  //   document.querySelector("#signup-btn").addEventListener("click", () => {
  //     document.querySelector(".container-main").classList.add("signup-mode");
  //   });
  // }
  function handleLogin() {
    document.querySelector(".container-main").classList.remove("signup-mode");
  }

  function handleSignup() {
    document.querySelector(".container-main").classList.add("signup-mode");
  }

  return (
    <div className="container-panels">
      <div className="panel signup-panel">
        <div className="content">
          <h3>New Here?</h3>
          <p>Enter your personal details and start your journey with us!</p>
          <button
            className="bton transparent"
            id="signup-btn"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>
        <img className="image" src={stepToSunImg} alt="step-to-sun" />
      </div>

      <div className="panel login-panel">
        <div className="content">
          <h3>One of Us?</h3>
          <p>
            To keep connected with us, please login with your personal details.
          </p>
          <button
            className="bton transparent"
            id="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <img className="image" src={amongNatureImg} alt="among-nature" />
      </div>
    </div>
  );
}

export default LoginSignupPanels;
