const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const LS_RE = /\$ ls/;
const CD_UP_RE = /\$ cd \.\./;
const CD_DOWN_RE = /\$ cd (\w+)/;
const FILE_RE = /(\d+) ([\w\.]+)/;
const DIRECTORY_RE = /dir (\w+)/;

type DirectoryNode = {
    name: string;
    size: number;
    parent: DirectoryNode | null;
    children: DirectoryNode[];
    type: "dir" | "file";
};

const ROOT: DirectoryNode = {
    name: "/",
    size: 0,
    parent: null,
    children: [],
    type: "dir",
};

const findChild = (node: DirectoryNode, name: string) =>
    node.children.find((n) => n.name === name);

const printDirectory = (node: DirectoryNode, depth = 0) => {
    console.log(`${"    ".repeat(depth)}${node.name} (${node.size})`);
    node.children.forEach((n) => printDirectory(n, depth + 1));
};

const countUpFileSizes = (node: DirectoryNode) =>
    node.children.reduce((size, n) => {
        size += countUpFileSizes(n);
        node.size += n.size;
        return n.size + size;
    }, 0);

const flattenNodes = (
    node: DirectoryNode,
    acc: DirectoryNode[]
): DirectoryNode[] => {
    acc.push(node);
    node.children.forEach((child) => flattenNodes(child, acc));
    return acc;
};

const buildDirectoryTree = (
    currentNode: DirectoryNode,
    commandMatches: any
) => {
    const { cdUpMatch, cdDownMatch, fileMatch, directoryMatch } =
        commandMatches;
    if (cdUpMatch) {
        if (currentNode.parent !== null) {
            return currentNode.parent;
        }
    } else if (cdDownMatch) {
        const [_, name] = cdDownMatch;
        const targetNode = findChild(currentNode, name);
        return targetNode !== undefined ? targetNode : currentNode;
    } else if (fileMatch) {
        const [_, size, name] = fileMatch;
        currentNode.children = [
            ...currentNode.children,
            {
                name,
                size: parseInt(size),
                parent: currentNode,
                children: [],
                type: "file",
            },
        ];
    } else if (directoryMatch) {
        const [_, name] = directoryMatch;
        currentNode.children = [
            ...currentNode.children,
            {
                name,
                size: 0,
                parent: currentNode,
                children: [],
                type: "dir",
            },
        ];
    }
    return currentNode;
};

const matchLine = (l: string) => ({
    cdUpMatch: l.match(CD_UP_RE),
    cdDownMatch: l.match(CD_DOWN_RE),
    fileMatch: l.match(FILE_RE),
    directoryMatch: l.match(DIRECTORY_RE),
});

const ignoreLs = (l: string) => !l.match(LS_RE);

const tree = input
    .split("\n")
    .filter(ignoreLs)
    .map(matchLine)
    .reduce(buildDirectoryTree, ROOT);

countUpFileSizes(ROOT);

const smallestDirectoryToDelete = flattenNodes(ROOT, [])
    .filter((n) => n.type === "dir")
    .filter((n) => n.size > ROOT.size - 40000000)
    .sort((n1, n2) => n1.size - n2.size)
    .at(0);

console.log(smallestDirectoryToDelete?.size);

export {};
