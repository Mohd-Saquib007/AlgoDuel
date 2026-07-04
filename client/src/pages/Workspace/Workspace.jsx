import { useState, useEffect, useRef, useCallback } from "react";
import { ExecutionProvider } from "../../context/ExecutionContext";
import EditorHeader from "../../components/workspace/EditorHeader";
import ProblemPanel from "../../components/workspace/ProblemPanel";
import CodeEditor from "../../components/workspace/CodeEditor";
import ConsolePanel from "../../components/workspace/ConsolePanel";

function Workspace() {
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

    // Get the bottom bounding box of the workspace grid wrapper
    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    
    // Calculate the new height based on mouse Y position relative to the workspace container
    const newHeight = workspaceRect.bottom - e.clientY;

    // Apply safe boundary limits (Min: 60px, Max: 70% of the viewport container)
    const minHeight = 60;
    const maxHeight = workspaceRect.height * 0.7;

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setConsoleHeight(newHeight);
    }
  }, [isDragging]);

  // Set up global event listeners when the user starts dragging the handle
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
    <div className="h-screen bg-[#1E1E1E] text-white select-none">
      <ExecutionProvider>
        {/* Top Header */}
        <EditorHeader />

        {/* Main Workspace Layout Wrapper */}
        <div className="grid h-[calc(100vh-72px)] grid-cols-2">
          
          {/* Left Side - Problem Description */}
          <div className="overflow-y-auto border-r border-white/10">
            <ProblemPanel />
          </div>

          {/* Right Side - Dynamic Resizable Flex Containers */}
          <div 
            ref={workspaceRef} 
            className="flex flex-col h-full overflow-hidden relative"
          >
            {/* Upper Section: Code Editor takes up remaining height */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <CodeEditor />
            </div>

            {/* Draggable Divider Handle */}
            <div
              onMouseDown={startDragging}
              className={`h-2 w-full cursor-row-resize transition-colors duration-150 relative z-50 ${
                isDragging ? "bg-[#A3FF12]" : "bg-white/5 hover:bg-[#A3FF12]/50"
              }`}
            >
              {/* Subtle line decoration indicator in the middle of handle */}
              <div className="absolute inset-0 m-auto h-1px w-8 bg-white/20 pointer-events-none" />
            </div>

            {/* Lower Section: Resizable Console Panel Container */}
            <div 
              style={{ height: `${consoleHeight}px` }} 
              className="min-h-0 w-full overflow-hidden flex flex-col"
            >
              <ConsolePanel />
            </div>
          </div>

        </div>
      </ExecutionProvider>
    </div>
  );
}

export default Workspace;