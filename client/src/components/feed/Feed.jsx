import React, { useState, useEffect, useContext } from "react";
// import { Posts } from "../../dummyDate";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/main/" + user._id);
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
}

export default Feed;
