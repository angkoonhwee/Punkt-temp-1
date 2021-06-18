import React, { useRef } from "react";
import "./resetPassword.css";
import NavbarHome from "../../components/navbarHome/NavbarHome";
import Footer from "../../components/footer/Footer";

export default function ResetPassword() {
  const password = useRef();
  const password2 = useRef();
  function checkPassword(input) {
    var passwordReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return input.match(passwordReq);
  }

  function submitReset(event) {
    event.preventDefault();
    if (!checkPassword(password.current.value)) {
      password.current.setCustomValidity(
        "Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit."
      );
    } else if (password.current.value !== password2.current.value) {
      password.current.setCustomValidity("Passwords do not match.");
    } else {
      const user = {
        // username: signupUsername.current.value,
        // email: signupEmail.current.value,
        password: password.current.value,
        password2: password2.current.value,
      };
      // try {
      //   await axios.post("auth/signup", user);
      //   // history.push("/login");
      //   loginCall(
      //     {
      //       email: signupEmail.current.value,
      //       password: signupPassword.current.value,
      //     },
      //     dispatch
      //   );
      // } catch (err) {
      //   console.log(err);
      // }
    }
  }

  return (
    <>
      <NavbarHome />
      <div class="container-success">
        <form class="form-login" action="/reset/" onSubmit={submitReset}>
          <br />
          <h2 class="form-title">Reset Password</h2>

          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              ref={password}
            />
          </div>

          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              required
              ref={password2}
            />
          </div>

          <button class="bton" type="submit" name="button">
            Reset
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
