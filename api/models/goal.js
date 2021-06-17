const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    goalId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 500,
    },
    numDays: {
      type: Number,
      default: 0,
    },
    betAmount: {
      type: Number,
      default: 0,
    },
    userBetFor: {
      type: Array,
      default: [],
    },
    userBetAgainst: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
