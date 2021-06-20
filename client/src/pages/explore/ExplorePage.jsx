import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import Rightbar from "../../components/rightbar/Rightbar";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import axios from "axios";

export default function Explore() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [user, setUser] = useState({});

  return (
    <>
      <NavbarMain />
      <div className="container-success">
        <Feed page="explore" />
        <Rightbar />
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}
