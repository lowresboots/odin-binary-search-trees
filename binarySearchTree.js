class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const cleanArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(cleanArray);
    }

    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else if (value > current.data) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            } else {
                return;
            }
        }
    }

    deleteItem(value) {
        this.root = this.deleteRec(this.root, value);
    }

    deleteRec(root, value) {
        if (root === null) {
            return null;
        }

        if (value < root.data) {
            root.left = this.deleteRec(root.left, value);
        } else if (value > root.data) {
            root.right = this.deleteRec(root.right, value);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            root.data = this.minValue(root.right);

            root.right = this.deleteRec(root.right, root.data);
        }

        return root;
    }

    minValue(root) {
        let minv = root.data;
        while (root.left !== null) {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    find(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) return current;

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    levelOrder(callback) {
        if (!callback) throw new Error("Callback is required");
        if (!this.root) return;

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            callback(node);
            traverse(node.right);
        }

        traverse(this.root);
    }

    preOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        function traverse(node) {
            if (node === null) return;

            callback(node);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);
    }

    postOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            callback(node);
        }

        traverse(this.root);
    }

    height(node) {
        if (node === null) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (!node) return -1;

        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (node.data === current.data) return depth;

            if (node.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }

        return -1;
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) return true;

            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

            if (Math.abs(leftHeight - rightHeight) > 1) return false;

            return checkBalance(node.left) && checkBalance(node.right);
        };

        return checkBalance(this.root);
    }

    rebalance() {
        const values = [];
        this.inOrder(node => values.push(node.data));
        this.root = this.buildTree(values);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

module.exports = { Tree, Node, prettyPrint };