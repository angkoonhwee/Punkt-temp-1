import React, { useContext, useEffect, useState } from "react";
import BetStatus from "../../components/betStatus/BetStatus";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ProgressTimeline from "../../components/progressTimeline/ProgressTimeline";
import RecordStatus from "../../components/recordStatus/RecordStatus";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import SetBet from "../../components/setBet/SetBet";
import "./progress.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Progress() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const { user } = useContext(UserContext);
  const username = useParams().username;
  // const [user, setUser] = useState({});
  // const username = useParams().username;

  return (
    <div>
      <NavbarMain />
      <div className="container-progress">
        <BetStatus user={user} />
        {!username || username === user.username ? (
          <RecordStatus />
        ) : (
          <SetBet />
        )}

        <ProgressTimeline username={user.username} />
      </div>
      <ScrollTop />
      <Footer />
    </div>
  );
}
