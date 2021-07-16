const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
const BoardState = require("./models/boardState");
const routes = require("./routes/routes")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
//use routes
app.use(routes);


//checks if a boardstate is in the DB, initializes a blank one if not
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
        console.log("something went wrong!");
        return;
      }
    } else {
      return;
    }
  } catch (err) {
    console.log("something went very wrong");
    return;
  }
}



initBoard();

//creates the socket.io connection
io.on("connection", (socket) => {
  socket.on("tilePlace", (data) => {
    io.emit("tilePlace", data);
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
