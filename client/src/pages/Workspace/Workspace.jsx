import EditorHeader from "../../components/workspace/EditorHeader";
import ProblemPanel from "../../components/workspace/ProblemPanel";
import CodeEditor from "../../components/workspace/CodeEditor";
import ConsolePanel from "../../components/workspace/ConsolePanel";

function Workspace() {
  return (
    <div className="h-screen bg-[#1E1E1E] text-white">

      {/* Top Header */}

      <EditorHeader />

      {/* Main Workspace */}

      <div className="grid h-[calc(100vh-72px)] grid-cols-2">

        {/* Left Side - Problem Description */}

        <div className="overflow-y-auto border-r border-white/10">
          <ProblemPanel />
        </div>

        {/* Right Side */}

        <div className="grid grid-rows-[1fr_240px]">

          {/* Code Editor */}

          <CodeEditor />

          {/* Console */}

          <ConsolePanel />

        </div>

      </div>

    </div>
  );
}

export default Workspace;