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
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}

      <div className="relative w-full lg:max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-[#252526] py-3 pl-11 pr-4 outline-none transition focus:border-[#A3FF12]"
        />

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          className="rounded-xl border border-white/10 bg-[#252526] px-4 py-3 outline-none"
        >

          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>

        </select>

        <select
          value={topic}
          onChange={(e) =>
            setTopic(e.target.value)
          }
          className="rounded-xl border border-white/10 bg-[#252526] px-4 py-3 outline-none"
        >

          {topics.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}

        </select>

        <button
          onClick={clearFilters}
          className="rounded-xl border border-[#A3FF12] px-5 py-3 text-[#A3FF12] transition hover:bg-[#A3FF12] hover:text-black"
        >
          Clear
        </button>

      </div>

    </div>
  );
}

export default SearchFilter;