const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  type: String,
  uid: Number,
  name: String,
  tagline: String,
  schedule: Date,
  description: String,
  image: String,
  moderator: String,
  category:String,
  sub_category: String,
  rigor_rank: Number,
  attendees: [],
});

module.exports = mongoose.model("event", eventSchema);
