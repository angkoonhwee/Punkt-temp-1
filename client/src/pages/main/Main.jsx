import React, { useState, useEffect } from "react";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import Rightbar from "../../components/rightbar/Rightbar";
import "./main.css";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import axios from "axios";
import { useParams } from "react-router-dom";

function Main() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = username
        ? await axios.get(`/user?username=${username}`)
        : await axios.get("/");
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <NavbarMain />
      <div className="container-success">
        <Feed username={username} />
        <Rightbar />
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
}

export default Main;
