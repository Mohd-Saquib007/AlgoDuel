import EditorHeader from "../../components/workspace/EditorHeader";
import ProblemPanel from "../../components/workspace/ProblemPanel";
import CodeEditor from "../../components/workspace/CodeEditor";
import ConsolePanel from "../../components/workspace/ConsolePanel";

function ProblemDetails() {
  return (
    <div className="h-screen bg-[#1E1E1E] text-white">

      <EditorHeader />

      <div className="grid h-[calc(100vh-72px)] grid-cols-2">

        {/* Left */}

        <ProblemPanel />

        {/* Right */}

        <div className="grid grid-rows-[1fr_220px] border-l border-white/10">

          <CodeEditor />

          <ConsolePanel />

        </div>

      </div>

    </div>
  );
}

export default ProblemDetails;