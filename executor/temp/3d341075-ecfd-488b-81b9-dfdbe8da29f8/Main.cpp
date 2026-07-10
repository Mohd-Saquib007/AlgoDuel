#pragma comment(linker, "/SUBSYSTEM:CONSOLE")
#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <stack>
#include <unordered_map>
#include <sstream>
#include <algorithm>
using namespace std;


class Solution {
public:
    bool isValid(string s) {
        unordered_map<char, char> hashmap = {{')', '('}, {'}', '{'}, {']', '['}};
        stack<char> stk;
 
        for (char c : s) {
            if (hashmap.find(c) == hashmap.end()) {
                stk.push(c);
            } else {
                if (stk.empty() || stk.top() != hashmap[c]) {
                    return false;
                }
                stk.pop();
            }
        }
 
        return stk.empty();
    }
};

int main(int argc, char* argv[]) {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> nums;
    int target;


    int size_nums = 0;
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