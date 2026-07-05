import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [currentBattleRoom, setCurrentBattleRoom] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        // FIXED: Using a mutable ref ensures ONE persistent connection channel across re-renders
        if (!socketRef.current) {
            socketRef.current = io("http://localhost:5000", {
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });
        }

        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("⚡ Connected to matchmaking gateway:", socket.id);
            setIsConnected(true);
        });

        socket.on("match_found", (roomData) => {
            console.log("⚔️ Match Verified! Room ID:", roomData.roomId);
            setIsSearching(false);
            setCurrentBattleRoom(roomData);
        });

        socket.on("disconnect", (reason) => {
            console.warn("❌ Socket disconnected:", reason);
            setIsConnected(false);
            // If it disconnected unexpectedly while queuing, preserve state to avoid jarring routing kicks
            if (reason === "io server disconnect") {
                setIsSearching(false);
            }
        });

        return () => {
            // Clean up event listeners instead of aggressively shutting down the socket connection stream
            socket.off("connect");
            socket.off("match_found");
            socket.off("disconnect");
        };
    }, []);

    const startMatchmaking = (userProfile) => {
        const socket = socketRef.current;
        if (!socket || !socket.connected) {
            console.error("Cannot queue: Socket is not connected.");
            return;
        }
        setIsSearching(true);
        setCurrentBattleRoom(null);
        socket.emit("join_queue", userProfile);
    };

    const cancelMatchmaking = () => {
        const socket = socketRef.current;
        if (!socket) return;
        setIsSearching(false);
        socket.emit("leave_queue");
    };

    return (
        <SocketContext.Provider value={{ 
            socket: socketRef.current, 
            isSearching, 
            currentBattleRoom, 
            isConnected,
            startMatchmaking, 
            cancelMatchmaking 
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useBattleSocket = () => useContext(SocketContext);