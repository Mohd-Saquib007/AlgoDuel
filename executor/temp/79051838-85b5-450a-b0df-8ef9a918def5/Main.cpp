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
                st.pop_back()
            }
        }
        return st.empty();
    }
};

int main(int argc, char* argv[]) {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s;

    cin >> s;

    Solution sol;
    bool result = sol.isValid(s);
    cout << (result ? "true" : "false");
    return 0;
}