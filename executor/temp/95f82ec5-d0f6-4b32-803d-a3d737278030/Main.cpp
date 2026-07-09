#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <sstream>
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