import { readFileSync } from "fs";

const content = readFileSync("./src/1/input.txt", "utf-8");

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
    const value: Elevation =
        content[index - 1] === undefined
            ? FLAT
            : curr - array[index - 1] === 0
            ? FLAT
            : curr - array[index - 1] > 0
            ? INCREASE
            : DECREASE;
    return [
        ...acc,
        {
            elevation: curr,
            difference: value,
        },
    ];
};

const result = content
    .split("\n")
    .map((c) => +c)
    .reduce(reduceByElevationChange, [])
    .filter((c) => c.difference === INCREASE).length;

console.log(result);
