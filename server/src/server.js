require("dotenv").config();
const http = require("http");
const socketio = require("socket.io");

const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  console.warn("Failed to set DNS servers:", err.message);
}

const app = require("./app");
const connectDB = require("./config/db");
const { initSocketManager } = require("./services/socket.service");

const PORT = process.env.PORT || 5000;

// 1. Establish database connection vectors
connectDB();

// 2. Wrap Express App into a raw Node HTTP server framework
const server = http.createServer(app);

// 3. Initialize Socket.io with secure Cross-Origin Resource Sharing boundaries
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 4. Attach the isolated Multiplayer Arena matchmaking logic
initSocketManager(io, app);

// 5. Fire up the unified server listener
server.listen(PORT, () => {
  console.log(`🚀 Unified HTTP & WebSocket Server running on port ${PORT}`);
});