require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
const User = require("./models/user");
const flash = require("express-flash");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

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

const app = express();

mongoose.connect("mongodb://localhost:27017/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);

// middleware
app.use(express.json());
app.use("images", express.static(path.join(__dirname, "public/images")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use(helmet());
app.use(morgan("common"));

app.use(
  session({
    secret: "Orbital 2021 Punkt.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
    // cookie: { secure: true }
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("file", 6), (req, res) => {
  try {
    return res.status(200).json("Files uploaded successfully");
  } catch (err) {
    console.log(err);
  }
}); // max count 6

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);

// app.get("/", (req, res) => {
//   res.send("welcome");
// });

// app.get("/main", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render("dashboard");
//   } else {
//     res.redirect("/login");
//   }
// });

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
