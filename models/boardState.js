const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BoardStateSchema = new Schema({
  test: { type: String },
  state: [[]],
});

const BoardState = mongoose.model("BoardState", BoardStateSchema);

module.exports = BoardState;
