import {
    forFirstAndLast,
    forNumbers,
    padWithExisting,
    toDecimal,
    toNumber,
} from "./utils";

const input = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

function solve(total: number, line: string) {
    const code = line
        .split("")
        .map(toNumber)
        .filter(forNumbers)
        .filter(forFirstAndLast)
        .reduce(padWithExisting, [])
        .reduce(toDecimal, 0);

    return total + code;
}

const sum = input.reduce(solve, 0);

console.log(sum);
