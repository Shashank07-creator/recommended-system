var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("comment", commentSchema);
