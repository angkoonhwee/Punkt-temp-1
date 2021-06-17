import React from "react";
import "./progressPost.css";
import { Users, Posts } from "../../dummyDate";
import Post from "../post/Post";

export default function ProgressPost({ pPost }) {
  const startDate = new Date(2021, 5, 30);
  const currDate = pPost.day;

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.ceil((utc2 - utc1) / _MS_PER_DAY) + 1;
  }

  return (
    <div className="progress-post">
      <div className="status-day">{`Day ${dateDiffInDays(
        startDate,
        currDate
      )}`}</div>
      <Post post={pPost} />
    </div>
  );
}
