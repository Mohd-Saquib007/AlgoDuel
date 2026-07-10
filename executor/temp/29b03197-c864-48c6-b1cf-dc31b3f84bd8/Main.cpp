class Solution {
public:
    void reverseString(vector<char>& s) {
        int n = s.size();
        vector<char> T;
        for (int i = n - 1; i >= 0; --i) {
            T.push_back(s[i]);
        }
        for (int i = 0; i < n; ++i) {
            s[i] = T[i];
        }
    }
};