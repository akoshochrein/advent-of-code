import { readFileSync } from "fs";

const content = readFileSync("./src/1/input.txt", "utf-8")
    .split("\n")
    .map((c) => +c);
// const content = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const INCREASE = "increase";
const DECREASE = "decrease";
const FLAT = "-";

type Elevation = typeof INCREASE | typeof DECREASE | typeof FLAT;

const reduceByElevationChange = (
    acc: {
        elevation: number;
        difference: Elevation;
    }[],
    curr: number,
    index: number,
    array: number[]
) => {
    if (index === 0 || index === 1) return acc;
    const windowSum = curr + array[index - 1] + array[index - 2];
    const value: Elevation =
        acc[index - 1 - 2] === undefined
            ? FLAT
            : windowSum - acc[index - 1 - 2].elevation === 0
            ? FLAT
            : windowSum - acc[index - 1 - 2].elevation > 0
            ? INCREASE
            : DECREASE;
    return [
        ...acc,
        {
            layer: index - 2,
            elevation: windowSum,
            difference: value,
        },
    ];
};

const result = content
    .reduce(reduceByElevationChange, [])
    .filter((c) => c.difference === INCREASE).length;
// .map((c) => console.log(c));

console.log(result);
