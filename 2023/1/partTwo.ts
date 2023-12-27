import {
    forFirstAndLast,
    forNumbers,
    padWithExisting,
    toDecimal,
    toNumber,
} from "./utils";

const input = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
];

function replaceTextNumbersWithNumbers(line: string) {
    const cleaned = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ].reduce((line, number, index) => {
        return line.replace(new RegExp(number, "g"), `${index}`);
    }, line);
    console.log(cleaned);
    return cleaned;
}

function solve(total: number, line: string) {
    const code = replaceTextNumbersWithNumbers(line)
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
