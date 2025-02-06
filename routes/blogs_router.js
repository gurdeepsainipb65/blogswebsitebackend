const express = require("express");
const Blogs_router = express.Router();
const Blogs = require("../models/blogs_models");
const bodyParser = require("body-parser");

Blogs_router.get("/", async (req, resp) => {
  const blogs = await Blogs.find();
  resp.json({ blogs: blogs });
});

Blogs_router.post("/add", async (req, resp) => {
  const { name, image, categary, description } = req.body;
  await Blogs.create({ name, image, categary, description });
  resp.json({ success: "blogs created" });
});


module.exports = Blogs_router;
