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

export default function BetStatus({ user }) {
  const currDays = 10;
  const totalDays = 30;
  const currProgress = Math.round((currDays / totalDays) * 100);
  const PublicImg = process.env.REACT_APP_PUBLIC_URL;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post/profile/" + user.username);

      setPosts(res.data);
    };
    fetchPosts();
  }, [user.username]);

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
