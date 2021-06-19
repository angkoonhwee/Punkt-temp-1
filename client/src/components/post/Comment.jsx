import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function Comment({ comm }) {
  const [user, setUser] = useState({});
  const { user: currUser } = useContext(UserContext);
  const PublicImg = process.env.REACT_APP_PUBLIC_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${comm.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [comm.userId]);

  return (
    <div className="post-user-comments">
      <img
        className="profilePic"
        src={
          user.profilePicture
            ? PublicImg + user.profilePicture
            : PublicImg + "defaultDP.svg"
        }
        alt="profile-pic"
      ></img>
      <div className="comment-content">
        <p>
          <strong>{user.username}</strong>
        </p>

        <p>{comm.comment}</p>
      </div>
    </div>
  );
}
