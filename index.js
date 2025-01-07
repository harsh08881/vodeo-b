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

app.listen(PORT);


