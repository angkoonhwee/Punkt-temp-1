import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import "./recordStatus.css";
import { TextareaAutosize } from "@material-ui/core";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
  AllInboxSharp,
} from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function RecordStatus() {
  const { user } = useContext(UserContext);
  const desc = useRef("");

  const [files, setFiles] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [recordText, setRecordText] = useState("");

  async function submitRecord(event) {
    // setDisabled(true);
    // setRecordText("");
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      goalId: 123,
      img: [],
    };

    if (files.length > 0) {
      const data = new FormData();
      let fileNames = [];

      files.forEach((f) => {
        // const fileExtension = (f.name.match(/\.+[\S]+$/) || [])[0];
        // fileNames.push(`${Date.now()}${f.name}`);
        fileNames.push(f.name);
      });

      files.forEach((f) => {
        // const fileExtension = (f.name.match(/\.+[\S]+$/) || [])[0];
        data.append("file", f);
        // data.append("name", `${Date.now()}${f.name}`);
        data.append("name", f.name);
      });

      // data.append("name", fileNames);
      // data.append("file", files);
      newPost.img = fileNames;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post("/post", newPost);
    } catch (err) {
      console.log(err);
    }

    setRecordText("");
    setFiles([]);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRecordText(value);
  }

  function handleUpload(event) {
    console.log(event.target.files);
    let fileList = [];
    for (let i = 0; i < event.target.files.length; i++) {
      fileList.push(event.target.files[i]);
    }

    setFiles(fileList);
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
                multiple
                onChange={handleUpload}
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
