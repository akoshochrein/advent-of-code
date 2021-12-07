import { readFileSync } from "fs";

const locations = readFileSync("./src/7/input.txt", "utf-8")
    .split(",")
    .map((l) => +l);

let minDistance = 99999999999;
for (let i = 0; i < locations.length; ++i) {
    const distance = locations.reduce((d, l) => {
        return d + Math.abs(l - i);
    }, 0);
    if (distance < minDistance) minDistance = distance;
}

console.log(minDistance);
