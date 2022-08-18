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