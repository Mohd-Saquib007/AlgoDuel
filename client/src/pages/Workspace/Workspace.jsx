import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom"; 
import { ExecutionProvider } from "../../context/ExecutionContext";
import EditorHeader from "../../components/workspace/EditorHeader";
import ProblemPanel from "../../components/workspace/ProblemPanel";
import CodeEditor from "../../components/workspace/CodeEditor";
import ConsolePanel from "../../components/workspace/ConsolePanel";

function Workspace() {
  const { problemSlug } = useParams(); 

  // Set the default console height in pixels
  const [consoleHeight, setConsoleHeight] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const workspaceRef = useRef(null);

  const startDragging = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDragging = useCallback((e) => {
    if (!isDragging || !workspaceRef.current) return;

    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const newHeight = workspaceRect.bottom - e.clientY;

    const minHeight = 60;
    const maxHeight = workspaceRect.height * 0.8; // Increased slightly for flex room

    if (newHeight >= minHeight && newHeight <= maxHeight) {
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
    <div className={`h-screen bg-[#1E1E1E] text-white flex flex-col overflow-hidden ${isDragging ? "select-none" : ""}`}>
      <ExecutionProvider>
        {/* Top Header */}
        <EditorHeader problemSlug={problemSlug} />

        {/* Main Workspace Grid: Ensuring explicit height constraint */}
        <div className="grid h-[calc(100vh-72px)] grid-cols-2 w-full min-h-0 overflow-hidden">
          
          {/* Left Side - Problem Description */}
          <div className="overflow-y-auto border-r border-white/10 h-full min-w-0">
            <ProblemPanel problemSlug={problemSlug} />
          </div>

          {/* Right Side - Code Editor & Console Wrapper */}
          <div 
            ref={workspaceRef} 
            className="flex flex-col h-full overflow-hidden relative min-w-0"
          >
            {/* Upper Section: Code Editor */}
            <div className="flex-1 min-h-0 w-full overflow-hidden">
              <CodeEditor problemSlug={problemSlug} />
            </div>

            {/* Draggable Divider Handle */}
            <div
              onMouseDown={startDragging}
              className={`h-2 w-full cursor-row-resize transition-colors duration-150 relative z-50 flex items-center ${
                isDragging ? "bg-[#A3FF12]" : "bg-white/5 hover:bg-[#A3FF12]/50"
              }`}
            >
              {/* FIXED: Standardized bracket spacing value inside arbitrary brackets */}
              <div className="absolute inset-x-0 mx-auto h-1px w-8 bg-white/20 pointer-events-none" />
            </div>

            {/* Lower Section: Resizable Console Panel Container */}
            <div 
              style={{ height: `${consoleHeight}px` }} 
              className="min-h-0 w-full overflow-hidden flex flex-col bg-[#1A1A1A] border-t border-white/5"
            >
              <ConsolePanel problemSlug={problemSlug} />
            </div>
          </div>

        </div>
      </ExecutionProvider>
    </div>
  );
}

export default Workspace;