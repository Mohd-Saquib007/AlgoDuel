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