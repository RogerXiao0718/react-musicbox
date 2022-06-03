const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("client connected!");

  socket.on("add music", (musicId) => {
    console.log(`client added music ${musicId}`);
  });

  socket.on("delete music", musicId => {
    console.log(`client delete music ${musicId}`);
  });
});

//TODO: app.use()
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

httpServer.listen("4000", () => {
  console.log("Server is now listening in port 4000!");
});
