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


#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0;
        int right = s.size() - 1;
        
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};

int main(int argc, char* argv[]) {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<char> s;


    int size_s = 0;
    if (cin >> size_s) {
        s.resize(size_s);
        for (int i = 0; i < size_s; ++i) {
            cin >> s[i];
        }
    }

    Solution sol;
    vector<char> result = sol.reverseString(s);

    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << "]";
    return 0;
}