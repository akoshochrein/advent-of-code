import { readFileSync } from "fs";

const ranges = readFileSync("./src/5/input.txt", "utf-8")
    .split("\n")
    .map((r) => {
        const startEnd = r.split("->");
        const trimmed = startEnd.map((x) => x.trim());
        const firstCoords = trimmed[0].split(",");
        const secondCoords = trimmed[1].split(",");
        return [
            [+firstCoords[0], +firstCoords[1]],
            [+secondCoords[0], +secondCoords[1]],
        ];
    });

// generate all coordinates
const allCoordinates = [];
for (let i = 0; i < ranges.length; ++i) {
    const range = ranges[i];
    if (range[0][0] === range[1][0]) {
        const maxY = Math.max(...[range[0][1], range[1][1]]);
        const minY = Math.min(...[range[0][1], range[1][1]]);
        for (let y = minY; y <= maxY; ++y) {
            allCoordinates.push([range[0][0], y]);
        }
    } else if (range[0][1] === range[1][1]) {
        const maxX = Math.max(...[range[0][0], range[1][0]]);
        const minX = Math.min(...[range[0][0], range[1][0]]);
        for (let x = minX; x < maxX + 1; ++x) {
            allCoordinates.push([x, range[0][1]]);
        }
    } else if (range[0][0] < range[1][0] && range[0][1] > range[1][1]) {
        const length = range[1][0] - range[0][0];
        for (let x = 0; x < length + 1; ++x) {
            allCoordinates.push([range[0][0] + x, range[0][1] - x]);
        }
    } else if (range[0][0] < range[1][0] && range[0][1] < range[1][1]) {
        const length = range[1][0] - range[0][0];
        for (let x = 0; x < length + 1; ++x) {
            allCoordinates.push([range[0][0] + x, range[0][1] + x]);
        }
    } else if (range[0][0] > range[1][0] && range[0][1] > range[1][1]) {
        const length = range[0][0] - range[1][0];
        for (let x = 0; x < length + 1; ++x) {
            allCoordinates.push([range[0][0] - x, range[0][1] - x]);
        }
    } else if (range[0][0] > range[1][0] && range[0][1] < range[1][1]) {
        const length = range[0][0] - range[1][0];
        for (let x = 0; x < length + 1; ++x) {
            allCoordinates.push([range[0][0] - x, range[0][1] + x]);
        }
    }
}

// count coordinate occurences
const groupByLocation: { [k: string]: number } = {};
for (let i = 0; i < allCoordinates.length; ++i) {
    const coordinate = allCoordinates[i];
    if (groupByLocation[coordinate.toString()]) {
        groupByLocation[coordinate.toString()]++;
    } else {
        groupByLocation[coordinate.toString()] = 1;
    }
}

// filter for > 2
console.log(Object.entries(groupByLocation).filter((x) => x[1] > 1).length);
