const { Tree, prettyPrint } = require('./binarySearchTree');

function createRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

function testBST() {
    const arr = createRandomArray(10);
    console.log("Original array:", arr);
    
    const bst = new Tree(arr);
    console.log("\nBinary Search Tree structure:");
    prettyPrint(bst.root);

    console.log("\nIs the tree balanced?", bst.isBalanced());

    console.log("\nElements in level order:");
    bst.levelOrder(node => process.stdout.write(node.data + " "));
    
    console.log("\n\nElements in pre order:");
    bst.preOrder(node => process.stdout.write(node.data + " "));
    
    console.log("\n\nElements in post order:");
    bst.postOrder(node => process.stdout.write(node.data + " "));
    
    console.log("\n\nElements in order:");
    bst.inOrder(node => process.stdout.write(node.data + " "));

    console.log("\n\nAdding numbers > 100 to unbalance the tree...");
    [105, 110, 115, 120, 125].forEach(num => bst.insert(num));
    
    console.log("\nUnbalanced tree structure:");
    prettyPrint(bst.root);

    console.log("\nIs the tree balanced?", bst.isBalanced());

    console.log("\nRebalancing the tree...");
    bst.rebalance();
    
    console.log("\nBalanced tree structure:");
    prettyPrint(bst.root);

    console.log("\nIs the tree balanced?", bst.isBalanced());

    console.log("\nElements in level order:");
    bst.levelOrder(node => process.stdout.write(node.data + " "));
    
    console.log("\n\nElements in pre order:");
    bst.preOrder(node => process.stdout.write(node.data + " "));
    
    console.log("\n\nElements in post order:");
    bst.postOrder(node => process.stdout.write(node.data + " "));
    
    console.log("\n\nElements in order:");
    bst.inOrder(node => process.stdout.write(node.data + " "));
}

testBST();