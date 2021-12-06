import { readFileSync } from "fs";

const content = readFileSync("./src/6/input.txt", "utf-8")
    .split(",")
    .map((n) => +n);

let iteration = content;
for (let i = 0; i < 256; ++i) {
    const newIteration = [];
    for (let j = 0; j < iteration.length; ++j) {
        if (iteration[j] - 1 === -1) {
            newIteration.push(6);
            newIteration.push(8);
        } else {
            newIteration.push(iteration[j] - 1);
        }
    }
    iteration = newIteration;
}

console.log(iteration.length);
