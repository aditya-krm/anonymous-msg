const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Connected!");
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("join room", ({ roomId, name }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user joined", name);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user left", name);
      console.log("User disconnected");
    });
  });

  socket.on("chat message", (msg) => {
    io.to(msg.roomId).emit("chat message", msg);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
