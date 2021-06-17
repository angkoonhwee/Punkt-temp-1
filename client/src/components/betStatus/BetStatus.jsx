import React from "react";
import { render } from "react-dom";

// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./betStatus.css";

export default function BetStatus() {
  const currDays = 10;
  const totalDays = 30;
  const currProgress = Math.round((currDays / totalDays) * 100);

  return (
    <div className="bet-status">
      <div className="status-top">
        <div className="status-name">
          <img
            className="profilePic post-profile"
            src="/assets/img/defaultDP.svg"
          ></img>
          <p className="post-name">Username</p>
        </div>
        <h2>「 Study for 6h a day 」</h2>
      </div>
      <div className="status-middle">
        <div className="middle-component">
          <h4>
            <strong>Amount:</strong>
          </h4>
          <h4>SGD 5.00</h4>
        </div>

        <div className="middle-component">
          <h4>
            <strong>Progress:</strong>
          </h4>
          <h4>{currDays + " / " + totalDays}</h4>
        </div>

        <div className="middle-component">
          <h4>
            <strong>Status:</strong>
          </h4>
          <h4>In Progress</h4>
        </div>
      </div>
    </div>
  );
}
