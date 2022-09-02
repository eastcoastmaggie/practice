const node = require("./node");
const treeProto = {
    // build tree from array and return root
    buildTree(array) {
        if(array.length == 0){
            return null;
        }
        // sort array first (numerically)
        array.sort(function(a, b){return a-b});

        let midPoint = Math.floor(array.length / 2);
        let root = node(array[midPoint]);

        // recursively build tree
        root.leftChild = this.buildTree(array.slice(0, midPoint));
        root.rightChild = this.buildTree(array.slice(midPoint+1, array.length));
        
        this.root = root;
        return root;
    },
    findSmallest(subTreeRoot){
        if (subTreeRoot.leftChild ==  null){
            return subTreeRoot;
        }
        return this.findSmallest(subTreeRoot.leftChild);
    },
    isLeaf(node){
        return (node.leftChild == null && node.rightChild == null );  
    },
    // insert a new node at bottom of tree
    insert(value, root = this.root){
        let newNode = node(value);
        if(this.isLeaf(root)){
            if(value <= root.value){
                root.leftChild = newNode;
            } else {
                root.rightChild = newNode;
            }
            return root;
        }
        if(value <= root.value){
            return this.insert(value, root.leftChild);
        } else {
            return this.insert(value, root.rightChild);
        }
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
                if (this.isLeaf(currentNode)){
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
                if (currentNode.leftChild != null && currentNode.rightChild != null){
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
                if (currentNode.leftChild != null){
                    if (nodeParent.value > value){
                            nodeParent.leftChild = currentNode.leftChild;
                    } else {
                        nodeParent.rightChild = currentNode.leftChild;
                    }
                    return this;
                }
                // has right child only
                if (currentNode.rightChild != null){
                    if (nodeParent.value < value){
                            nodeParent.leftChild = currentNode.rightChild;
                    } else {
                        nodeParent.rightChild = currentNode.rightChild;
                    }
                    return this;
                }
            }
            nodeParent = currentNode;
            currentNode = (currentNode.value > value) ? currentNode.leftChild : currentNode.rightChild;
            
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
            if(currentNode.leftChild != null ){
                queue.push(currentNode.leftChild);
            }
            if(currentNode.rightChild != null){
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
            
            if (root.leftChild != null){
                results = results.concat(this.inorder(func, root.leftChild));
            }
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            if (root.rightChild != null){
                results = results.concat(this.inorder(func, root.rightChild));
            }
            
            return results;
        }
    },
    preorder(func = null, root = this.root){
        let results = [];
        if (this.isLeaf(root)){
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            return results
        }
        if(func != null){
            results.push(func(root));
        } else {
            results.push(root.value);
        }
        if (root.leftChild != null){
            results = results.concat(this.preorder(func, root.leftChild));
        }
        if (root.rightChild != null){
            results = results.concat(this.preorder(func, root.rightChild));
        }
        
        return results;
    },
    postorder(func = null, root = this.root){
        let results = [];
        if (this.isLeaf(root)){
            if(func != null){
                results.push(func(root));
            } else {
                results.push(root.value);
            }
            return results
        }
        if (root.leftChild != null){
            results = results.concat(this.postorder(func, root.leftChild));
        }
        if (root.rightChild != null){
            results = results.concat(this.postorder(func, root.rightChild));
        }
        if(func != null){
            results.push(func(root));
        } else {
            results.push(root.value);
        }
        return results;
    },
    // Function which accepts a node and returns its height. 
    // Height is defined as the number of edges in longest path from a given node to a leaf node.
    height(node){
        let heightLeft = 0;
        let heightRight = 0;
        if (this.isLeaf(node)){
            return 1;
        }
        if (node.leftChild != null){
            heightLeft = 1 + this.height(node.leftChild);
        }
        if (node.rightChild != null){
            heightRight = 1 + this.height(node.rightChild);
        }
        return (heightLeft > heightRight) ? heightLeft : heightRight;
        
    },
    // Function which accepts a node and returns its depth. 
    // Depth is defined as the number of edges in path from a given node to the tree’s root node.
    depth(node, root = this.root){
        let depth = 0;
        if (root == node){
            return 0;
        }
        if (node.value < root.value){
            depth = 1 + this.depth(node, root.leftChild);
        } else {
            depth = 1 + this.depth(node, root.rightChild);
        }
        return depth;
    },
    // isBalanced function which checks if the tree is balanced. 
    // A balanced tree is one where the difference between heights of left subtree and right subtree of 
    // every node is not more than 1.
    isBalanced(root = this.root){
        if (this.isLeaf(root) == true){
            return true;
        }
        let heightLeft = 0;
        let heightRight = 0;
        if (root.leftChild != null){
            heightLeft = this.height(root.leftChild);
        }
        if (root.rightChild != null){
            heightRight = this.height(root.rightChild);
        }
        if (-1 <= (heightLeft - heightRight) && (heightLeft - heightRight) <= 1 ){
            return true;
        }
        return false;
    },
    //rebalance function which rebalances an unbalanced tree. 
    rebalance(){
        if (this.isLeaf(this.root)){
            return this;
        }
        return this.buildTree(this.inorder());
    }
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
