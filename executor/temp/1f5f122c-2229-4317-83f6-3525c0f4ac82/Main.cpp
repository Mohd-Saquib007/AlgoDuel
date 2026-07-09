#include <iostream>
#include <vector>
#include <string>
#include <stack>
#include <unordered_map>
#include <sstream>
#include <algorithm>
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
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> nums;
    int target;


    int size_nums;
    if (cin >> size_nums) {
        nums.resize(size_nums);
        for (int i = 0; i < size_nums; ++i) {
            cin >> nums[i];
        }
    }
    cin >> target;

    Solution sol;
    vector<int> result = sol.twoSum(nums, target);

    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << "]";
    return 0;
}