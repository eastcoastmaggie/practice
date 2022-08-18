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
        while(currentNode != null){
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
    inorder(){

    },
    preorder(){

    }, 
    postorder(){

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
