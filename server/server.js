const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Access-Control-Allow-Origin"],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Connected!");
});

io.on("connection", (socket) => {
  socket.on("join room", ({ roomId, name }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user joined", name);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user left", name);
    });
  });

  socket.on("chat message", (msg) => {
    io.to(msg.roomId).emit("chat message", msg);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

