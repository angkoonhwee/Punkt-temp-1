import React from "react";
import { useContext, useRef, useState } from "react";
import "./recordStatus.css";
import { TextareaAutosize } from "@material-ui/core";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function RecordStatus() {
  const { user } = useContext(UserContext);
  const desc = useRef("");

  const [file, setFile] = useState(null);
  const [isDisabled, setDisabled] = useState(false);
  const [recordText, setRecordText] = useState("");

  // function handleDisable() {

  // }

  function submitRecord(event) {
    setDisabled(true);
    setRecordText("");
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      axios.post("/post", newPost);
    } catch (err) {}
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRecordText(value);
  }

  return (
    <div className="record-status">
      <form
        className="record-form"
        disabled={isDisabled}
        onSubmit={isDisabled ? false : submitRecord}
      >
        <div className="record-container">
          <TextareaAutosize
            name="record-text"
            value={recordText}
            ref={desc}
            className="record-area"
            placeholder="Have you completed your goals today? (You can only record once a day)"
            disabled={isDisabled}
            onChange={handleChange}
            style={{ cursor: isDisabled ? "not-allowed" : "text" }}
          />
          <div className="record-bottom">
            <label
              htmlFor="file"
              className="shareOption"
              style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
            >
              <PermMedia
                htmlColor={isDisabled ? "grey" : "rgb(255 101 132)"}
                className="shareIcon"
              />
              <span className="shareOptionText">Image</span>
              <input
                style={{
                  display: "none",
                }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                disabled={isDisabled}
                onChange={(e) => setFile(e.target.files)}
              />
            </label>
            <button
              type="submit"
              disabled={isDisabled}
              style={{
                cursor: isDisabled ? "not-allowed" : "pointer",
                backgroundColor: isDisabled ? "grey" : "rgb(247, 176, 25)",
              }}
            >
              Record
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
