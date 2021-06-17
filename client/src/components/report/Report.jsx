import React, { useState } from "react";
import "./report.css";
import ReportIcon from "@material-ui/icons/Report";
import { TextareaAutosize } from "@material-ui/core";

export default function Report() {
  const [isReport, setIsReport] = useState(false);
  const [reason, setReason] = useState("");

  function handleClick() {
    setIsReport(!isReport);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setReason(value);
  }

  function submitReport(event) {
    setReason("");
    event.preventDefault();
  }

  return (
    <div className="report">
      <ReportIcon
        className="report-icon"
        onClick={handleClick}
        style={{ color: isReport ? "#be7f51fa" : "grey" }}
      />
      {isReport && (
        <div className="report-wrapper">
          <form onSubmit={submitReport}>
            <h4>Report</h4>
            <strong>Reason</strong>
            <TextareaAutosize
              name="report-reason"
              value={reason}
              className="reason-area"
              placeholder="Write your reason(s)"
              onChange={handleChange}
            />
            <button type="submit">Report</button>
          </form>
        </div>
      )}
    </div>
  );
}
