import BattleHeader from "../../components/battle/BattleHeader";

import ProblemPanel from "../../components/workspace/ProblemPanel";
import CodeEditor from "../../components/workspace/CodeEditor";
import ConsolePanel from "../../components/workspace/ConsolePanel";

function BattleRoom() {
  return (
    <div className="h-screen bg-[#1E1E1E] text-white">

      <BattleHeader />

      <div className="grid h-[calc(100vh-92px)] grid-cols-2">

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

export default BattleRoom;