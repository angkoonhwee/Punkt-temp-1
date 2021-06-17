import React from "react";
import "./post.css";

export default function ImgRest({ image }) {
  return (
    <div className="carousel-item">
      <img src={image} alt="post-img"></img>
    </div>
  );
}
