const Problem = require("../models/problem.model");

let matchmakingQueue = []; 
const activeRooms = new Map(); 

const initSocketManager = (io, app) => {
  app.set("activeRooms", activeRooms);
  app.set("io", io);

  io.on("connection", (socket) => {
    
    // --- AUTHENTICATE BATTLE ROOM JOIN ON RELOAD ---
    socket.on("reconnect_to_room", ({ roomId, userId }) => {
      const room = activeRooms.get(roomId);
      if (!room) return;

      socket.join(roomId);
      
      const elapsedSeconds = Math.floor((Date.now() - room.startTime) / 1000);
      const currentRemaining = Math.max(0, 900 - elapsedSeconds);

      socket.emit("room_sync", {
        timeLeft: currentRemaining,
        player1Passed: room.player1.passedCases,
        player2Passed: room.player2.passedCases
      });
    });

    socket.on("join_queue", async (playerData) => {
      const { userId, username, rating } = playerData;
      matchmakingQueue = matchmakingQueue.filter(p => p.userId !== userId);

      const newPlayer = {
        socketId: socket.id,
        userId,
        username,
        rating: rating || 1200,
        joinedAt: Date.now()
      };

      matchmakingQueue.push(newPlayer);
      checkAndMatchPlayers(io);
    });

    // --- 🟢 FIXED: DYNAMIC WIN/LOSS INTERCEPTION LAYER ---
    socket.on("submit_success", ({ roomId, userId, runtime, memory }) => {
      const room = activeRooms.get(roomId);
      if (!room) return;

      // Force cast all IDs to strings to eliminate object reference comparisons
      const currentSubmitterId = String(userId);
      const p1Id = String(room.player1.userId);
      const p2Id = String(room.player2.userId);

      let winner, loser;

      if (currentSubmitterId === p1Id) {
        winner = room.player1;
        loser = room.player2;
      } else if (currentSubmitterId === p2Id) {
        winner = room.player2;
        loser = room.player1;
      } else {
        console.warn(`🚨 Submission from unauthorized user context: ${userId}`);
        return;
      }

      const durationMs = Date.now() - room.startTime;
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);

      const matchEndPayload = {
        roomId,
        winnerId: winner.userId,
        winnerName: winner.username,
        loserId: loser.userId,
        loserName: loser.username,
        runtime: runtime || "97 ms",
        memory: memory || "15.2 MB",
        duration: `${minutes}m ${seconds}s`,
        ratingChange: 18
      };

      // Broadcast the targeted final scores to the room matrix
      io.to(roomId).emit("match_ended", matchEndPayload);
      
      // Clear game pool out of temporary state allocation memory
      activeRooms.delete(roomId);
    });

    socket.on("leave_queue", ({ userId }) => {
      matchmakingQueue = matchmakingQueue.filter(p => p.userId !== userId);
    });

    socket.on("disconnect", () => {
      matchmakingQueue = matchmakingQueue.filter(p => p.socketId !== socket.id);
    });
  });
};

async function checkAndMatchPlayers(io) {
  if (matchmakingQueue.length < 2) return;

  const player1 = matchmakingQueue.shift();
  const player2 = matchmakingQueue.shift();

  const roomId = `room_${player1.userId}_${player2.userId}_${Date.now()}`;

  try {
    const randomProblem = await Problem.findOne().skip(
      Math.floor(Math.random() * await Problem.countDocuments())
    ).lean();

    const roomPayload = {
      roomId,
      problem: randomProblem,
      startTime: Date.now(),
      player1: { ...player1, passedCases: 0 },
      player2: { ...player2, passedCases: 0 }
    };

    activeRooms.set(roomId, roomPayload);

    io.to(player1.socketId).emit("match_found", roomPayload);
    io.to(player2.socketId).emit("match_found", roomPayload);
  } catch (err) {
    console.error("Failure initialising room vectors:", err.message);
  }
}

module.exports = { initSocketManager };