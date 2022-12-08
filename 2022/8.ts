const input = `30373
25512
65332
33549
35390`;

const getScenicScore = (
    treesToCheck: number[],
    pivotTree: number,
    distanceFromEdge: number
) => {
    const blockingTrees = treesToCheck
        .map((otherTree, index) => ({
            distance: index + 1,
            isBlocking: otherTree >= pivotTree,
        }))
        .filter((otherTree) => otherTree.isBlocking);
    return blockingTrees.length > 0
        ? blockingTrees[0].distance
        : distanceFromEdge;
};

const grid = input
    .split("\n")
    .map((l) => l.split(""))
    .map((r) =>
        r.reduce<number[]>((numArray, n) => [...numArray, parseInt(n)], [])
    );

let scenicScores: number[] = [];
for (let i = 1; i < grid.length - 1; ++i) {
    for (let j = 1; j < grid[i].length - 1; ++j) {
        const tree = grid[i][j];

        const row = grid[i];
        const scenicScoreLeft = getScenicScore(
            row.slice(0, j).reverse(),
            tree,
            j
        );
        const scenicScoreRight = getScenicScore(
            row.slice(j + 1),
            tree,
            row.length - j - 1
        );

        const column = grid.map((row) => row[j]);
        const scenicScoreTop = getScenicScore(
            column.slice(0, i).reverse(),
            tree,
            i
        );
        const scenicScoreBottom = getScenicScore(
            column.slice(i + 1),
            tree,
            column.length - i - 1
        );

        scenicScores = [
            ...scenicScores,
            scenicScoreLeft *
                scenicScoreRight *
                scenicScoreTop *
                scenicScoreBottom,
        ];
    }
}

console.log(Math.max(...scenicScores));

export {};
