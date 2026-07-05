import { useMemo, useState } from "react";
import SearchFilter from "../../components/problems/SearchFilter";
import ProblemCard from "../../components/problems/ProblemCard";

// FIXED: Added URL-safe slug fields to every problem item object
const problems = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array",
    acceptance: "52%",
    description: "Find two numbers in an array whose sum equals the target value.",
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    acceptance: "56%",
    description: "Implement efficient binary search on a sorted array.",
  },
  {
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: "43%",
    description: "Find the length of the longest strictly increasing subsequence.",
  },
  {
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graph",
    acceptance: "61%",
    description: "Count the number of islands in a 2D grid using DFS or BFS.",
  },
  {
    slug: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Linked List",
    acceptance: "39%",
    description: "Merge multiple sorted linked lists into one sorted list.",
  },
];

function Problems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  const topics = [
    "All",
    ...new Set(problems.map((problem) => problem.topic)),
  ];

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDifficulty =
        difficulty === "All" ||
        problem.difficulty === difficulty;

      const matchesTopic =
        topic === "All" ||
        problem.topic === topic;

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesTopic
      );
    });
  }, [searchTerm, difficulty, topic]);

  const clearFilters = () => {
    setSearchTerm("");
    setDifficulty("All");
    setTopic("All");
  };

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
                key={problem.slug}
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