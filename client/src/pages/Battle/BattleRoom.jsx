import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BattleHeader from "../../components/battle/BattleHeader";
import ProblemPanel from "../../components/workspace/ProblemPanel";
import CodeEditor from "../../components/workspace/CodeEditor";
import ConsolePanel from "../../components/workspace/ConsolePanel";
import EditorHeader from "../../components/workspace/EditorHeader";
import socket from "../../services/socket";

function BattleRoom() {
  const navigate = useNavigate();
  const roomData = JSON.parse(sessionStorage.getItem("activeMatchRoom") || "{}");
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

  const currentUserId = localUser._id || localUser.id;
  const isPlayer1 = roomData.player1?.userId === currentUserId;
  const coreRival = isPlayer1 ? roomData.player2 : roomData.player1;

  const [consoleHeight, setConsoleHeight] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const [matchTime, setMatchTime] = useState(900);
  
  const [myPassedScore, setMyPassedScore] = useState(0);
  const [rivalPassedScore, setRivalPassedScore] = useState(0);

  const workspaceRef = useRef(null);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("reconnect_to_room", { roomId: roomData.roomId, userId: currentUserId });

    socket.on("room_sync", ({ timeLeft, player1Passed, player2Passed }) => {
      setMatchTime(timeLeft);
      setMyPassedScore(isPlayer1 ? player1Passed : player2Passed);
      setRivalPassedScore(isPlayer1 ? player2Passed : player1Passed);
    });

    // 🟢 FIXED: ACCURATE VERDICT DISPATCH OVERRIDES
    socket.on("match_ended", (endPayload) => {
      // Coerce clean string casting parameters to verify identity matches
      const myIdStr = String(currentUserId);
      const winnerIdStr = String(endPayload.winnerId);
      
      const myFinalVerdict = myIdStr === winnerIdStr ? "Victory" : "Defeat";
      
      sessionStorage.setItem("battleOutcomeSummary", JSON.stringify({ 
        ...endPayload, 
        verdict: myFinalVerdict 
      }));
      
      socket.off("match_ended");
      socket.off("room_sync");
      
      navigate("/battle/result");
    });

    return () => {
      socket.off("match_ended");
      socket.off("room_sync");
    };
  }, [roomData.roomId, currentUserId, isPlayer1, navigate]);

  const startDragging = (e) => { e.preventDefault(); setIsDragging(true); };
  const stopDragging = useCallback(() => { setIsDragging(false); }, []);
  const onDragging = useCallback((e) => {
    if (!isDragging || !workspaceRef.current) return;
    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const newHeight = workspaceRect.bottom - e.clientY;
    if (newHeight >= 60 && newHeight <= workspaceRect.height * 0.8) {
      setConsoleHeight(newHeight);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDragging);
      window.addEventListener("mouseup", stopDragging);
    } else {
      window.removeEventListener("mousemove", onDragging);
      window.removeEventListener("mouseup", stopDragging);
    }
    return () => {
      window.removeEventListener("mousemove", onDragging);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging, onDragging, stopDragging]);

  return (
    <div className={`h-screen flex flex-col bg-[#1E1E1E] text-white overflow-hidden ${isDragging ? "select-none" : ""}`}>
      <BattleHeader 
        opponentName={coreRival?.username || "Opponent"}
        totalCases={roomData.problem?.testCasesCount || 1}
        passedCases={myPassedScore}
        opponentPassed={rivalPassedScore}
        overrideTimeLeft={matchTime}
      />

      <EditorHeader problemSlug={roomData.problem?.slug} isBattleMode={true} roomId={roomData.roomId} />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full min-h-0 overflow-hidden">
        <div className="overflow-y-auto border-r border-white/5 h-full min-w-0">
          <ProblemPanel problemData={roomData.problem} />
        </div>

        <div ref={workspaceRef} className="flex flex-col h-full overflow-hidden relative min-w-0">
          <div className="flex-1 min-h-0 w-full overflow-hidden">
            <CodeEditor isBattleMode={true} problemData={roomData.problem} />
          </div>

          <div onMouseDown={startDragging} className={`h-2 w-full cursor-row-resize transition-colors duration-150 relative z-50 flex items-center ${isDragging ? "bg-[#A3FF12]" : "bg-white/5 hover:bg-[#A3FF12]/50"}`}>
            <div className="absolute inset-x-0 mx-auto h-1px w-8 bg-white/20 pointer-events-none" />
          </div>

          <div style={{ height: `${consoleHeight}px` }} className="min-h-0 w-full overflow-hidden flex flex-col bg-[#1A1A1A] border-t border-white/5">
            <ConsolePanel isBattleMode={true} problemData={roomData.problem} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleRoom;