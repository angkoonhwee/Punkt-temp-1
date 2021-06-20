const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 500,
      required: true,
    },
    numDays: {
      type: Number,
      required: true,
    },
    betAmount: {
      type: Number,
      required: true,
    },
    postIds: {
      type: Array,
      default: [],
    },
    usersBetFor: {
      type: [{ userId: String, amt: Number }],
      default: [],
    },
    usersBetAgainst: {
      type: [{ userId: String, amt: Number }],
      default: [],
    },
    amtBetFor: {
      type: Number,
      default: 0,
    },
    amtBetAgainst: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
