const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic Express Routes
app.get("/", (req, res) => {
  res.send("Socket.IO and Express server is running!");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust for production)
    methods: ["GET", "POST"],
  },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle message reception
  socket.on("send-message", (data) => {
    console.log("Message received:", data);
    io.emit("receive-message", data); // Broadcast the message to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server locally (for testing only)
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
