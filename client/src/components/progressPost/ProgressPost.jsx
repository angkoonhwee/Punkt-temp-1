import React from "react";
import "./progressPost.css";
import Post from "../post/Post";

export default function ProgressPost({ pPost, onDelete, goal, index }) {
  const startDate = new Date(goal.createdAt);
  const currDate = new Date(pPost.createdAt);

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

    return Math.ceil((utc2 - utc1) / _MS_PER_DAY);
  }
  // day no. was originally calculated using dateDiffInDays(startDate, currDate)

  return (
    <div className="progress-post">
      <div className="status-day">{`Day ${index}`}</div>
      <Post post={pPost} onDelete={onDelete} />
    </div>
  );
}
