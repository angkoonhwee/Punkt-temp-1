import React, { useState } from "react";
import "./postNoteTodo.css";

export default function TodoItem({ item }) {
  const [isDone, setDone] = useState(false);

  function handleCheck() {
    setDone(!isDone);
  }
  return (
    <form className="delete-todo">
      {/* <div className="todo-item">
    <input type="checkbox" name="checkbox" />
    <p>test</p>
  </div> */}
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input type="checkbox" onChange={handleCheck} />
          <span className="checkbox-custom "></span>
        </label>
        <div className={isDone ? "input-title todo-done" : "input-title"}>
          {item.item}
        </div>
        {/* add todo-done when input is checked using onChange handler */}
      </div>
    </form>
  );
}
