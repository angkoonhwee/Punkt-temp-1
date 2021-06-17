require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");
const formidableMiddleware = require("express-formidable");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const app = express();

mongoose.connect("mongodb://localhost:27017/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);

// middleware
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.urlencoded({ extended: true }));

// app.use(express.static("public"));
app.use(helmet());
app.use(morgan("common"));
// app.use(formidableMiddleware());

app.use(
  session({
    secret: "Orbital 2021 Punkt.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
    // cookie: { secure: true }
  })
);

// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    // console.log(req.files);
    // cb(null, file.originalname);
    // const { originalname } = file;
    // const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    // cb(null, `${Date.now()}${originalname}`);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("file", 5), (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    return res.status(200).json("Files uploaded successfully");
  } catch (err) {
    console.log(err);
  }
}); // max count 6

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
