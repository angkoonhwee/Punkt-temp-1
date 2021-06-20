import React, { useEffect, useState, useContext } from "react";
import "./progressTimeline.css";
import Post from "../post/Post";
import ProgressPost from "../progressPost/ProgressPost";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function ProgressTimeline({ user, goal }) {
  const [posts, setPosts] = useState([]);
  // const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user.goalId) {
        const res = await axios.get("/post/goal/" + user.goalId);

        setPosts(
          res.data.sort(
            (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
          )
        );
      }
    };
    fetchPosts();
  }, [user.goalId]);

  return (
    <div className="progress-timeline">
      <h2>Progress</h2>
      {posts.map((p, index) => (
        <ProgressPost
          key={p._id}
          pPost={p}
          index={posts.length - index}
          goal={goal}
        />
      ))}
      {/* {posts.map((p, index) => <ProgressPost key={p.id} pPost={p} />).reverse()} */}
    </div>
  );
}
