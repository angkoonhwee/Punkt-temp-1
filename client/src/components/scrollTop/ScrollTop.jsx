import React, { useState } from "react";
import "./scrollTop.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", handleVisible);

  return (
    <button
      id="scrollTop"
      style={{ display: visible ? "block" : "none" }}
      onClick={scrollToTop}
    >
      <KeyboardArrowUpIcon />
    </button>
  );
}
