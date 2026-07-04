
#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <sstream>

using namespace std;

#include <vector>
#include <map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        map<int, int> mpp;
        for(int i=0; i<nums.size(); i++){
            int a = nums[i];
            int more = target - a;
            if(mpp.find(more) != mpp.end()){
                return {mpp[more], i};
            }
            mpp[a] = i;
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

    for (char &c : fullInput) {
        if (c == '[' || c == ']' || c == ',' || c == '=') {
            c = ' ';
        }
    }

    stringstream ss(fullInput);
    string identifier;
    vector<int> nums;
    int target = 0;

    while (ss >> identifier) {
        if (identifier == "nums") {
            int val;
            while (ss >> token) {
                if (token == "target") {
                    break;
                }
                stringstream numStream(token);
                if (numStream >> val) {
                    nums.push_back(val);
                }
            }
        }
        if (identifier == "target" || token == "target") {
            ss >> target;
        }
    }

    Solution solver;
    vector<int> result = solver.twoSum(nums, target);
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    return 0;
}
