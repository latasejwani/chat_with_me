const { log } = require("console");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
