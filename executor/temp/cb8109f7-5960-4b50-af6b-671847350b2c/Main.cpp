class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        
        while (curr != nullptr) {
            ListNode* nextNode = curr->next; // Store next node reference
            curr->next = prev;               // Invert the node link direction pointer
            prev = curr;                     // Move pointers forward
            curr = nextNode;
        }
        
        return prev; // New head pointer of the reversed list
    }
};