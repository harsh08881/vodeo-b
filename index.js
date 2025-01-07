const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic Express Route
app.get("/", (req, res) => {
  res.send("Socket.IO and Express server is running!");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins, replace with your frontend URL in production
  },
});

// Socket.IO Connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    // Notify all users about the new connection
    socket.broadcast.emit("user-connected", { userId: socket.id });
  
    socket.on("offer", (data) => {
      socket.broadcast.emit("offer", data);
    });
  
    socket.on("answer", (data) => {
      socket.broadcast.emit("answer", data);
    });
  
    socket.on("ice-candidate", (data) => {
      socket.broadcast.emit("ice-candidate", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  

// Start server locally (for testing only)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
 });


