import { readFileSync } from "fs";

const digits = readFileSync("./src/8/input.txt", "utf-8")
    .split("\n")
    .map((l) => l.split("|")[1].trim().split(" "))
    .reduce((acc, digits) => {
        return [...acc, ...digits];
    }, []);

console.log(digits.filter((d) => [2, 4, 3, 7].indexOf(d.length) > -1).length);
