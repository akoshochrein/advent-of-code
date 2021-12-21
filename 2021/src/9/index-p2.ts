import { readFileSync } from "fs";

type Cell = {
    basinIndex: number | null;
    value: number;
};

const grid: Cell[][] = readFileSync("./src/9/input.txt", "utf-8")
    .split("\n")
    .map((r) =>
        r.split("").map((n) => ({
            basinIndex: null,
            value: +n,
        }))
    );

let _basinIndex = 0;

for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
        // if we find a 9, we don't care
        if (grid[i][j].value === 9) continue;
        // if the cell is part of a basin, we don't care
        if (grid[i][j].basinIndex !== null) continue;
        // if  a neghbouring cell is part of a basin, we join the same basin
        if (i - 1 > -1 && grid[i - 1][j].basinIndex !== null) {
            grid[i][j].basinIndex = grid[i - 1][j].basinIndex;
            continue;
        }
        if (i + 1 < grid.length && grid[i + 1][j].basinIndex !== null) {
            grid[i][j].basinIndex = grid[i + 1][j].basinIndex;
            continue;
        }
        if (j - 1 > -1 && grid[i][j - 1].basinIndex !== null) {
            grid[i][j].basinIndex = grid[i][j - 1].basinIndex;
            continue;
        }
        if (j + 1 < grid[i].length && grid[i][j + 1].basinIndex !== null) {
            grid[i][j].basinIndex = grid[i][j + 1].basinIndex;
            continue;
        }
        // otherwise, we create a new basin
        grid[i][j].basinIndex = _basinIndex;
        _basinIndex++;
    }
}

// TODO: normalization,
// we run over all the cells again and set the basin
// index of each of them to the lowest one around them
for (let _ = 0; _ < _basinIndex; _++) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = grid[i][j];
            if (cell.basinIndex !== null) {
                cell.basinIndex = Math.min(
                    ...[
                        cell.basinIndex,
                        ...[
                            i - 1 > -1 && grid[i - 1][j].basinIndex !== null
                                ? grid[i - 1][j].basinIndex!
                                : 99999999,
                        ],
                        ...[
                            i + 1 < grid.length &&
                            grid[i + 1][j].basinIndex !== null
                                ? grid[i + 1][j].basinIndex!
                                : 99999999,
                        ],
                        ...[
                            j - 1 > -1 && grid[i][j - 1].basinIndex !== null
                                ? grid[i][j - 1].basinIndex!
                                : 99999999,
                        ],
                        ...[
                            j + 1 < grid[i].length &&
                            grid[i][j + 1].basinIndex !== null
                                ? grid[i][j + 1].basinIndex!
                                : 99999999,
                        ],
                    ]
                );
            }
        }
    }
}

// We need to the cells by basin index
const basinSizes: { [k: number]: number } = {};
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        if (cell.basinIndex !== null && basinSizes[cell.basinIndex]) {
            basinSizes[cell.basinIndex]++;
        } else if (cell.basinIndex !== null) {
            basinSizes[cell.basinIndex] = 1;
        }
    }
}

// for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[i].length; j++) {
//         const cell = grid[i][j];
//         if (cell.basinIndex !== null) {
//             process.stdout.write(`\x1b[${cell.basinIndex + 30}m`);
//         } else {
//             process.stdout.write("\x1b[0m");
//         }
//         process.stdout.write(cell.value.toString());
//     }
//     process.stdout.write("\n");
// }
// Get the top 3 from there

console.log(
    Object.entries(basinSizes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .reduce((acc, b) => acc * b[1], 1)
);
