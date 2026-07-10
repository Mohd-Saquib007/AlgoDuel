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