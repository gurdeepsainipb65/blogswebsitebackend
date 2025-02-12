const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogs_router = require("./routes/blogs_router");
const user_router = require("./routes/user_router");
const session = require("express-session");
const passport = require("passport");
import "./passportConfig.js";
const app = express();

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google Authentication Route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, resp) => {
    resp.redirect("/dashboard"); // Redirect to dashboard after successful login
  }
);

// Logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

mongoose
  .connect(
    "mongodb+srv://gurdeepsainig2001:1uIX4u1TFnHq05fU@cluster0.owdx5.mongodb.net/blogs"
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((erro) => {
    console.log(erro);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogs_router);
app.use("/api/user", user_router);

app.listen(4000, () => {
  console.log("App running at http://localhost:4000");
});
