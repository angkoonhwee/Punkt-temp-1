import React, { useState, useEffect, useContext } from "react";
// import { Posts } from "../../dummyDate";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function Feed({ username, page }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : page === "main"
        ? await axios.get("/post/main/" + user._id) // main page render user and followings posts
        : await axios.get("/post"); //explore page render all posts
      // to add speculating page that render posts which user has bet for
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [username, user._id, page]);

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
