const mongoose = require("mongoose");

const blogschema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  categary: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
});
const blogs = mongoose.model("blogs", blogschema);
module.exports = blogs;
