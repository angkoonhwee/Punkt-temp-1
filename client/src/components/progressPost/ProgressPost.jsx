import React from "react";
import "./progressPost.css";
import { Users, Posts } from "../../dummyDate";
import Post from "../post/Post";

export default function ProgressPost({ pPost }) {
  const startDate = new Date(2021, 4, 30);
  const currDate = pPost.createdAt;
  // console.log(currDate.substring(0, 4));

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(
      parseInt(b.substring(0, 4)),
      parseInt(b.substring(5, 7)) - 1,
      parseInt(b.substring(8, 10))
    );

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
