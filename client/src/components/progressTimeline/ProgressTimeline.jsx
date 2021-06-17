import React from "react";
import "./progressTimeline.css";
import { Users, Posts } from "../../dummyDate";
import Post from "../post/Post";
import ProgressPost from "../progressPost/ProgressPost";

export default function ProgressTimeline() {
  return (
    <div className="progress-timeline">
      <h2>Progress</h2>
      {Posts.map((p, index) => <ProgressPost key={p.id} pPost={p} />).reverse()}
    </div>
  );
}
