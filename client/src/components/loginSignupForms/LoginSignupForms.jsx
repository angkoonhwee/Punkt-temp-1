import React, { useState, useRef, useContext } from "react";
import "./loginSignup.css";
import { Link, useHistory } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { UserContext } from "../../context/UserContext";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

function LoginSignupForms() {
  // const [loginInfo, setLoginInfo] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [signupInfo, setSignupInfo] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   password2: "",
  // });

  const history = useHistory();

  const loginEmail = useRef();
  const loginPassword = useRef();
  const { isFetching, dispatch } = useContext(UserContext);

  const signupUsername = useRef();
  const signupEmail = useRef();
  const signupPassword = useRef();
  const signupPassword2 = useRef();

  const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  // console.log(googleClientID);

  // function handleLoginChange(event) {
  //   const { name, value } = event.target;
  //   // console.log("name: " + name + " value: " + value);

  //   setLoginInfo((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // }

  // function handleSignupChange(event) {
  //   const { name, value } = event.target;
  //   // console.log("name: " + name + " value: " + value);

  //   setSignupInfo((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // }

  function submitLogin(event) {
    // setLoginInfo({
    //   title: "",
    //   amount: "",
    //   days: "",
    // });
    event.preventDefault();
    loginCall(
      {
        email: loginEmail.current.value,
        password: loginPassword.current.value,
      },
      dispatch
    );
  }

  function checkPassword(input) {
    var passwordReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return input.match(passwordReq);
  }

  const submitSignup = async (event) => {
    // setSignupInfo({
    //   username: "",
    //   email: "",
    //   password: "",
    //   password2: "",
    // });

    event.preventDefault();
    if (!checkPassword(signupPassword.current.value)) {
      signupPassword.current.setCustomValidity(
        "Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit."
      );
    } else if (signupPassword.current.value !== signupPassword2.current.value) {
      signupPassword.current.setCustomValidity("Passwords do not match.");
    } else {
      const user = {
        username: signupUsername.current.value,
        email: signupEmail.current.value,
        password: signupPassword.current.value,
        password2: signupPassword2.current.value,
      };
      try {
        await axios.post("auth/signup", user);
        // history.push("/login");
        loginCall(
          {
            email: signupEmail.current.value,
            password: signupPassword.current.value,
          },
          dispatch
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // async function googleLogin() {
  //   try {
  //     await axios.post("auth/google");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    // try {
    //   dispatch({ type: AUTH, data: { result, token } });

    //   history.push("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const googleError = (err) => {
    console.log(err);
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <div className="container-forms">
      <div className="signup-login">
        <form
          className="form-login"
          // action="/login"
          // method="POST"
          onSubmit={submitLogin}
        >
          <h2 className="form-title">Login to Punkt.</h2>
          <div className="google-login">
            <GoogleLogin
              clientId={googleClientID}
              render={(renderProps) => (
                <button
                  className="google-icon"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  // startIcon={<Icon />}
                  variant="contained"
                >
                  <i className="fab fa-google"></i> Login with Google
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </div>
          <p className="gmail-text">Or use your email account</p>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              // value={loginInfo.email}
              placeholder="Email Address"
              // onChange={handleLoginChange}
              ref={loginEmail}
              required
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              minLength="6"
              // value={loginInfo.password}
              placeholder="Password"
              // onChange={handleLoginChange}
              ref={loginPassword}
              required
            />
          </div>

          <Link className="forgot-pw" to="/forgot-password">
            Forgot your password?
          </Link>
          <button
            className="bton"
            type="submit"
            name="button"
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress id="progress-icon" size="20px" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <form
          className="form-signup"
          action="/signup"
          method="POST"
          onSubmit={submitSignup}
        >
          <h2 className="form-title">Create Account</h2>
          <div className="google-login">
            <Link to="/auth/google" className="google-icon">
              <i className="fab fa-google"></i> Login with Google
            </Link>
          </div>

          <p className="gmail-text">Or use your email for registration</p>

          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              // value={signupInfo.username}
              placeholder="Username"
              // onChange={handleSignupChange}
              required
              ref={signupUsername}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="emaill"
              name="email"
              // value={signupInfo.email}
              placeholder="Email Address"
              // onChange={handleSignupChange}
              required
              ref={signupEmail}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              minLength="6"
              // value={signupInfo.password}
              placeholder="Password"
              // onChange={handleSignupChange}
              required
              ref={signupPassword}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password2"
              minLength="6"
              // value={signupInfo.password2}
              placeholder="Confirm Password"
              // onChange={handleSignupChange}
              required
              ref={signupPassword2}
            />
          </div>

          <div className="pw-requirements">
            <p>
              Password must be at least 6 characters with at least 1 UPPER case,
              1 lower case and 1 numeric digit.
            </p>
          </div>

          <button
            className="bton"
            type="submit"
            name="button"
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress color="#267b99" size="20px" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginSignupForms;
