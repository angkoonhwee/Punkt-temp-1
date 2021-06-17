import React from "react";
import "./homeContentMiddle.css";
import { Link } from "react-router-dom";

function HomeContentBottom() {
  return (
    <div
      className="container-bottom-bg"
      // style={{
      //   backgroundImage: "url(assets/img/sign-up.svg)",
      // }}
    >
      <div className="container bottom">
        <h1>Let's Put a Punkt to our Procrastination.</h1>
        <p>
          Punkt raises the stakes of your study sessions and gives you the
          external push to stop procrastinating.
        </p>
        <p>
          Give yourself a head start academically and financially with Punkt!
        </p>
        <Link to="/signup">
          <button className="bton" type="button" id="home-signup">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomeContentBottom;
