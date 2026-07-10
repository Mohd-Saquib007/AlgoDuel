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
        vector<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push_back(c);
            } else {
                if (st.empty()) return false;
                if (c == ')' && st.back() != '(') return false;
                if (c == '}' && st.back() != '{') return false;
                if (c == ']' && st.back() != '[') return false;
                st.pop_back();
            }
        }
        return st.empty();
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