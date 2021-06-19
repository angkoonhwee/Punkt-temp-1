const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("../models/user");
const Goal = require("../models/goal");
const async = require("async");

// GET GOAL
router.get("/:id", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER GOALS
router.get("/profile/:username", async (req, res) => {
  // const currUser = User.findById(req.body.userId);
  try {
    // console.log(req.params.username);
    const currUser = await User.findOne({ username: req.params.username });
    const userGoals = await Goal.find({ userId: currUser._id });

    // const allPosts = await Post.find();
    res.status(200).json(userGoals);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE GOAL
router.post("/", async (req, res) => {
  const newGoal = new Goal(req.body);

  try {
    const user = await User.findByIdAndUpdate(req.body.userId, {
      $set: { goalId: newGoal._id },
    });

    const savedGoal = await newGoal.save();
    res.status(200).json(savedGoal);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
