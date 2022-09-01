const node = require("./node");
const treeProto = {
    // build tree from array
    buildTree(array) {
        if(array.length == 0){
            return null;
        }
        // sort array first (numerically)
        array.sort(function(a, b){return a-b});
        // assign root
        let midPoint = Math.floor(array.length / 2);
        let rootNode = node();
        rootNode.value = array[midPoint];
            if(array.length > 1){
            // recursively build tree
                rootNode.leftChild = this.buildTree(array.slice(0, midPoint));
                if(array.length > 2){
                    rootNode.rightChild = this.buildTree(array.slice(midPoint+1, array.length));
                }
        }
        // return root
        this.root = rootNode;
        return rootNode;
    },
    // insert a new node at bottom of tree
    insert(value) {
        let newNode = node();
        newNode.value = value;
        // Add node to tree
        if (this.root.value == null){
            this.root = newNode;
            return this;
        }
        let currentNode = this.root;
        while(currentNode.value != null){
            if(value <= currentNode.value){
                if (currentNode.leftChild.value != null){
                    currentNode = currentNode.leftChild;
                } else {
                    currentNode.leftChild = newNode;
                    return currentNode;
                }
            } else if (value > currentNode.value){
                if(currentNode.rightChild.value != null){
                    currentNode = currentNode.rightChild;
                } else {
                    currentNode.rightChild = newNode;
                    return currentNode;
                }
            }
    
        }
    },
    findSmallest(subTreeRoot){
        if (subTreeRoot.leftChild.value ==  null){
            return subTreeRoot;
        }
        return this.findSmallest(subTreeRoot.leftChild);
    },
    isLeaf(node){
        return (node.leftChild == null || node.leftChild.value == null) && (node.rightChild == null || node.rightChild.value == null);  
    },
    delete(value) {
        // Find node
        let currentNode = this.root;
        let nodeParent = null;
        if (this.root == null){
            return null;
        }
        while(currentNode != null){
            if (value == currentNode.value){

                // has no children
                if (currentNode.leftChild.value == null && currentNode.rightChild.value == null){
                    if (nodeParent == null){
                        this.root = null;
                        return this;
                    }
                    if (nodeParent.value > value){
                        nodeParent.leftChild = null;
                    }
                    return this;
                }
                // has both left and right child
                if (currentNode.leftChild.value != null && currentNode.rightChild.value != null){
                    // find and remove the leaf node which will replace currentNode
                    let replacement = this.findSmallest(currentNode);
                    
                    this.delete(replacement.value);
                    
                    replacement.leftChild = currentNode.leftChild;;
                    replacement.rightChild = currentNode.rightChild;
                    if (nodeParent == null){
                        this.root = replacement;
                    } else if (nodeParent.value > value){
                        nodeParent.leftChild = replacement;
                    } else {
                        nodeParent.rightChild = replacement;
                    }
                    return this;
                }
                // has left child only
                if (currentNode.leftChild.value != null){
                    if (nodeParent.value > value){
                            nodeParent.leftChild = currentNode.leftChild;
                    } else {
                        nodeParent.rightChild = currentNode.leftChild;
                    }
                    return this;
                }
                // has right child only
                if (currentNode.rightChild.value != null){
                    if (nodeParent.value < value){
                            nodeParent.leftChild = currentNode.rightChild;
                    } else {
                        nodeParent.rightChild = currentNode.rightChild;
                    }
                    return this;
                }
            }
            nodeParent = currentNode;
            if(currentNode.value > value){
                currentNode = currentNode.leftChild;
            } else currentNode = currentNode.rightChild;
            
        }
    },
    find(value){
        
        let currentNode = this.root;
        while (currentNode.value != null){
            if (currentNode.value == value){
                return currentNode;
            }
            if (currentNode.value > value){
                currentNode = currentNode.leftChild;
            } else currentNode = currentNode.rightChild;
        }
        return null;

    },
    //  A function to traverse the tree in breadth-first level order
    //  and provide each node as the argument to the provided function
    levelOrder(func = null){
        let queue = [this.root];
        let results = [];
        while (queue.length > 0){
            let currentNode = queue.shift();
            if(currentNode.leftChild.value != null ){
                queue.push(currentNode.leftChild);
            }
            if(currentNode.rightChild.value != null){
                queue.push(currentNode.rightChild);
            }
            if(func != null){
                results.push(func(currentNode));
            } else {
                results.push(currentNode.value);
            }
        }
        return results;
    },
    // functions should traverse the tree in their respective depth-first order 
    // and yield each node to the provided function given as an argument
    // left-root-right
    inorder(func = null, root = this.root){
        let results = [];
        if (this.isLeaf(root)){
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            return results
        } else {
            
            if (root.leftChild != null && root.leftChild.value != null){
                results = results.concat(this.inorder(func, root.leftChild));
            }
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            if (root.rightChild != null && root.rightChild.value != null){
                results = results.concat(this.inorder(func, root.rightChild));
            }
            
            return results;
        }
    },

    // inorder(func = null){
    //     let stack = [this.root];
    //     let currentNode = this.root;
    //     let results = [];
    //     let traverseDown = true;
    //     while(stack.length > 0){
    //         if((currentNode.leftChild != null &&  currentNode.leftChild.value != null) && traverseDown ){
    //             stack.push(currentNode.leftChild);
    //         } else {
    //             traverseDown = false;
    //             // do the thing
    //             if(func != null){
    //                 results.push(func(currentNode.value));
    //             } else {
    //                 results.push(currentNode.value);
    //             }
    //             stack.pop();
    //             // push right child
    //             if(currentNode.rightChild.value != null ){
    //                 traverseDown = true;
    //                 stack.push(currentNode.rightChild);
    //             }
    //         }
    //         currentNode = stack[stack.length - 1];
    //     }
    //     return results;
        
    // },
    preorder(func = null, root = this.root){
        let results = [];
        if (this.isLeaf(root)){
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            return results
        } else {
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            if (root.leftChild != null && root.leftChild.value != null){
                results = results.concat(this.preorder(func, root.leftChild));
            }
            if (root.rightChild != null && root.rightChild.value != null){
                results = results.concat(this.preorder(func, root.rightChild));
            }
            
            return results;
        }
    },
        // preorderNoRec(func = null){
        // let stack = [this.root];
        // let currentNode = this.root;
        // let results = [];
        // let traverseDown = true;
        // while(stack.length > 0){
        //     if (traverseDown){
        //         traverseDown = false;
        //         if(func != null){
        //             results.push(func(currentNode.value));
        //         } else {
        //             results.push(currentNode.value);
        //         }
        //         if (currentNode.leftChild != null && currentNode.leftChild.value != null){
        //             traverseDown = true;
        //             stack.push(currentNode.leftChild);
        //         }        
        //     } else {
        //         traverseDown = false;     
        //         stack.pop();
        //         // push right child
        //         if(currentNode.rightChild.value != null ){
        //             traverseDown = true;
        //             stack.push(currentNode.rightChild);
        //         }
        //     }
        //     currentNode = stack[stack.length - 1];
        // }
        // return results;

    // }, 
    postorder(func = null, root = this.root){
        let results = [];
        if (this.isLeaf(root)){
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            return results
        } else {
            if (root.leftChild != null && root.leftChild.value != null){
                results = results.concat(this.postorder(func, root.leftChild));
            }
            if (root.rightChild != null && root.rightChild.value != null){
                results = results.concat(this.postorder(func, root.rightChild));
            }
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            return results;
        }

    },
    // Function which accepts a node and returns its height. 
    // Height is defined as the number of edges in longest path from a given node to a leaf node.
    height(node){
        let heightLeft = 0;
        let heightRight = 0;
        if (this.isLeaf(node)){
            return 1;
        } else{

            if (node.leftChild != null && node.leftChild.value != null){
                heightLeft = 1 + this.height(node.leftChild);
            }
            if (node.rightChild != null && node.rightChild.value != null){
                heightRight = 1 + this.height(node.rightChild);
            }
            return heightLeft > heightRight ? heightLeft : heightRight;
        }
    },
    // Function which accepts a node and returns its depth. 
    // Depth is defined as the number of edges in path from a given node to the tree’s root node.
    depth(node, root = this.root){
        let depth = 0;
        if (root == node){
            return 0;
        } else{

            if (node.value < root.value){
                depth = 1 + this.depth(node, root.leftChild);
            } else {
                depth = 1 + this.depth(node, root.rightChild);
            }
            return depth;
        }
    },
    // isBalanced function which checks if the tree is balanced. 
    // A balanced tree is one where the difference between heights of left subtree and right subtree of 
    // every node is not more than 1.
    isBalanced(root = this.root){
        if (this.isLeaf(root) == true){
            return true;
        } else {
            let heightLeft = 0;
            let heightRight = 0;
            if (root.leftChild != null && root.leftChild.value != null){
                heightLeft = this.height(root.leftChild);
            }
            if (root.rightChild != null && root.rightChild.value != null){
                heightRight = this.height(root.rightChild);
            }
            if (-1 <= (heightLeft - heightRight) && (heightLeft - heightRight) <= 1 ){
                return true;
            }
            return false;
        }
    },
    //rebalance function which rebalances an unbalanced tree. 
    rebalance(){
        if (this.isLeaf(this.root)){
            return this;
        } else {
            return this.buildTree(this.inorder());
        }
    }
    
    // toString() {
    //     // returns string representing list  ( value ) -> ( value ) -> ( value ) -> null
    //     if(this.head == null) {
    //         return '';
    //     }
    //     let currentNode = this.head;
    //     let nodes  = [];
    //     while (currentNode.nextNode != null){
    //         nodes.push(`( ${String(currentNode.value)} )`);
    //         currentNode = currentNode.nextNode;
    //     } 
    //     return nodes.join(' -> ');
    // },
}
const tree = (array) => {
    return Object.create(treeProto, {
        root : {
            writable: true,
            configurable:true,
            value: null
        }
    })
};

module.exports = tree;
