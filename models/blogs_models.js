const mongoose = require("mongoose");

const blogschema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  categary: { type: String },
  description: { type: String },
});
const blogs = mongoose.model("blogs", blogschema);
module.exports = blogs;
