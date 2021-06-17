import React from "react";
import PostNoteBet from "../postnoteBet/PostNoteBet";
import PostNoteTodo from "../postnoteTodo/PostNoteTodo";
import "./rightbar.css";

// import { Container } from './styles';

function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <PostNoteBet />
        <PostNoteTodo />
      </div>
    </div>
  );
}

export default Rightbar;
