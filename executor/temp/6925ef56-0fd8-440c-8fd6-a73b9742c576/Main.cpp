#include <iostream>
#include <vector>
#include <map>

using namespace std;

int main() {
    int n, target;
    // Read array size and target value
    if (!(cin >> n >> target)) return 0;
    
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    map<int, int> mpp;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (mpp.find(complement) != mpp.end()) {
            // Print exactly what your database expects (e.g., [0,1])
            cout << "[" << mpp[complement] << "," << i << "]";
            return 0;
        }
        mpp[nums[i]] = i;
    }
    
    cout << "[]";
    return 0;
}