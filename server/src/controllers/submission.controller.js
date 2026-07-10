const Submission = require("../models/submission.model");
const TestCase = require("../models/testcase.model"); 
const Problem = require("../models/problem.model"); 
const User = require("../models/user.model");
const mongoose = require("mongoose");
const axios = require("axios");

// JavaScript Pre-compiler Stream Sanitizer
const serializeStdinForCpp = (inputStr, params) => {
    if (!inputStr || String(inputStr).trim() === "") return "";
    let cleanStr = inputStr.trim().replace(/\r\n/g, "\n");
    
    // Dynamic type checking maps execution contexts explicitly
    const graphNodeParam = params.find(p => p.type === "Node*");
    const treeNodeParam = params.find(p => p.type === "TreeNode*");
    const listNodeParam = params.find(p => p.type === "ListNode*");
    const vectorParam = params.find(p => p.type.startsWith("vector"));

    if (graphNodeParam) {
        // Formats an adjacency list like [[2,4],[1,3],[2,4],[1,3]] safely
        const graphContent = cleanStr.substring(cleanStr.indexOf("["));
        const rowsMatch = graphContent.match(/\[([^\[\]]*?)\]/g);
        if (rowsMatch) {
            const totalNodes = rowsMatch.length;
            let neighborCounts = [];
            let flattenedNeighbors = [];
            
            rowsMatch.forEach(row => {
                const elements = row.replace(/[\[\]"']/g, "").split(",").map(x => x.trim()).filter(x => x !== "");
                neighborCounts.push(elements.length);
                elements.forEach(el => flattenedNeighbors.push(el));
            });

            const formatted = `${totalNodes}\n${neighborCounts.join(" ")}\n${flattenedNeighbors.join(" ")}`.trim();
            return formatted;
        }
    } else if (treeNodeParam) {
        const treeContent = cleanStr.substring(cleanStr.indexOf("["));
        const arrayMatch = treeContent.match(/\[(.*?)\]/);
        if (arrayMatch) {
            const elements = arrayMatch[1].split(",").map(x => {
                let token = x.trim().toLowerCase();
                return (token === "null" || token === "nullptr") ? "-999" : token;
            }).filter(x => x !== "");
            const formatted = `${elements.length}\n${elements.join(" ")}`.trim();
            return formatted;
        }
    } else if (listNodeParam) {
        const listContent = cleanStr.substring(cleanStr.indexOf("["));
        const arrayMatch = listContent.match(/\[(.*?)\]/);
        if (arrayMatch) {
            const elements = arrayMatch[1].split(",").map(x => x.trim()).filter(x => x !== "");
            const formatted = `${elements.length}\n${elements.join(" ")}`.trim();
            return formatted;
        }
    } else if (vectorParam) {
        if (vectorParam.type.startsWith("vector<vector")) {
            const matrixContent = cleanStr.substring(cleanStr.indexOf("["));
            const rowsMatch = matrixContent.match(/\[([^\[\]]+)\]/g);
            
            if (rowsMatch) {
                const rows = rowsMatch.length;
                const flatElements = rowsMatch.map(row => 
                    row.replace(/[\[\]"']/g, "").split(",").map(x => x.trim()).filter(x => x !== "")
                );
                const cols = flatElements[0].length;
                const flatList = flatElements.flat();
                
                const targetMatch = cleanStr.match(/(?:,\s*\w+\s*=\s*|,\s*)(-?\d+)\s*$/i);
                const targetVal = targetMatch ? targetMatch[1] : "";

                return `${rows} ${cols}\n${flatList.join(" ")}\n${targetVal}`.trim();
            }
        } else {
            const arrayMatch = cleanStr.match(/\[(.*?)\]/);
            if (arrayMatch) {
                let rawElements = arrayMatch[1].split(",");
                if (vectorParam.type.includes("char")) {
                    rawElements = rawElements.map(x => x.replace(/['"]/g, "").trim());
                } else {
                    rawElements = rawElements.map(x => x.trim());
                }
                
                const elements = rawElements.filter(x => x !== "");
                const targetMatch = cleanStr.match(/(?:target\s*=\s*|target\s+)?(-?\d+)\s*$/i);
                const targetVal = targetMatch ? targetMatch[1] : "";

                return `${elements.length}\n${elements.join(" ")}\n${targetVal}`.trim();
            }
        }
        
        if (!cleanStr.includes("[") && !cleanStr.includes("]")) {
            return cleanStr;
        }
    }

    let stringClean = cleanStr.replace(/^(s|input)\s*=\s*/i, "");
    stringClean = stringClean.replace(/^["']|["']$/g, "");
    return stringClean.trim();
};

// Universal C++ Execution Driver Template Generator Engine
const generateUniversalCppHarness = (userSolutionCode, problemDoc) => {
    if (!problemDoc || !problemDoc.harnessConfig) {
        return userSolutionCode;
    }

    const { returnType, functionName, params } = problemDoc.harnessConfig;
    const trimmedSource = (userSolutionCode || "").trim().replace(/\r\n/g, "\n");
    
    // Injects matching pointer constructors, list builders, and graph builders natively into submission blocks
    const globalHeaders = `
#pragma comment(linker, "/SUBSYSTEM:CONSOLE")
#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

ListNode* buildList(const vector<int>& nums) {
    if (nums.empty()) return nullptr;
    ListNode* head = new ListNode(nums[0]);
    ListNode* curr = head;
    for (size_t i = 1; i < nums.size(); ++i) {
        curr->next = new ListNode(nums[i]);
        curr = curr->next;
    }
    return head;
}

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

TreeNode* buildTree(const vector<int>& nums) {
    if (nums.empty() || nums[0] == -999) return nullptr;
    TreeNode* root = new TreeNode(nums[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < nums.size()) {
        TreeNode* curr = q.front();
        q.pop();
        if (i < nums.size() && nums[i] != -999) {
            curr->left = new TreeNode(nums[i]);
            q.push(curr->left);
        }
        i++;
        if (i < nums.size() && nums[i] != -999) {
            curr->right = new TreeNode(nums[i]);
            q.push(curr->right);
        }
        i++;
    }
    return root;
}

class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};

Node* buildGraph(int totalNodes, const vector<int>& flattenedNeighbors, const vector<int>& neighborCounts) {
    if (totalNodes == 0) return nullptr;
    vector<Node*> nodeMap(totalNodes + 1);
    for (int i = 1; i <= totalNodes; ++i) {
        nodeMap[i] = new Node(i);
    }
    int flatIdx = 0;
    for (int i = 1; i <= totalNodes; ++i) {
        int count = neighborCounts[i - 1];
        for (int j = 0; j < count; ++j) {
            int neighborVal = flattenedNeighbors[flatIdx++];
            if (neighborVal >= 1 && neighborVal <= totalNodes) {
                nodeMap[i]->neighbors.push_back(nodeMap[neighborVal]);
            }
        }
    }
    return nodeMap[1];
}
\n`;

    let paramDeclarations = "";
    let streamInputs = "";
    let functionArgs = [];

    params.forEach((param) => {
        if (param.type === "Node*") {
            paramDeclarations += `    Node* ${param.name} = nullptr;\n`;
            functionArgs.push(param.name);
            streamInputs += `
    int total_nodes_${param.name} = 0;
    if (cin >> total_nodes_${param.name}) {
        vector<int> counts_${param.name}(total_nodes_${param.name});
        int total_edges_${param.name} = 0;
        for (int i = 0; i < total_nodes_${param.name}; ++i) {
            cin >> counts_${param.name}[i];
            total_edges_${param.name} += counts_${param.name}[i];
        }
        vector<int> flat_neighbors_${param.name}(total_edges_${param.name});
        for (int i = 0; i < total_edges_${param.name}; ++i) {
            cin >> flat_neighbors_${param.name}[i];
        }
        ${param.name} = buildGraph(total_nodes_${param.name}, flat_neighbors_${param.name}, counts_${param.name});
    }\n`;
        } else if (param.type === "TreeNode*") {
            paramDeclarations += `    TreeNode* ${param.name} = nullptr;\n`;
            functionArgs.push(param.name);
            streamInputs += `
    int size_${param.name} = 0;
    if (cin >> size_${param.name}) {
        vector<int> temp_${param.name}(size_${param.name});
        for (int i = 0; i < size_${param.name}; ++i) {
            cin >> temp_${param.name}[i];
        }
        ${param.name} = buildTree(temp_${param.name});
    }\n`;
        } else if (param.type === "ListNode*") {
            paramDeclarations += `    ListNode* ${param.name} = nullptr;\n`;
            functionArgs.push(param.name);
            streamInputs += `
    int size_${param.name} = 0;
    if (cin >> size_${param.name}) {
        vector<int> temp_${param.name}(size_${param.name});
        for (int i = 0; i < size_${param.name}; ++i) {
            cin >> temp_${param.name}[i];
        }
        ${param.name} = buildList(temp_${param.name});
    }\n`;
        } else if (param.type.startsWith("vector<vector")) {
            const innerType = param.type.includes("char") ? "char" : "int";
            paramDeclarations += `    ${param.type} ${param.name};\n`;
            functionArgs.push(param.name);
            streamInputs += `
    int rows_${param.name} = 0, cols_${param.name} = 0;
    if (cin >> rows_${param.name} >> cols_${param.name}) {
        ${param.name}.resize(rows_${param.name}, vector<${innerType}>(cols_${param.name}));
        for (int i = 0; i < rows_${param.name}; ++i) {
            for (int j = 0; j < cols_${param.name}; ++j) {
                cin >> ${param.name}[i][j];
            }
        }
    }\n`;
        } else if (param.type.startsWith("vector")) {
            paramDeclarations += `    ${param.type} ${param.name};\n`;
            functionArgs.push(param.name);
            streamInputs += `
    int size_${param.name} = 0;
    if (cin >> size_${param.name}) {
        ${param.name}.resize(size_${param.name});
        for (int i = 0; i < size_${param.name}; ++i) {
            cin >> ${param.name}[i];
        }
    }\n`;
        } else {
            paramDeclarations += `    ${param.type} ${param.name};\n`;
            functionArgs.push(param.name);
            streamInputs += `    cin >> ${param.name};\n`;
        }
    });

    let outputFormatter = "";
    let functionCall = "";

    if (returnType === "void") {
        const primaryParamName = params[0].name;
        functionCall = `sol.${functionName}(${functionArgs.join(", ")});`;
        outputFormatter = `
    cout << "[";
    for (size_t i = 0; i < ${primaryParamName}.size(); ++i) {
        if (i > 0) cout << ",";
        cout << ${primaryParamName}[i];
    }
    cout << "]";\n`;
    } else {
        functionCall = `${returnType} result = sol.${functionName}(${functionArgs.join(", ")});`;
        
        if (returnType === "Node*") {
            outputFormatter = `
    cout << "[";
    if (result != nullptr) {
        map<int, vector<int>> adjList;
        queue<Node*> q;
        set<int> visited;
        q.push(result);
        visited.insert(result->val);
        while (!q.empty()) {
            Node* curr = q.front();
            q.pop();
            vector<int>& neighbors_list = adjList[curr->val];
            for (Node* neighbor : curr->neighbors) {
                neighbors_list.push_back(neighbor->val);
                if (visited.find(neighbor->val) == visited.end()) {
                    visited.insert(neighbor->val);
                    q.push(neighbor);
                }
            }
        }
        bool firstRow = true;
        for (auto const& [nodeVal, neighbors] : adjList) {
            if (!firstRow) cout << ",";
            cout << "[";
            for (size_t i = 0; i < neighbors.size(); ++i) {
                if (i > 0) cout << ",";
                cout << neighbors[i];
            }
            cout << "]";
            firstRow = false;
        }
    }
    cout << "]";\n`;
        } else if (returnType === "TreeNode*") {
            outputFormatter = `
    cout << "[";
    if (result != nullptr) {
        queue<TreeNode*> q;
        q.push(result);
        vector<string> nodes;
        while (!q.empty()) {
            TreeNode* curr = q.front();
            q.pop();
            if (curr != nullptr) {
                nodes.push_back(to_string(curr->val));
                q.push(curr->left);
                q.push(curr->right);
            } else {
                nodes.push_back("null");
            }
        }
        while (!nodes.empty() && nodes.back() == "null") {
            nodes.pop_back();
        }
        for (size_t i = 0; i < nodes.size(); ++i) {
            if (i > 0) cout << ",";
            cout << nodes[i];
        }
    }
    cout << "]";\n`;
        } else if (returnType === "ListNode*") {
            outputFormatter = `
    cout << "[";
    ListNode* curr = result;
    bool first = true;
    while (curr != nullptr) {
        if (!first) cout << ",";
        cout << curr->val;
        first = false;
        curr = curr->next;
    }
    cout << "]";\n`;
        } else if (returnType.startsWith("vector<vector")) {
            outputFormatter = `
    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        if (i > 0) cout << ",";
        cout << "[";
        for (size_t j = 0; j < result[i].size(); ++j) {
            if (j > 0) cout << ",";
            cout << result[i][j];
        }
        cout << "]";
    }
    cout << "]";\n`;
        } else if (returnType.startsWith("vector")) {
            outputFormatter = `
    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << "]";\n`;
        } else if (returnType === "bool") {
            outputFormatter = `    cout << (result ? "true" : "false");\n`;
        } else {
            outputFormatter = `    cout << result;\n`;
        }
    }

    return `${globalHeaders}\n${trimmedSource}\n\nint main(int argc, char* argv[]) {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n${paramDeclarations}\n${streamInputs}\n    Solution sol;\n    ${functionCall}\n${outputFormatter}    return 0;\n}`;
};

exports.createSubmission = async (req, res) => {
    try {
        const { problemId, language, sourceCode, roomId } = req.body;

        let targetProblemId = problemId;
        let problemDoc = null;

        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            problemDoc = await Problem.findOne({ 
                $or: [{ slug: problemId }, { title: problemId }, { titleSlug: problemId }] 
            });

            if (!problemDoc) {
                return res.status(404).json({ success: false, message: `Problem matching slug '${problemId}' not found.` });
            }
            targetProblemId = problemDoc._id;
        } else {
            problemDoc = await Problem.findById(problemId);
        }

        if (!problemDoc) {
            return res.status(404).json({ success: false, message: "Problem document references could not be resolved." });
        }

        const testCases = await TestCase.find({ problem: targetProblemId });
        if (!testCases.length) {
            return res.status(404).json({ success: false, message: "No test cases found for this problem." });
        }

        let verdict = "Accepted";
        let passedCount = 0;
        const totalCount = testCases.length;
        const hasMain = /\b(?:int|void)\s+main\s*\(/m.test(sourceCode);

        for (const testCase of testCases) {
            const executorUrl = process.env.EXECUTOR_URL || "http://localhost:7000";
            let rawOutput = "";

            const compiledSource = (language === "cpp" && !hasMain && problemDoc.harnessConfig) ? generateUniversalCppHarness(sourceCode, problemDoc) : sourceCode;
            const serializedStdin = (language === "cpp" && !hasMain && problemDoc.harnessConfig) ? serializeStdinForCpp(testCase.input, problemDoc.harnessConfig.params) : testCase.input;

            try {
                const response = await axios.post(`${executorUrl}/run`, { language, sourceCode: compiledSource, stdin: serializedStdin });
                const sandboxData = response.data?.run || response.data || {};
                
                if (sandboxData.stderr && sandboxData.stderr.trim() !== "") {
                    rawOutput = sandboxData.stderr;
                } else {
                    rawOutput = sandboxData.output || sandboxData.stdout || response.data?.stdout || "";
                }
            } catch (err) {
                console.warn("Primary processing layer timed out, falling back to execution route...");
            }

            if (!rawOutput || !String(rawOutput).trim() || String(rawOutput).includes("Compilation Failed")) {
                try {
                    const localResponse = await axios.post("http://localhost:5000/api/execution/run", {
                        language,
                        sourceCode: compiledSource,
                        stdin: serializedStdin,
                        problemSlug: problemDoc.slug
                    });
                    if (localResponse.data && localResponse.data.run) {
                        rawOutput = localResponse.data.run.stderr || localResponse.data.run.output || "";
                    } else {
                        rawOutput = localResponse.data.output || localResponse.data.stdout || "";
                    }
                } catch (fallbackErr) {
                    console.error("Local fallback execution dropped.");
                }
            }

            const actualOutput = String(rawOutput || "").trim();
            const databaseExpected = testCase.expectedOutput || testCase.expectedoutput || "";
            const expectedOutput = String(databaseExpected).trim();

            const cleanActual = actualOutput.replace(/[^0-9a-zA-Z-]/g, "").toLowerCase().trim();
            const cleanExpected = expectedOutput.replace(/[^0-9a-zA-Z-]/g, "").toLowerCase().trim();

            let matchIsCorrect = (cleanActual === cleanExpected && cleanActual !== "");
            
            if (!matchIsCorrect && cleanActual.length === 2 && cleanExpected.length === 2) {
                const reversedActual = cleanActual.split("").reverse().join("");
                if (reversedActual === cleanExpected) {
                    matchIsCorrect = true;
                }
            }

            console.log("\n🧪 [SUBMIT DEBUG] Checking Test Case ID:", testCase._id);
            console.log("📥 Raw Input fed to program: ", JSON.stringify(serializedStdin));
            console.log("A Output (Normalized Actual):  ", JSON.stringify(cleanActual));
            console.log("B Output (Normalized Expected):", JSON.stringify(cleanExpected));
            console.log("⚖️ Match Evaluation Verdict:    ", matchIsCorrect);

            if (matchIsCorrect) {
                passedCount++;
            } else {
                verdict = "Wrong Answer";
                break;
            }
        }

        if (roomId && req.app.get("activeRooms")) {
            const activeRooms = req.app.get("activeRooms");
            const io = req.app.get("io");
            const room = activeRooms.get(roomId);

            if (room && io) {
                if (room.player1.userId === String(req.user?._id)) {
                    room.player1.passedCases = passedCount;
                } else if (room.player2.userId === String(req.user?._id)) {
                    room.player2.passedCases = passedCount;
                }

                io.to(roomId).emit("opponent_progress_updated", {
                    player1Passed: room.player1.passedCases,
                    player2Passed: room.player2.passedCases,
                    totalCount
                });
            }
        }

        const submission = await Submission.create({
            user: req.user?._id || null,
            problem: targetProblemId,
            language,
            sourceCode,
            verdict
        });

        if (verdict === "Accepted" && req.user?._id) {
            const difficultyField = problemDoc.difficulty.toLowerCase();
            await User.findByIdAndUpdate(req.user._id, {
                $inc: { "problemsSolved": 1, [`breakdown.${difficultyField}`]: 1 },
                $push: {
                    solvedProblems: {
                        $each: [{
                            title: problemDoc.title,
                            difficulty: problemDoc.difficulty,
                            language: language || "C++",
                            solvedAt: new Date()
                        }],
                        $position: 0
                    }
                }
            });
        }

        return res.status(201).json({ success: true, verdict, submission });

    } catch (error) {
        console.error("Submission Engine Crash Exception:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ user: req.user?._id }).populate("problem");
        return res.json({ success: true, data: submissions });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};