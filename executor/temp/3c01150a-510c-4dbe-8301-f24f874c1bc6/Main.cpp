
#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <sstream>
#include<bits/stdc++.h>

using namespace std;

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};

int main() {
    string token;
    string fullInput = "";
    
    while (cin >> token) {
        fullInput += token + " ";
    }

    for (char &c : fullInput) {
        if (c == '[' || c == ']' || c == ',' || c == '=') {
            c = ' ';
        }
    }

    stringstream ss(fullInput);
    string word;
    vector<int> nums;
    int target = 0;
    bool readingNums = false;

    while (ss >> word) {
        if (word == "nums") {
            readingNums = true;
            continue;
        }
        if (word == "target") {
            readingNums = false;
            ss >> target;
            continue;
        }
        if (readingNums) {
            stringstream numStream(word);
            int val;
            if (numStream >> val) {
                nums.push_back(val);
            }
        }
    }

    Solution solver;
    vector<int> res = solver.twoSum(nums, target);
    if(res.size() == 2) {
        cout << "[" << res[0] << "," << res[1] << "]";
    } else {
        cout << "[]";
    }
    return 0;
}
