import React from "react";
import "./homeContentTop.css";
import { Link } from "react-router-dom";

function HomeContentTop() {
  const publicDir = process.env.REACT_APP_PUBLIC_URL;
  console.log(publicDir);
  return (
    <div
      className="container-bg-img"
      // style={{
      //   backgroundImage: "url(assets/img/home-v2.png)",
      // }}
    >
      <div className="container top">
        <h1>Get Productive with Punkt.</h1>
        <p>
          Procrastination breeds mediocrity and mediocrity breeds
          procrastination.
        </p>
        <p>Stop this vicious cycle of mediocrity with Punkt today!</p>
        <p>( •̀ ω •́ )✧</p>

        <Link to="/signup">
          <button className="bton" type="button" id="home-signup">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomeContentTop;
