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
    const userGoal = await Goal.findById(currUser.goalId);

    // const allPosts = await Post.find();
    res.status(200).json(userGoal);
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

// GET USERS BET FOR & INDIV AMT
router.get("/:id/bet-for", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal.usersBetFor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USERS BET AGAINST & INDIV AMT
router.get("/:id/bet-against", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal.usersBetFor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE AMT BET FOR
router.put("/:id/bet-for", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    console.log(goal);
    // const user = await Goal.find({"usersBetFor.userId": req.body.userId})
    await goal.updateOne({ $push: { usersBetFor: req.body } }); // req.body should contain userId and amount
    await goal.updateOne({ $inc: { amtBetFor: req.body.amt } });
    await user.updateOne({
      $push: { betFor: { goalId: req.params.id, amt: req.body.amt } },
    });
    res.status(200).json("You have successfully bet for this goal.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE AMT BET AGAINST
router.put("/:id/bet-against", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    console.log(goal);
    // const user = await Goal.find({"usersBetFor.userId": req.body.userId})
    await goal.updateOne({ $push: { usersBetAgainst: req.body } }); // req.body should contain userId and amount
    await goal.updateOne({ $inc: { amtBetAgainst: req.body.amt } });
    await user.updateOne({
      $push: { betAgainst: { goalId: req.params.id, amt: req.body.amt } },
    });
    res.status(200).json("You have successfully bet against this goal.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
