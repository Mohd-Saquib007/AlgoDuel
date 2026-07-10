import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchFilter from "../../components/problems/SearchFilter";
import ProblemCard from "../../components/problems/ProblemCard";
import { ShieldCheck, Zap, Flame } from "lucide-react";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/problems");
        if (res.data && res.data.problems) {
          setProblems(res.data.problems);
        } else if (res.data && res.data.data) {
          setProblems(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load backend problems index:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const topics = useMemo(() => {
    return ["All", ...new Set(problems.map((problem) => problem.topic || "General"))];
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = problem.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
      const matchesTopic = topic === "All" || problem.topic === topic;
      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [problems, searchTerm, difficulty, topic]);

  const clearFilters = () => {
    setSearchTerm("");
    setDifficulty("All");
    setTopic("All");
  };

  const counts = useMemo(() => {
    return {
      easy: problems.filter(p => p.difficulty?.toLowerCase() === "easy").length,
      medium: problems.filter(p => p.difficulty?.toLowerCase() === "medium").length,
      hard: problems.filter(p => p.difficulty?.toLowerCase() === "hard").length,
    };
  }, [problems]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-73px)] items-center justify-center bg-[#1E1E1E] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#A3FF12] border-t-transparent"></div>
          <div className="text-sm font-medium tracking-widest uppercase text-gray-400 animate-pulse">Loading Arena Challenges...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Banner Section Header */}
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br' from-[#252526] to-[#141414] p-8 md:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A3FF12]/10 px-3 py-1 text-xs font-semibold text-[#A3FF12] uppercase tracking-wider">
              <Flame size={12} /> Live Coding Arena
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl uppercase">
              CHALLENGE THE <span className="text-[#A3FF12]">MATRIX</span>
            </h1>
            <p className="mt-4 text-base text-gray-400 leading-relaxed">
              Sharpen your algorithmic weapons, defeat hidden test cases seamlessly, and dominate duel rooms in real-time.
            </p>
          </div>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[#A3FF12]/5 blur-3xl"></div>
        </div>

        {/* Asymmetrical Grid Component Shell */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Main challenges workspace stream */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-white/5 bg-[#141414]/40 p-4">
              <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                topic={topic}
                setTopic={setTopic}
                topics={topics}
                clearFilters={clearFilters}
              />
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Challenge Index Matrix
              </p>
              <p className="text-xs text-gray-500">
                Showing <span className="font-bold text-[#A3FF12]">{filteredProblems.length}</span> of {problems.length} Challenges
              </p>
            </div>

            <div className="grid gap-4">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <ProblemCard
                    key={problem.slug || problem._id}
                    {...problem}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-[#141414]/20 py-16 text-center">
                  <h2 className="text-xl font-bold text-gray-300">No Challenges Resolved</h2>
                  <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">Try modulating or resetting your filter options.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar panel wrapper */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 shadow-xl">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#A3FF12]" /> Arena Pool Breakdown
              </h3>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-400 mb-1.5">
                    <span>Easy Nodes</span>
                    <span className="font-bold text-white">{counts.easy}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#252526] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${problems.length ? (counts.easy/problems.length)*100 : 0}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-400 mb-1.5">
                    <span>Medium Nodes</span>
                    <span className="font-bold text-white">{counts.medium}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#252526] rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${problems.length ? (counts.medium/problems.length)*100 : 0}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-400 mb-1.5">
                    <span>Hard Nodes</span>
                    <span className="font-bold text-white">{counts.hard}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#252526] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${problems.length ? (counts.hard/problems.length)*100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-[#A3FF12]/20 bg-[#A3FF12]/5 p-6 transition-all duration-300 hover:border-[#A3FF12]/40">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Instant Match Lobby</h4>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    Ready to wager ratings? Join matchmaking queues instantly.
                  </p>
                </div>
                <div className="rounded-xl bg-[#A3FF12]/10 p-2.5 text-[#A3FF12]">
                  <Zap size={18} />
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full rounded-xl bg-[#A3FF12] py-3 text-center text-xs font-bold text-black transition group-hover:scale-[1.02]">
                  Enter Match Queue
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Problems;