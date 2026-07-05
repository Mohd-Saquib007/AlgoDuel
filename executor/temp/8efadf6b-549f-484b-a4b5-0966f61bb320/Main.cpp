
#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <sstream>
#include <algorithm>
#include <bits/stdc++.h>

using namespace std;

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
         map<int,int> mpp;
       for(int i=0;i<nums.size();i++){
        int a=nums[i];
        int more=target-a;
        if(mpp.find(more)!=mpp.end()){
            return {mpp[more],i};
        }
        mpp[a]=i;
       }
       return {};

    }
};

int main() {
    string token;
    string fullInput = "";
    
    while (cin >> token) {
        fullInput += token + " ";
    }

    // Check if the input contains key labels. If not, treat everything as raw data values.
    bool hasKeys = (fullInput.find("nums") != string::npos || fullInput.find("target") != string::npos);

    // Sanitize non-numeric formatting layout tokens safely
    for (char &c : fullInput) {
        if (c == '[' || c == ']' || c == ',' || c == '=') {
            c = ' ';
        }
    }

    stringstream ss(fullInput);
    string word;
    vector<int> nums;
    int target = 0;
    
    if (hasKeys) {
        // Fallback for UI 'Run' click template (e.g. nums = [2,7,11,15] target = 9)
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
    } else {
        // FIXED: Support for pure database test case files (reads raw numbers, treating the last item as target)
        int val;
        vector<int> allNumbers;
        while (ss >> val) {
            allNumbers.push_back(val);
        }
        if (allNumbers.size() >= 2) {
            target = allNumbers.back(); // Extract target value from the end of the input stream
            allNumbers.pop_back();
            nums = allNumbers;
        }
    }

    Solution solver;
    vector<int> res = solver.twoSum(nums, target);
    if(res.size() == 2) {
        // Formats as [0,1] to make sure the aggressive string cleaning catches it properly!
        cout << "[" << res[0] << "," << res[1] << "]";
    } else {
        cout << "[]";
    }
    return 0;
}
