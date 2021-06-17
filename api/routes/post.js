const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
const User = require("../models/user");
const flash = require("express-flash");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Post = require("../models/post");

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER POSTS
router.get("/profile/:username", async (req, res) => {
  // const currUser = User.findById(req.body.userId);
  try {
    console.log(req.params.username);
    const currUser = await User.findOne({ username: req.params.username });
    const userPosts = await Post.find({ userId: currUser._id });

    // const allPosts = await Post.find();
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FOLLOWING POSTS & USER POSTS
router.get("/main/:userId", async (req, res) => {
  // const currUser = User.findById(req.body.userId);
  try {
    const currUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currUser._id });
    const friendPosts = await Promise.all(
      currUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    // const allPosts = await Post.find();
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json("The post you are requesting does not exist.");
    } else if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated.");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json("The post you are requesting does not exist.");
    } else if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted.");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.lits.includes(req.body.userId)) {
      await post.updateOne({ $pull: { lits: req.body.userId } });
      res.status(200).json("The post has been unliked");
    } else {
      await post.updateOne({ $push: { lits: req.body.userId } });
      res.status(200).json("The post has been liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
