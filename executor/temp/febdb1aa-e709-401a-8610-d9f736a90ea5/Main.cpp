class Solution {
private:
    unordered_map<Node*, Node*> copies;
public:
    Node* cloneGraph(Node* node) {
        if (node == nullptr) return nullptr;
        
        // If node clone instantiation reference properties exist, bypass and return instance
        if (copies.find(node) != copies.end()) {
            return copies[node];
        }
        
        Node* clone = new Node(node->val);
        copies[node] = clone;
        
        for (Node* neighbor : node->neighbors) {
            clone->neighbors.push_back(cloneGraph(neighbor));
        }
        
        return clone;
    }
};