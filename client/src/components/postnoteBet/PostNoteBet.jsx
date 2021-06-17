import React, { useState } from "react";
import "./postNoteBet.css";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { TextareaAutosize } from "@material-ui/core";

export default function PostNoteBet() {
  const currDays = 10;
  const totalDays = 30;
  const currProgress = Math.round((currDays / totalDays) * 100);
  // document
  //   .getElementsByClassName("progress-bar")[0]
  //   .setAttribute("aria-valuenow", 10 / 30);
  // document
  //   .getElementsByClassName("progress-bar")[0]
  //   .setAttribute("style", "width:" + Number(10 / 30) + "%");

  const [goal, setGoal] = useState({
    title: "",
    amount: "",
    days: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setGoal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function submitGoal(event) {
    setGoal({
      title: "",
      amount: "",
      days: "",
    });
    event.preventDefault();
  }

  return (
    <div className="post-note-bet">
      <h3>My Betting Goals</h3>
      {/* <p>
        <strong>Goal: </strong>Study for 6 hours a day
      </p>
      <p>
        <strong>Bet Amount: </strong>SGD 5.00
      </p> */}

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

      {/* <div className="progressbarWrapper">
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
          <p className="buddy-days">{currDays + " / " + totalDays + " days"}</p>
        </div>
        <Fab aria-label="edit" className="record-cirlce">
          <EditIcon />
        </Fab>
      </div> */}
    </div>
  );
}
