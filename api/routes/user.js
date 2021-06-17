// jshint esversion: 8
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

// GET USER
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    // const user = await User.findById(req.params.userId);
    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  // console.log(req.body);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      async.waterfall(
        [
          (done) => {
            crypto.randomBytes(20, (err, buf) => {
              if (err) {
                console.log(err);
              } else {
                const token = buf.toString("hex");
                done(err, token);
              }
            });
          },
          (token, done) => {
            // console.log("req.body: " + req.body);

            User.findOne(
              {
                email: req.body.email,
              },
              (err, user) => {
                if (err) {
                  console.log(err);
                }
                if (!user) {
                  // console.log(
                  //   "error",
                  //   "No account with that email address exists."
                  // );
                  return res
                    .status(403)
                    .json({ msg: "email has not been registered" });
                  // return res.render("forgot", {
                  //   forgotErr: "Email has not been registered.",
                  //   forgotSuccess: "",
                  // });
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 1200000; // 20min

                user.save((err) => {
                  if (err) {
                    console.log(err);
                  }
                  done(err, token, user);
                });
              }
            );
          },
          (token, user, done) => {
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "punkt.orbital@gmail.com",
                pass: process.env.GMAILPW,
              },
            });
            const mailOptions = {
              from: "punkt.orbital@gmail.com",
              to: user.email,
              subject: "Punkt Password Reset",
              text:
                "Dear " +
                user.username +
                ", \n\n" +
                "You are receiving this because you have requested the reset of the password for your account.\n\n" +
                "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
                "http://" +
                req.headers.host +
                "/reset/" +
                token +
                "\n\n" +
                "If you did not request for password reset, please ignore this email and your password will remain unchanged.\n\n" +
                "Punkt Developer Team",
            };
            transporter.sendMail(mailOptions, function (err) {
              // console.log('mail sent');
              console.log(
                "success",
                "An email has been sent to " +
                  user.username +
                  " with further instructions."
              );
              // res.render("forgot", {
              //   forgotErr: "",
              //   forgotSuccess:
              //     "Please check your email (including spam mail) at " +
              //     user.email +
              //     " for further instructions.",
              // });
              done(err, "done");
            });
          },
        ],
        (err) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          // res.redirect("/forgot-password");
        }
      );
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your account.");
  }
});

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId === req.params.id) {
    res.status(403).json("You cannot follow yourself");
  } else {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);

      if (!userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        await currUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You are already following this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId === req.params.id) {
    res.status(403).json("You cannot unfollow yourself");
  } else {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);

      if (userToUnfollow.followers.includes(req.body.userId)) {
        await userToUnfollow.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You are not following this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
