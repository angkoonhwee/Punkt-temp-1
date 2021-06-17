import React from "react";
import "./post.css";

export default function ImgActive({ image }) {
  return (
    <div className="carousel-item active">
      <img src={image} alt="post-img"></img>
    </div>
  );
}
