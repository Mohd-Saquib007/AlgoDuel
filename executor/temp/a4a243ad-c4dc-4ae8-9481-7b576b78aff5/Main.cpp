class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr;
        TreeNode* tempLeft = invertTree(root->left);
        TreeNode* tempRight = invertTree(root->right);
        
        root->left = tempRight;
        root->right = tempLeft;
        
        return root;
    }
};