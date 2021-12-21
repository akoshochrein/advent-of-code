import { readFileSync } from "fs";

const content = readFileSync("./src/1_1/input.txt", "utf-8");

const lines = content.split("\n").map((l) => +l);

// const numbers = [];
// for (let i = 0; i < lines.length; ++i) {
//     numbers.push(+lines[i]);
// }

console.log(numbers);
