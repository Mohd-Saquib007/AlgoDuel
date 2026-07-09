import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchFilter from "../../components/problems/SearchFilter";
import ProblemCard from "../../components/problems/ProblemCard";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  // Fetch all problems dynamically from the database
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1E1E1E] text-white">
        <div className="text-xl font-medium tracking-wide animate-pulse">Loading Arena Challenges...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">Problems</h1>

        <p className="mt-4 text-gray-400">
          Practice coding problems and prepare for battles.
        </p>

        <div className="mt-10">
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

        <p className="mt-6 text-gray-400">
          Showing{" "}
          <span className="font-semibold text-[#A3FF12]">
            {filteredProblems.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold">
            {problems.length}
          </span>{" "}
          problems
        </p>

        <div className="mt-10 grid gap-6">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <ProblemCard
                key={problem.slug || problem._id}
                {...problem}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#252526] py-12 text-center">
              <h2 className="text-2xl font-semibold">No Problems Found</h2>
              <p className="mt-3 text-gray-400">Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Problems;