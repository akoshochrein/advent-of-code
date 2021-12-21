"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs_1 = require("fs");
var grid = (0, fs_1.readFileSync)("./src/9/input.txt", "utf-8")
    .split("\n")
    .map(function (r) {
    return r.split("").map(function (n) { return ({
        basinIndex: null,
        value: +n
    }); });
});
var _basinIndex = 0;
for (var i = 0; i < grid.length; ++i) {
    for (var j = 0; j < grid[i].length; ++j) {
        // if we find a 9, we don't care
        if (grid[i][j].value === 9)
            continue;
        // if the cell is part of a basin, we don't care
        if (grid[i][j].basinIndex !== null)
            continue;
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
for (var _ = 0; _ < _basinIndex; _++) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var cell = grid[i][j];
            if (cell.basinIndex !== null) {
                cell.basinIndex = Math.min.apply(Math, __spreadArray(__spreadArray(__spreadArray(__spreadArray([
                    cell.basinIndex
                ], [
                    i - 1 > -1 && grid[i - 1][j].basinIndex !== null
                        ? grid[i - 1][j].basinIndex
                        : 99999999,
                ], false), [
                    i + 1 < grid.length &&
                        grid[i + 1][j].basinIndex !== null
                        ? grid[i + 1][j].basinIndex
                        : 99999999,
                ], false), [
                    j - 1 > -1 && grid[i][j - 1].basinIndex !== null
                        ? grid[i][j - 1].basinIndex
                        : 99999999,
                ], false), [
                    j + 1 < grid[i].length &&
                        grid[i][j + 1].basinIndex !== null
                        ? grid[i][j + 1].basinIndex
                        : 99999999,
                ], false));
            }
        }
    }
}
// We need to the cells by basin index
var basinSizes = {};
for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
        var cell = grid[i][j];
        if (cell.basinIndex !== null && basinSizes[cell.basinIndex]) {
            basinSizes[cell.basinIndex]++;
        }
        else if (cell.basinIndex !== null) {
            basinSizes[cell.basinIndex] = 1;
        }
    }
}
for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
        var cell = grid[i][j];
        if (cell.basinIndex !== null) {
            process.stdout.write("\u001B[".concat(cell.basinIndex + 30, "m"));
        }
        else {
            process.stdout.write("\x1b[0m");
        }
        process.stdout.write(cell.value.toString());
    }
    process.stdout.write("\n");
}
// Get the top 3 from there
