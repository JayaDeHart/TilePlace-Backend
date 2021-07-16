
const BoardState = require("../models/boardState");

async function getBoard (req, res, next) {
  try {
    const currentState = await BoardState.findOne();
    res.json({ state: currentState });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "failed" });
  }
}

async function updateBoard (req, res, next) {
  try {
    let { x, y, color } = req.body;
    let tostring = `state.${y}.${x}`;
    const board = await BoardState.findOneAndUpdate(
      { test: "test" },
      { $set: { [tostring]: color } }
    );
    res.status(200).json({ message: "saved" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "can not place that tile" });
  }
}

exports.getBoard = getBoard;
exports.updateBoard = updateBoard;