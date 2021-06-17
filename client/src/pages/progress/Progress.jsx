import React from "react";
import BetStatus from "../../components/betStatus/BetStatus";
import Footer from "../../components/footer/Footer";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import ProgressPost from "../../components/progressPost/ProgressPost";
import ProgressTimeline from "../../components/progressTimeline/ProgressTimeline";
import RecordStatus from "../../components/recordStatus/RecordStatus";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import SetBet from "../../components/setBet/SetBet";
import "./progress.css";

export default function Progress() {
  return (
    <div>
      <NavbarMain />
      <div className="container-progress">
        <BetStatus />
        <RecordStatus />
        <SetBet />
        <ProgressTimeline />
      </div>
      <ScrollTop />
      <Footer />
    </div>
  );
}
