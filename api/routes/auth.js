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
const crypto = require("crypto");

schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(50) // Maximum length 50
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1); // Must have at least 1 digits

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/punkt",
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      console.log(accessToken);

      User.findOrCreate(
        {
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.name.familyName + profile.name.givenName,
          profilePicture: profile.photos[0].value,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// router.get(
//   "/google/punkt",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//   }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     console.log("successful authentication with google");
//     res.status(200).json("successful authentication with google");
//   }
// );
router.get("/google/punkt", passport.authenticate("google"), (req, res) => {
  if (req.user) {
    res.redirect(`http://localhost:3000/`);
  } else {
    res.redirect(`http://localhost:3000/login`);
  }
});

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.redirect(`http://localhost:8000/`);
//   } else res.redirect(`http://localhost:3000/login`);
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "user failed to authenticate.",
//   });
// });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

// SIGN UP
router.post("/signup", async (req, res) => {
  const errors = [];

  // const newUser = await new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  if (!schema.validate(req.body.password)) {
    // password do not match requirements
    errors.push({
      msg: "Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit.",
    });
  }

  const duplicateUsername = await User.findOne({
    username: req.body.username,
  });
  const duplicateEmail = await User.findOne({ email: req.body.email });

  try {
    if (duplicateUsername) {
      errors.push({
        msg: "Username has been registered",
      });
    }

    if (duplicateEmail) {
      errors.push({
        msg: "Email has been registered",
      });
    }

    if (errors.length > 0) {
      res.status(403).json(errors);
      // console.log(errors);
    } else {
      User.register(
        {
          email: req.body.email,
          username: req.body.username,
        },
        req.body.password,
        (err, result) => {
          if (err) {
            console.log(err);
            // res.render("failure");
          } else {
            passport.authenticate("local")(req, res, () => {
              res.status(200).json("successfully logged in");
            });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  let loginErrors = [];

  if (!req.body.email || !req.body.password) {
    loginErrors.push({
      msg: "Please fill in all fields.",
    });
  }

  const foundUser = await User.findOne({ email: req.body.email });

  try {
    if (!foundUser) {
      loginErrors.push({
        msg: "Invalid Email.",
      });
    } else {
      loginErrors.push({
        msg: "Invalid Password. Try Again.",
      });
    }

    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(403).json(loginErrors);
      }

      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", function (req, res, next) {
  // console.log("req.headers.host: " + req.headers.host);

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
              console.log(
                "error",
                "No account with that email address exists."
              );
              return res.render("forgot", {
                forgotErr: "Email has not been registered.",
                forgotSuccess: "",
              });
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
          // console.log('success', 'An email has been sent to ' + user.username + ' with further instructions.');
          res.render("forgot", {
            forgotErr: "",
            forgotSuccess:
              "Please check your email (including spam mail) at " +
              user.email +
              " for further instructions.",
          });
          done(err, "done");
        });
      },
    ],
    (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.redirect("/forgot-password");
    }
  );
});

router.get("/reset/:token", function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
    function (err, user) {
      if (!user) {
        // console.log('error', 'Password reset token is invalid or has expired.');
        // return res.redirect('/login');
        return res.render("forgot", {
          forgotErr: "Password reset token is invalid or has expired.",
          forgotSuccess: "",
        });
      } else {
        res.render("reset", {
          token: req.params.token,
          // resetSuccess: "",
          // resetErr: []
        });
      }
    }
  );
});

router.post("/reset/:token", (req, res) => {
  const resetErr = [];

  async.waterfall(
    [
      (done) => {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
              $gt: Date.now(),
            },
          },
          (err, user) => {
            if (err) {
              console.log(err);
            }

            if (!user) {
              // console.log("error", 'Password reset token is invalid or has expired.');
              // return res.redirect('/login');
              return res.render("forgot", {
                forgotErr: "Password reset token is invalid or has expired.",
                forgotSuccess: "",
              });
            } else {
              if (req.body.password !== req.body.password2) {
                // resetErr.push({
                //   msg: "Passwords do not match."
                // });
                req.flash("resetErr", "Passwords do not match.");
                return res.redirect("back");
              } else if (!schema.validate(req.body.password)) {
                // password do not match requirements
                // resetErr.push({
                //   msg: "Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit."
                // });
                req.flash(
                  "resetErr",
                  "Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit."
                );
                return res.redirect("back");
                // }
                // console.log(resetErr);
                //
                // if (resetErr.length > 0) {
                //   console.log(req.body);
                //   // return res.render("reset", {
                //   //   resetErr: resetErr,
                //   //   resetSuccess: "",
                //   //   token: req.body.token
                //   // });
                //   req.flash('resetErr', 'Flash is back!');
                //   return res.redirect("back");
              } else {
                user.setPassword(req.body.password, (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function (err) {
                      req.login(user, function (err) {
                        done(err, user);
                      });
                    });
                  }
                });
              }
            }
          }
        );
      },
      (user, done) => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "punkt.orbital@gmail.com",
            pass: process.env.GMAILPW,
          },
        });

        const mailOptions = {
          to: user.email,
          from: "punkt.orbital@gmail.com",
          subject: "Your password has been changed",
          text:
            "Dear " +
            user.username +
            ",\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n\n" +
            "Punkt Developer Team",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            console.log(err);
          } else {
            // console.log('success', 'Success! Your password has been changed.');
            // res.render("reset", {
            //   // resetErr: [],
            //   resetSuccess: 'Success! Your password has been changed.',
            //   token: req.body.token
            // });
            req.flash(
              "resetSuccess",
              "Yay! Your password has been changed successfully."
            );
            done(err);
          }
        });
      },
    ],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    }
  );
});

module.exports = router;
