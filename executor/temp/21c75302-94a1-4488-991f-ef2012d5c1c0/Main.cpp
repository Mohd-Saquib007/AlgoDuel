class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mpp; // Using unordered_map is faster (O(1) average lookup)
        
        for (int i = 0; i < nums.size(); i++) {
            int more = target - nums[i];
            
            // Find the complement element iterator cleanly
            auto it = mpp.find(more);
            if (it != mpp.end()) {
                // Return the stored index from the iterator, followed by the current index
                return {it->second, i};
            }
            
            // Store the element value and its original index
            mpp[nums[i]] = i;
        }
        return {};
    }
};