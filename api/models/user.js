const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

// const userSchema = new mongoose.Schema({
//   username: String,
//   displayName: String,
//   password: String,
//   googleId: String,
//   posts: Array,
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
// });

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    speculatings: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    productivityPoints: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 9999,
    },
    totalAmtWon: {
      type: Number,
      default: 0,
    },
    totalAmtLost: {
      type: Number,
      default: 0,
    },
    betFor: {
      type: Array,
      default: [],
    },
    betAgainst: {
      type: Array,
      default: [],
    },
    buddyHistory: {
      type: Array,
      default: [],
    },
    goalHistory: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = User;
