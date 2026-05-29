const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");

const session = require("express-session");

const passport = require("passport");

dotenv.config();

require("./config/passport");

const app = express();

const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,

    resave: false,

    saveUninitialized: false,
  }),
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;
