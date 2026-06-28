import { useState } from "react";

const sampleInput = `nums = [2,7,11,15]
target = 9`;

const expectedOutput = `[0,1]`;

function ConsolePanel() {
  const [activeTab, setActiveTab] = useState("testcase");

  return (
    <div className="flex h-full flex-col bg-[#252526]">

      {/* Tabs */}

      <div className="flex border-b border-white/10">

        <button
          onClick={() => setActiveTab("testcase")}
          className={`px-5 py-3 font-medium transition ${
            activeTab === "testcase"
              ? "border-b-2 border-[#A3FF12] text-[#A3FF12]"
              : "text-gray-400"
          }`}
        >
          Test Case
        </button>

        <button
          onClick={() => setActiveTab("result")}
          className={`px-5 py-3 font-medium transition ${
            activeTab === "result"
              ? "border-b-2 border-[#A3FF12] text-[#A3FF12]"
              : "text-gray-400"
          }`}
        >
          Result
        </button>

      </div>

      {/* Content */}

      <div className="flex-1 overflow-y-auto p-5">

        {activeTab === "testcase" ? (
          <>
            <h3 className="font-semibold">
              Sample Test Case
            </h3>

            <div className="mt-4">

              <p className="text-sm text-gray-400">
                Input
              </p>

              <pre className="mt-2 rounded-xl bg-[#1E1E1E] p-4 text-sm">
                {sampleInput}
              </pre>

            </div>

            <div className="mt-5">

              <p className="text-sm text-gray-400">
                Expected Output
              </p>

              <pre className="mt-2 rounded-xl bg-[#1E1E1E] p-4 text-sm">
                {expectedOutput}
              </pre>

            </div>

          </>
        ) : (
          <>
            <h3 className="font-semibold">
              Execution Result
            </h3>

            <div className="mt-4 rounded-xl bg-[#1E1E1E] p-4">

              <p className="text-gray-500">
                Press <span className="text-[#A3FF12]">Run</span> to see output.
              </p>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-[#1E1E1E] p-4">

                <p className="text-sm text-gray-400">
                  Runtime
                </p>

                <p className="mt-2 text-lg">
                  --
                </p>

              </div>

              <div className="rounded-xl bg-[#1E1E1E] p-4">

                <p className="text-sm text-gray-400">
                  Memory
                </p>

                <p className="mt-2 text-lg">
                  --
                </p>

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default ConsolePanel;