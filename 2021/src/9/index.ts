import { readFileSync } from "fs";

const grid = readFileSync("./src/9/input.txt", "utf-8")
    .split("\n")
    .map((r) => r.split("").map((n) => +n));

const riskLevels = [];
for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
        const height = grid[i][j];
        if (i - 1 > -1 && grid[i - 1][j] <= height) {
            continue;
        }
        if (i + 1 < grid.length && grid[i + 1][j] <= height) {
            continue;
        }
        if (j - 1 > -1 && grid[i][j - 1] <= height) {
            continue;
        }
        if (j + 1 < grid[i].length && grid[i][j + 1] <= height) {
            continue;
        }
        riskLevels.push(height + 1);
    }
}

// process.stdout.write("\x1b[1m");
console.log(riskLevels.reduce((total, r) => total + r, 0).toString());
