var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
  cover_img: String,
  title: String,
  link: String,
  plot: String
});

module.exports = mongoose.model("movie", movieSchema);
