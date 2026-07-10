import { Search } from "lucide-react";

function SearchFilter({
  searchTerm,
  setSearchTerm,
  difficulty,
  setDifficulty,
  topic,
  setTopic,
  topics,
  clearFilters,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">

      {/* Modern Placed Search Bar */}
      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search problems by token slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-white/5 bg-[#1E1E1E] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#A3FF12] placeholder-gray-600"
        />
      </div>

      {/* Styled Filtering Select Nodes */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="rounded-xl border border-white/5 bg-[#1E1E1E] px-4 py-3 text-sm text-gray-300 outline-none transition focus:border-[#A3FF12] cursor-pointer"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-xl border border-white/5 bg-[#1E1E1E] px-4 py-3 text-sm text-gray-300 outline-none transition focus:border-[#A3FF12] max-w-[200px] cursor-pointer"
        >
          {topics.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Topics" : item}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98]"
        >
          Reset
        </button>
      </div>

    </div>
  );
}

export default SearchFilter;