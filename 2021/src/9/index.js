"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var grid = (0, fs_1.readFileSync)("./src/9/input.txt", "utf-8")
    .split("\n")
    .map(function (r) { return r.split("").map(function (n) { return +n; }); });
var riskLevels = [];
for (var i = 0; i < grid.length; ++i) {
    for (var j = 0; j < grid[i].length; ++j) {
        var height = grid[i][j];
        if (i - 1 > -1 && grid[i - 1][j] < height) {
            process.stdout.write(height.toString());
            continue;
        }
        if (i + 1 < grid.length && grid[i + 1][j] < height) {
            process.stdout.write(height.toString());
            continue;
        }
        if (j - 1 > -1 && grid[i][j - 1] < height) {
            process.stdout.write(height.toString());
            continue;
        }
        if (j + 1 < grid[i].length && grid[i][j + 1] < height) {
            process.stdout.write(height.toString());
            continue;
        }
        process.stdout.write("\x1b[31m");
        process.stdout.write(height.toString());
        process.stdout.write("\x1b[0m");
        riskLevels.push(height + 1);
    }
    process.stdout.write("\n");
}
// process.stdout.write("\x1b[1m");
// process.stdout.write(riskLevels.reduce((total, r) => total + r, 0).toString());
