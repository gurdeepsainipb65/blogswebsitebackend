const express = require("express");
const Blogs_router = express.Router();
const Blogs = require("../models/blogs_models");
const jwt = require("jsonwebtoken");


function verifyToken(req, resp, next) {
  const token = req.headers.authorization;
  if (!token) {
    return resp.json({ success: false, message: "Access Denied" });
  }
  try {
    const data = jwt.verify(token, "mysecret12345");
    req.user = data;
    next();
  } 
  catch(err){
    console.log(err)
  }
};

Blogs_router.get("/", async (req, resp) => {
  const blogs = await Blogs.find().populate("user");
  resp.json({ blogs: blogs });
});

Blogs_router.post("/add", verifyToken, async (req, resp) => {
  const { name, image, categary, description } = req.body;
  await Blogs.create({
    name,
    image,
    categary,
    description,
    user: req.user.userId,
  });
  resp.json({ success: "blogs created" });
});

Blogs_router.get("/userblog", verifyToken, async (req, resp) => {
  const userId = req.user.userId;
  const userblog = await Blogs.find({user:userId})
  resp.json({ blogs: userblog });
}),
 

module.exports = Blogs_router;
