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

// filter for horizontal and vertical
const filteredRanges = ranges.filter(
    (r) => r[0][0] === r[1][0] || r[0][1] === r[1][1]
);

// generate all coordinates
const allCoordinates = [];
for (let i = 0; i < filteredRanges.length; ++i) {
    const range = filteredRanges[i];
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
