import { readFileSync } from "fs";

const content = readFileSync("./src/3/input.txt", "utf-8").split("\n");

const ONE = "1";
const ZERO = "0";

const accumulator = content[0].split("").map((b) => ({
    ones: 0,
    zeros: 0,
}));

const result = content
    .reduce((acc, n) => {
        n.split("").forEach((b, i) => {
            if (b === ONE) acc[i].ones += 1;
            if (b === ZERO) acc[i].zeros += 1;
        });
        return acc;
    }, accumulator)
    .reduce(
        (acc, n) => {
            if (n.ones > n.zeros) {
                acc.gamma += ONE;
                acc.epsilon += ZERO;
            } else {
                acc.gamma += ZERO;
                acc.epsilon += ONE;
            }
            return acc;
        },
        { gamma: "", epsilon: "" }
    );

console.log(result);
console.log(parseInt(result.gamma, 2) * parseInt(result.epsilon, 2));
