import React, { useEffect, useState, useContext } from "react";
import { render } from "react-dom";
import axios from "axios";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./betStatus.css";

export default function BetStatus({ user, goal }) {
  const PublicImg = process.env.REACT_APP_PUBLIC_URL;
  const [latestPost, setLatestPost] = useState({});

  const currDays = goal.postIds?.length;
  const totalDays = goal.numDays;

  useEffect(() => {
    const fetchLatestPost = async () => {
      if (goal.postIds && goal.postIds.length > 0) {
        const res = await axios.get(
          `/post/${goal.postIds[goal.postIds.length - 1]}`
        );
        setLatestPost(res.data);
      }
    };
    fetchLatestPost();
  }, [goal.postIds]);

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      a.getFullYear(),
      a.getMonth(),
      a.getDate(),
      a.getHours(),
      a.getMinutes()
    );

    const utc2 = Date.UTC(
      b.getFullYear(),
      b.getMonth(),
      b.getDate(),
      b.getHours(),
      b.getMinutes()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  function checkProgress() {
    const startDate = new Date(goal.createdAt);
    const currDate = latestPost.createdAt
      ? new Date(latestPost.createdAt)
      : new Date();
    // console.log(currDate);

    if (dateDiffInDays(startDate, currDate) > 1) {
      return "Failed";
    } else if (currDays < totalDays) {
      return "In Progress";
    } else {
      return "Success";
    }
  }

  return (
    <div className="bet-status">
      <div className="status-top">
        <div className="status-name">
          <img
            className="profilePic post-profile"
            src={
              user.profilePicture
                ? PublicImg + user.profilePicture
                : PublicImg + "defaultDP.svg"
            }
            alt="profilePic"
          ></img>
          <p className="post-name">{user.username}</p>
        </div>
        <h2>「 {goal.title} 」</h2>
      </div>
      <div className="status-middle">
        <div className="middle-component">
          <h4>
            <strong>Amount:</strong>
          </h4>
          <h4>SGD {goal.betAmount}</h4>
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
          <h4>{checkProgress()}</h4>
        </div>
      </div>
    </div>
  );
}
