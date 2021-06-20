import React, { useContext, useRef, useState, useEffect } from "react";
import "./postNoteBet.css";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { TextareaAutosize } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PostNoteBet() {
  const { user } = useContext(UserContext);

  const [hasGoal, setHasGoal] = useState(user.goalId !== "");
  const [currGoal, setCurrGoal] = useState({});
  const [goal, setGoal] = useState({
    title: "",
    amount: "",
    days: "",
  });

  useEffect(() => {
    if (user.goalId !== "") {
      const fetchGoal = async () => {
        const res = await axios.get("/goal/" + user.goalId);
        console.log(res.data.postIds);
        setCurrGoal(res.data);
      };
      fetchGoal();
    }
  }, [user.goalId]);

  // const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // const currDays = Math.ceil(
  //   (new Date(currGoal.createdAt) - new Date()) / _MS_PER_DAY
  // );

  const currDays = currGoal.postIds?.length;

  const totalDays = currGoal.numDays;
  const currProgress = Math.round((currDays / totalDays) * 100);

  function handleChange(event) {
    const { name, value } = event.target;

    setGoal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function submitGoal(event) {
    event.preventDefault();
    const newGoal = {
      userId: user._id,
      title: goal.title,
      betAmount: goal.amount,
      numDays: goal.days,
    };

    try {
      await axios.post("/goal", newGoal);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setHasGoal(true);
    setGoal({
      title: "",
      amount: "",
      days: "",
    });
  }

  return (
    <div className="post-note-bet">
      <h3>My Betting Goals</h3>

      {hasGoal ? (
        <div>
          <p>
            <strong>Goal: </strong>
            {currGoal.title}
          </p>
          <p>
            <strong>Bet Amount: </strong>SGD {currGoal.betAmount}
          </p>
          <div className="progressbarWrapper">
            <div className="progressbar-text-wrapper">
              <p id="numDays">
                <strong>Progress: </strong>
              </p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  // aria-valuenow="10"
                  // aria-valuemin="0"
                  // aria-valuemax="30"
                  style={{ width: currProgress + "%" }}
                >
                  {currProgress + "%"}
                </div>
              </div>
              <p className="buddy-days">
                {currDays + " / " + totalDays + " days"}
              </p>
            </div>
            <Link to="/progress">
              <Fab aria-label="edit" className="record-cirlce">
                <EditIcon />
              </Fab>
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-bet-text">
          <form onSubmit={submitGoal}>
            <div className="bet-component">
              <strong>Goal: </strong>
              <TextareaAutosize
                name="title"
                value={goal.title}
                className="set-goal"
                placeholder="State your goal(s)"
                onChange={handleChange}
                required
              />
            </div>
            <div className="bet-component">
              <strong>Bet Amount: </strong>
              <input
                className="set-goal"
                type="number"
                placeholder="Amount"
                name="amount"
                value={goal.amount}
                onChange={handleChange}
                required
                min="0"
              ></input>
            </div>
            <div className="bet-component">
              <strong>No. of Days: </strong>
              <input
                className="set-goal"
                type="number"
                placeholder="No. of Days"
                name="days"
                value={goal.days}
                onChange={handleChange}
                required
                min="7"
              ></input>
            </div>
            <div className="bet-btn-wrapper">
              <button className="record-bet" type="submit">
                <i className="fas fa-pen"></i>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
