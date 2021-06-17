import React, { useState } from "react";
import "./setBet.css";

export default function SetBet() {
  const [isBetFor, setIsBetFor] = useState(false);
  const [isBetAgainst, setIsBetAgainst] = useState(false);
  const [betAmountFor, setBetAmountFor] = useState("");
  const [betAmountAginst, setBetAmountAgainst] = useState("");

  function handleIsBetFor() {
    setIsBetFor(!isBetFor);
  }

  function handleIsBetAgainst() {
    setIsBetAgainst(!isBetAgainst);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "bet-amount-for") {
      setBetAmountFor(value);
    } else if (name === "bet-amount-against") {
      setBetAmountAgainst(value);
    }
  }

  function submitBetFor(event) {
    setBetAmountFor("");
    event.preventDefault();
  }

  function submitBetAgainst(event) {
    setBetAmountAgainst("");
    event.preventDefault();
  }

  return (
    <div className="set-bet">
      <div className="set-bet-wrapper">
        <button
          class="bet-button bet-for"
          style={{
            backgroundColor: isBetFor ? "rgb(57, 153, 57)" : "rgb(80, 170, 80)",
          }}
          onClick={handleIsBetFor}
        >
          I believe in you!
        </button>
        {isBetFor && (
          <div className="bet-amount">
            <form onSubmit={submitBetFor}>
              <input
                className="bet-input"
                type="number"
                placeholder="Amount"
                name="bet-amount-for"
                value={betAmountFor}
                onChange={handleChange}
              ></input>
              <button className="bet-btn" type="submit">
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="set-bet-wrapper">
        <button
          class="bet-button bet-against"
          style={{
            backgroundColor: isBetAgainst
              ? "rgb(201, 90, 90)"
              : "rgb(216, 111, 111)",
          }}
          onClick={handleIsBetAgainst}
        >
          This is impossible!
        </button>
        {isBetAgainst && (
          <div className="bet-amount">
            <form onSubmit={submitBetAgainst}>
              <input
                className="bet-input"
                type="number"
                placeholder="Amount"
                name="bet-amount-against"
                value={betAmountAginst}
                onChange={handleChange}
              ></input>
              <button type="submit" className="bet-btn">
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
