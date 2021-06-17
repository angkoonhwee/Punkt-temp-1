import React from "react";
import "./post.css";

export default function Comment({ comm }) {
  return (
    <div className="post-user-comments">
      <img
        className="profilePic"
        src="/assets/img/defaultDP.svg"
        alt="profile-pic"
      ></img>
      <div className="comment-content">
        <p>
          <strong>Username</strong>
        </p>

        <p>{comm}</p>
      </div>
    </div>
  );
}
