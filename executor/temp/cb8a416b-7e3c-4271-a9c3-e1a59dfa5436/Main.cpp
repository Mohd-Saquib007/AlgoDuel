#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <sstream>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
       map<int,int> mpp;
       for(int i=0;i<nums.size();i++){
        int a=nums[i];
        int more=target-a;
        if(mpp.find(more)!=mpp.end()){
            return {mpp[more],i};
        }
        mpp[a]=i;
       }
       return {};
    }
};

int main() {
  vector<int> nums = { 2, 7, 11, 15 };
  int target = 9;
  Solution sol;
  auto result = sol.twoSum(nums, target);
  cout << "[";
  for (size_t i = 0; i < result.size(); ++i) { if (i) cout << ","; cout << result[i]; }
  cout << "]";
  return 0;
}