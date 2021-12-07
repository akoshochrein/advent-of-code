import { readFileSync } from "fs";

const locations = readFileSync("./src/7/input.txt", "utf-8")
    .split(",")
    .map((l) => +l);

const distanceCost: { [k: number]: number } = {};
const getDistanceCost = (n: number) => {
    if (distanceCost[n]) return distanceCost[n];
    else {
        distanceCost[n] = Array.from({ length: n }, (x, i) => i + 1).reduce(
            (acc, n) => acc + n,
            0
        );
        return distanceCost[n];
    }
};

let minDistance = 99999999999;
for (let i = 0; i < locations.length; ++i) {
    const distance = locations.reduce((d, l) => {
        return d + getDistanceCost(Math.abs(l - i));
    }, 0);
    if (distance < minDistance) minDistance = distance;
}

console.log(minDistance);
