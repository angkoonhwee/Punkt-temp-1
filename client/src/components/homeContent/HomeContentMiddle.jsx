import React from "react";
import "./homeContentMiddle.css";
import betImg from "./bet.svg";
import buddyImg from "./buddy.svg";
import tierImg from "./tier.svg";

function HomeContentMiddle() {
  return (
    <div className="container-middle">
      <div className="feature">
        <div className="feature-desc">
          <h2>Bet with Your Friends!</h2>
          <p>Studying feels bland and pointless?</p>
          <p>
            If you complete your goals, you take all the money! Else, your
            friends get to split the amount you bet!
          </p>
        </div>
        <img src={betImg} alt="betting-system" />
      </div>
      <hr />

      <div className="feature reverse">
        {/* <img src="assets/img/buddy.svg" alt="buddy-system" /> */}
        <img src={buddyImg} alt="buddy-system" />
        <div className="feature-desc">
          <h2>Get Yourself a Buddy!</h2>
          <p>Lack the self-discipline to study on your own?</p>
          <p>
            Get paired with a buddy with a common background to study with and
            improve together!
          </p>
        </div>
      </div>
      <hr />

      <div className="feature">
        <div className="feature-desc">
          <h2>Climb the Leaderboard!</h2>
          <p>Need peer pressure to stay motivated?</p>
          <p>
            Accomplish your goals and watch yourself climb up the "Productivity"
            Leaderboard!
          </p>
        </div>
        <img src={tierImg} alt="tier-system" />
      </div>
    </div>
  );
}

export default HomeContentMiddle;
