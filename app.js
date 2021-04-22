const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
const BoardState = require("./models/boardState");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

async function initBoard() {
  try {
    let existingState = await BoardState.findOne();
    if (!existingState) {
      function gridMaker(rows, columns, color) {
        let grid = [];

        for (let x = 0; x < rows; x++) {
          grid.push([]);
          for (let y = 0; y < columns; y++) {
            grid[x].push(color);
          }
        }
        return grid;
      }
      const initialGrid = new BoardState({
        test: "test",
        state: gridMaker(180, 320, "#FFFFFF"),
      });
      try {
        await initialGrid.save();
      } catch (err) {
        console.log(err);
        console.log("something fucked up");
        return;
      }
    } else {
      return;
    }
  } catch (err) {
    console.log("something really fucked up");
    return;
  }
}

initBoard();

app.get("/boardstate", async function (req, res, next) {
  try {
    const currentState = await BoardState.findOne();
    res.json({ state: currentState });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "failed" });
  }
});

app.post("/boardstate", async function (req, res, next) {
  //we're expecting req.body to contain information about a single changed pixel in the format
  //{x:int,y:int,color:string};
  //keep in mind the first row of information is represented by x=0, likewise the first column is y=0
  console.log(req.body);
  let { x, y, color } = req.body;
  try {
    let currentState = await BoardState.findOne().orFail();
    let newboardState = currentState.state;
    newboardState[y][x] = color;
    let newstate = await BoardState.findOneAndUpdate(
      { test: "test" },
      { state: newboardState },
      { new: true }
    ).orFail();
    res.status(200).json({ newstate });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "can not place that tile" });
  }
});

io.on("connection", (socket) => {
  BoardState.watch().on("change", (data) => {
    socket.emit("update", data);
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log("listening 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
