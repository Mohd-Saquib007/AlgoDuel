function ProblemPanel() {
  return (
    <div className="h-full overflow-y-auto bg-[#1E1E1E] p-8">

      <h1 className="text-4xl font-bold">
        Two Sum
      </h1>

      <div className="mt-5 flex gap-3">

        <span className="rounded-full bg-green-500/10 px-4 py-2 text-green-400">
          Easy
        </span>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
          Array
        </span>

      </div>

      <section className="mt-10">

        <h2 className="text-2xl font-semibold">
          Description
        </h2>

        <p className="mt-4 leading-8 text-gray-300">
          Given an array of integers nums and an integer target,
          return indices of the two numbers such that they add up
          to target.
        </p>

      </section>

      <section className="mt-10">

        <h2 className="text-2xl font-semibold">
          Example
        </h2>

        <pre className="mt-4 rounded-xl bg-[#252526] p-5">

Input:
nums = [2,7,11,15]

target = 9

Output:
[0,1]

        </pre>

      </section>

      <section className="mt-10">

        <h2 className="text-2xl font-semibold">
          Constraints
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-300">

          <li>2 ≤ nums.length ≤ 10⁴</li>

          <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>

          <li>Exactly one solution exists.</li>

        </ul>

      </section>

    </div>
  );
}

export default ProblemPanel;