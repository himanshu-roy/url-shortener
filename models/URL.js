const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  urlCode: String,
  time: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("url", urlSchema);
