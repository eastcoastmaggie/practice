const tree = require('./binarySearchTree');
const node = require('./node');

test('build tree with nodes',() => {
    let  newTree = tree();
    let root = newTree.buildTree([1, 5, 6, 3, 34, 99, 12, 200]);

    expect(root.value).toBe(12);
    expect(root.leftChild.value).toBe(5);
    expect(root.rightChild.value).toBe(99);
});
test('insert into tree',() => {
    let  newTree = tree();
    newTree.buildTree([1, 5, 6, 3, 34, 99, 12, 200]);
    expect(newTree.insert(98).value).toBe(34);
});
test('delete only node from tree',() => {
    let  newTree = tree();
    newTree.buildTree([200]);
    newTree.delete(200);
    expect(newTree.root).toBe(null);
});
test('delete from tree when both left and right children exist',() => {
     let  newTree = tree();
     newTree.buildTree([99, 12, 4]);
     newTree.delete(12);
    //  console.log(newTree.root);
     expect(newTree.root.value).toBe(4);
     expect(newTree.root.leftChild).toBe(null);
     expect(newTree.root.rightChild.value).toBe(99);
 });
test('delete from tree',() => {
    let  newTree = tree();
    newTree.buildTree([12]);
    newTree.delete(12);
    expect(newTree.root).toBe(null);
});
test('delete from tree when only right children exist',() => {
    let  newTree = tree();
    newTree.buildTree([99, 12, 33, 34, 4]);
    newTree.delete(99);
   //  console.log(newTree.root);
    expect(newTree.root.value).toBe(33);
    expect(newTree.root.leftChild.value).toBe(12);
    expect(newTree.root.rightChild.value).toBe(34);
});
test('delete from tree when left or right children exist',() => {
    let  newTree = tree();
    newTree.buildTree([99, 12, 33, 4, 1, 100, 8]);
    newTree.delete(99);
   //  console.log(newTree.root);
    expect(newTree.root.value).toBe(12);
    expect(newTree.root.leftChild.value).toBe(4);
    expect(newTree.root.rightChild.value).toBe(33);
});
test('find value in tree ',() => {
    let  newTree = tree();
    newTree.buildTree([99, 12, 33, 4, 1, 100, 8]);
    let newNode = node();

    expect(newTree.find(4).value).toBe(4);
    expect(newTree.find(4).leftChild.value).toBe(1);
    expect(newTree.find(4).rightChild.value).toBe(8);
});
test('levelOrder of in tree ',() => {
    let  newTree = tree();
    newTree.buildTree([99, 12, 33, 'A']);
    let myFunction = function(node){
        return (node.value + 5);
    };
    let results = [104, 38, "A5", 17]
    expect(newTree.levelOrder(myFunction)).toContain(104);
    expect(newTree.levelOrder(myFunction)).toContain(38);
    expect(newTree.levelOrder(myFunction)).toContain('A5');
    expect(newTree.levelOrder(myFunction)).toContain(17);
});
test('levelOrder of in tree ',() => {
    let  newTree = tree();
    newTree.buildTree([99, 12, 33, 'A']);

    expect(newTree.levelOrder()).toContain(99);
    expect(newTree.levelOrder()).toContain(33);
    expect(newTree.levelOrder()).toContain('A');
    expect(newTree.levelOrder()).toContain(12);
});
test('inorder of in tree ',() => {
    let  newTree = tree();
    newTree.buildTree([1,4,3,2,5,6,7]);
    let inOrder = newTree.inorder();
    expect(inOrder).toContain(1);
    expect(inOrder).toContain(3);
    expect(inOrder).toContain(2);
    expect(inOrder).toContain(4);
    expect(inOrder).toEqual([1,2,3,4,5,6,7]);
});
test('preorder of in tree ',() => {
    let  newTree = tree();
    newTree.buildTree([1,4,3,2,5,6,7]);
    let preOrder = newTree.preorder();
    expect(preOrder).toContain(1);
    expect(preOrder).toContain(3);
    expect(preOrder).toContain(2);
    expect(preOrder).toContain(4);
    expect(preOrder).toEqual([4,2,1,3,6,5,7]);
});
test('postorder of in tree ',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);
    let postOrder = newTree.postorder();
    expect(postOrder).toContain(1);
    expect(postOrder).toContain(3);
    expect(postOrder).toContain(2);
    expect(postOrder).toEqual([1,3,2,6,7,5]);
});
test('postorder of in tree with function ',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);
    let myFunction = function(node){
        return (node.value + 2);
    };
    let postOrder = newTree.postorder(myFunction);
    expect(postOrder).toContain(3);
    expect(postOrder).toContain(5);
    expect(postOrder).toContain(4);
    expect(postOrder).toEqual([3,5,4,8,9,7]);
});
test('height of root is 3',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);

    let height = newTree.height(newTree.root);
    expect(height).toEqual(3);
    
});
test('height of root.leftChild is 2',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);

    let height = newTree.height(newTree.root.leftChild);
    expect(height).toEqual(2);
    
});
test('height of root.rightChild is 1',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);

    let height = newTree.height(newTree.root.rightChild.leftChild);
    expect(height).toEqual(1);
    
});
test('depth of root.rightChild is 1',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);

    let height = newTree.depth(newTree.root.rightChild);
    expect(height).toEqual(1);
    
});
test('depth of root is 0',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);

    let height = newTree.depth(newTree.root);
    expect(height).toEqual(0);
    
});
test('depth of root.rightChild.leftChild is 2',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);

    let height = newTree.depth(newTree.root.rightChild.leftChild);
    expect(height).toEqual(2);
    
});
test('tree is balanced',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2,5,6,7]);

    let balance = newTree.isBalanced();
    expect(balance).toEqual(true);
    
});
test('tree is not balanced',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2]);
    newTree.insert(98);
    newTree.insert(97);
    newTree.insert(18);

    let balance = newTree.isBalanced();
    expect(balance).toEqual(false);
    
});
test('tree is balanced after rebalancing',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2]);
    newTree.insert(98);
    newTree.insert(97);
    newTree.insert(18);
    newTree.rebalance();

    let balance = newTree.isBalanced();
    expect(balance).toEqual(true);
    
});
test('tree is balanced after rebalancing',() => {
    let  newTree = tree();
    newTree.buildTree([1,3,2]);
    newTree.insert(98);
    newTree.delete(1);
    newTree.insert(97);
    newTree.insert(18);
    expect(newTree.isBalanced()).toEqual(false);
    expect(newTree.inorder()).toEqual([2,3,18,97,98]);
    expect(newTree.preorder()).toEqual([2,3,98,97,18]);
    expect(newTree.postorder()).toEqual([18,97,98,3,2]);

    newTree.rebalance();
    expect(newTree.inorder()).toEqual([2,3,18,97,98]);
    expect(newTree.preorder()).toEqual([18,3,2,98,97]);
    expect(newTree.postorder()).toEqual([2,3,97,98,18]);

    expect(newTree.isBalanced()).toEqual(true);
    
});