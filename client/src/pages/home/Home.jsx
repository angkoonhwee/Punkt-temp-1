import React from "react";
import Footer from "../../components/footer/Footer";
import HomeContentBottom from "../../components/homeContent/HomeContentBottom";
import HomeContentMiddle from "../../components/homeContent/HomeContentMiddle";
import HomeContentTop from "../../components/homeContent/HomeContentTop";
import NavbarHome from "../../components/navbarHome/NavbarHome";

import "./home.css";

function Home() {
  return (
    <div>
      <NavbarHome />
      <HomeContentTop />
      <HomeContentMiddle />
      <HomeContentBottom />
      <Footer />
    </div>
  );
}

export default Home;
