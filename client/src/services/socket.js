import { io } from "socket.io-client";

// Connect to your backend port cleanly
const socket = io("http://localhost:5000", {
  autoConnect: false, // We will explicitly trigger connection when entering battle screens
  withCredentials: true
});

export default socket;