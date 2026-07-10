#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <stack>
#include <unordered_map>
#include <sstream>
#include <algorithm>
using namespace std;


#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        vector<char> st; // Simulating stack dynamically via vector
        
        for (char c : s) {
            // Push opening brackets onto the stack structure
            if (c == '(' || c == '{' || c == '[') {
                st.push_back(c);
            } else {
                // BOUNDARY GUARD: If stack is empty on a closing bracket, it's invalid
                if (st.empty()) return false; 
                
                // Validate if closing bracket matches the most recent opening bracket
                if (c == ')' && st.back() != '(') return false;
                if (c == '}' && st.back() != '{') return false;
                if (c == ']' && st.back() != '[') return false;
                
                st.pop_back(); // Cleanly pop the matched element
            }
        }
        
        // If stack is completely empty, all brackets matched perfectly
        return st.empty();
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