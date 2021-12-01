import { readFileSync } from "fs";

const content = readFileSync("./src/1/input.txt", "utf-8")
    .split("\n")
    .map((c) => +c);

const INCREASE = "increase";
const DECREASE = "decrease";
const FLAT = "-";
const LAYER_WINDOW_PUSH = 2;

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
    if (index < LAYER_WINDOW_PUSH) return acc;
    const windowSum = curr + array[index - 1] + array[index - 2];
    const value: Elevation =
        acc[index - 1 - 2] === undefined
            ? FLAT
            : windowSum - acc[index - 1 - LAYER_WINDOW_PUSH].elevation === 0
            ? FLAT
            : windowSum - acc[index - 1 - LAYER_WINDOW_PUSH].elevation > 0
            ? INCREASE
            : DECREASE;
    return [
        ...acc,
        {
            layer: index - LAYER_WINDOW_PUSH,
            elevation: windowSum,
            difference: value,
        },
    ];
};

const result = content
    .reduce(reduceByElevationChange, [])
    .filter((c) => c.difference === INCREASE).length;

console.log(result);
