import { motion } from "framer-motion";
import Card from "../../../ui/Card";

const code = [
  "class Solution {",
  "public:",
  "    vector<int> twoSum(vector<int>& nums, int target) {",
  "        unordered_map<int, int> mp;",
  "",
  "        for(int i = 0; i < nums.size(); i++) {",
  "            int x = target - nums[i];",
  "",
  "            if(mp.count(x))",
  "                return {mp[x], i};",
  "",
  "            mp[nums[i]] = i;",
  "        }",
  "",
  "        return {};",
  "    }",
  "};",
];

function HeroCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />

          <span className="ml-4 text-sm text-gray-400">
            solution.cpp
          </span>
        </div>

        {/* Code */}
        <div className="bg-[#1B1B1B] px-5 py-5 font-mono text-sm">
          {code.map((line, index) => (
            <div
              key={index}
              className="flex leading-7"
            >
              <span className="mr-6 w-6 text-right text-gray-500 select-none">
                {index + 1}
              </span>

              <span className="text-gray-300">
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
          <span className="text-[#A3FF12]">
            ⚡ Live Battle
          </span>

          <span className="text-gray-400">
            14:32
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

export default HeroCard;