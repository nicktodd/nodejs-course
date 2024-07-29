const mongoose = require("mongoose");

const CompactDiscSchema = mongoose.Schema(
  {
    title: String,
    artist: String,
    price: Number,
    tracks: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("CompactDisc", CompactDiscSchema);
