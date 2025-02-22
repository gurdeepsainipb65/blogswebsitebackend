const express = require("express");
const user_router = express.Router();
const User = require("../models/user_models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

user_router.get("/", async (req, resp) => {
  const users = await User.find();
  resp.json({ users: users });
});

user_router.post("/register", async (req, resp) => {
  const { username, password, email } = req.body;
  const existing_user = await User.findOne({ email });

  if (existing_user) {
    return resp.json({ message: "user is already exist" });
  }

  const hash_password = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash_password, email });
  resp.json({ success: "user created successfully" });
});

user_router.post("/login", async (req, resp) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return resp.json({ message: "user not exist(signup if you are new user)" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return resp.json({ message: "Invalid Credentials" });
  }
  const token = await jwt.sign({ userId: user._id },"mysecret12345");
  return resp.json({ access_token: token });
});

module.exports = user_router;
