
#include <iostream>
#include <vector>
#include <string>
#include <stack>
#include <sstream>
#include <bits/stdc++.h>

using namespace std;

class Solution:
    def isValid(self, s: str) -> bool:
        hashmap = {")": "(", "}": "{", "]": "["}
        stk = []
 
        for c in s:
            if c not in hashmap:
                stk.append(c)
            else:
                if not stk:
                    return False
                else:
                    popped = stk.pop()
                    if popped != hashmap[c]:
                        return False
 
        return not stk

int main() {
    return 0;
}
