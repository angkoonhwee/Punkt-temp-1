import React, { useState } from "react";
import "./postNoteTodo.css";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import TodoItem from "./TodoItem";
import { Users, Todos } from "../../dummyDate";

export default function PostNoteTodo() {
  const currDays = 21;
  const totalDays = 30;
  const currProgress = Math.round((currDays / totalDays) * 100);

  return (
    <div className="post-note-todo">
      <h3>Todos with Buddy</h3>
      <p className="todayDate">
        <strong>Date:</strong> {new Date().toDateString()}
      </p>

      <div className="progressbarWrapper">
        <div className="progress buddy">
          <div
            className="progress-bar buddy"
            role="progressbar"
            // aria-valuenow="10"
            // aria-valuemin="0"
            // aria-valuemax="30"
            style={{ width: currProgress + "%" }}
          >
            {currProgress + "%"}
          </div>
        </div>
      </div>
      <p className="buddy-days">{currDays + " / " + totalDays + " days"}</p>
      {Todos.map((t) => (
        <TodoItem key={t.id} item={t} />
      ))}

      <div className="chat-btn-container">
        <button className="note-chat">
          <i className="far fa-laugh-squint"></i>
          Chat with buddy
        </button>
      </div>
    </div>
  );
}
