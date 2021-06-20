import React, { useState, useEffect, useContext, useRef } from "react";
import "./post.css";
import ReportIcon from "@material-ui/icons/Report";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Fab from "@material-ui/core/Fab";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { TextareaAutosize } from "@material-ui/core";
// import { Users } from "../../dummyDate";
import ImgActive from "./ImgActive";
import ImgRest from "./ImgRest";
import Comment from "./Comment";
import Report from "../report/Report";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import axios from "axios";
import { format, render, cancel, register } from "timeago.js";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

/* *********************************************************************** */

export default function Post({ post }) {
  const PublicImg = process.env.REACT_APP_PUBLIC_URL;
  const [isLit, setIsLit] = useState(false);
  const [numLit, setNumLit] = useState(post.lits.length);
  const [isCommenting, setIsCommenting] = useState(false);
  const [numComment, setNumComment] = useState(post.comments.length);
  // const comm = useRef();
  const [comment, setComment] = useState("");
  // const [amtBetFor, setAmtBetFor] = useState()
  const [isBetFor, setBetFor] = useState(false);
  const [isBetAgainst, setBetAgainst] = useState(false);
  const [user, setUser] = useState({});
  const { user: currUser } = useContext(UserContext);
  const [allComments, setAllComments] = useState(post.comments);
  const [goal, setGoal] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLit(post.lits.includes(currUser._id));
  }, [currUser._id, post.lits]);

  useEffect(() => {
    const fetchGoal = async () => {
      const res = user.goalId && (await axios.get("/goal/" + user.goalId));
      user.goalId && setGoal(res.data);
    };
    fetchGoal();
  }, [user.goalId]);

  const currDays = goal.postIds?.length;
  const totalDays = goal.numDays;

  function handleLit() {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currUser._id });
    } catch (err) {
      console.log(err);
    }
    setNumLit(isLit ? numLit - 1 : numLit + 1);
    setIsLit(!isLit);
  }

  function handleComment() {
    setIsCommenting(!isCommenting);
  }

  function handleBetFor() {
    setBetFor(true);
  }

  function handleBetAgainst() {
    setBetAgainst(true);
  }

  async function submitComment(event) {
    event.preventDefault();
    try {
      await axios.put("/post/" + post._id + "/comment", {
        userId: currUser._id,
        comment: comment,
        createdAt: new Date(),
      });
      const res = await axios.get("/post/" + post._id + "/comment");

      // console.log(res.data);
      setAllComments(res.data);
      setNumComment(numComment + 1);
    } catch (err) {
      console.log(err);
    }

    setComment("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setComment(value);
  }

  async function deletePost(postId) {
    try {
      await axios.delete("/post/" + postId, { data: currUser });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  // function handleKeyPress(event) {
  //   console.log("onsubmit" + onsubmit);
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     // submitComment(onsubmit);
  //   }
  // }

  // console.log(Users.filter((u) => u.id === post.userId)[0].username);

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`profile/${user.username}`}>
              <img
                // src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
                src={
                  user.profilePicture
                    ? PublicImg + user.profilePicture
                    : PublicImg + "defaultDP.svg"
                }
                alt="profilePic"
                className="profilePic post-profile"
              ></img>
            </Link>
            <div className="profile-name-date">
              <p className="post-name">
                {/* {Users.filter((u) => u.id === post.userId)[0].username} */}
                {user.username}
              </p>
              <p className="post-date">{format(post.createdAt)}</p>
            </div>
          </div>

          <div className="post-top-right">
            {currUser._id === post.userId ? (
              <DeleteIcon
                onClick={() => deletePost(post._id)}
                style={{ cursor: "pointer", color: "#16697a" }}
              />
            ) : (
              <Report />
            )}
          </div>
        </div>
        <div className="post-middle">
          <p>{post?.desc}</p>

          <div
            id="post-imgs"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {post.img.map((p, index) => {
                return index === 0 ? (
                  <ImgActive key={index} image={PublicImg + p} />
                ) : (
                  <ImgRest key={index} image={PublicImg + p} />
                );
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#post-imgs"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#post-imgs"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <Link
          to={"/progress/" + user.username}
          style={{ textDecoration: "none" }}
        >
          <div className="post-goal-section">
            <div className="post-goal-content">
              <div className="goal-bet-amount">
                <p>
                  <strong>SGD: </strong>
                  {goal.betAmount}
                </p>
              </div>
              <div className="goal-title">
                <p>
                  <strong>Goal: </strong>
                  {goal.title}
                </p>
              </div>
            </div>
            <div className="goal-progress">
              <p>
                <strong>Progress: </strong>
                {currDays + " / " + totalDays}
              </p>
            </div>
          </div>
        </Link>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <div className="post-bottom-left-btn">
              <Fab
                id="fire-icon"
                onClick={handleLit}
                style={{
                  backgroundColor: isLit ? "rgb(255 101 132)" : "#95c9d4b0",
                }}
              >
                <WhatshotIcon />
              </Fab>
              <p className="post-lit-counter">{numLit} lits</p>
            </div>

            <div className="post-bottom-left-btn">
              <Fab
                id="comment-icon"
                onClick={handleComment}
                style={{
                  backgroundColor: isCommenting ? "#daa078fa" : "#95c9d4b0",
                }}
              >
                <ModeCommentIcon />
              </Fab>
              <p className="post-lit-counter"> {numComment} comments</p>
            </div>

            <div className="post-bottom-left-btn">
              <Fab
                id="fire-icon"
                style={{
                  backgroundColor: isBetFor ? "rgb(57, 153, 57)" : "#95c9d4b0",
                }}
              >
                <i class="far fa-laugh-wink"></i>
              </Fab>
              <p className="post-lit-counter">${goal.amtBetFor}</p>
            </div>

            <div className="post-bottom-left-btn">
              <Fab
                id="fire-icon"
                style={{
                  backgroundColor: isBetAgainst
                    ? "rgb(201, 90, 90)"
                    : "#95c9d4b0",
                }}
              >
                <i className="far fa-meh" />
              </Fab>
              <p className="post-lit-counter">${goal.amtBetAgainst}</p>
            </div>
          </div>
          <div className="post-comment">
            {isCommenting && (
              <div>
                {allComments.map((c, index) => (
                  <Comment key={index} comm={c} />
                ))}

                <form className="comment-form" onSubmit={submitComment}>
                  <div className="comment-container">
                    <TextareaAutosize
                      name="postComment"
                      value={comment}
                      className="comment-area"
                      placeholder="Write your comments"
                      onChange={handleChange}
                      // ref={comm}
                    />
                    <button type="submit">Comment</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
