import { readFileSync } from "fs";

const lines = readFileSync("./src/8/input.txt", "utf-8").split("\n");

/**
 *  AAAA
 * B    C
 * B    C
 * B    C
 * B    C
 *  DDDD
 * E    F
 * E    F
 * E    F
 * E    F
 *  GGGG
 */

const removeLetters = (a: string, b: string[]) => {
    return a
        .split("")
        .filter((l) => b.indexOf(l) === -1)
        .join("");
};

const buildFrequencies = (signals: string[]) => {
    const frequencies: { [k: string]: number } = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
    };
    for (let s = 0; s < signals.length; ++s) {
        for (let l = 0; l < signals[s].length; ++l) {
            frequencies[signals[s][l]] += 1;
        }
    }
    return frequencies;
};

const findByFrequency = (
    frequency: number,
    frequencies: { [k: string]: number }
) => {
    return Object.entries(frequencies).filter((f) => f[1] === frequency)[0][0];
};

let total = 0;

for (let i = 0; i < lines.length; ++i) {
    const signals = lines[i].split("|")[0].trim().split(" ");
    const digits = lines[i].split("|")[1].trim().split(" ");

    const frequencies = buildFrequencies(signals);

    const one = signals.filter((s) => s.length === 2)[0];
    const four = signals.filter((s) => s.length === 4)[0];
    const seven = signals.filter((s) => s.length === 3)[0];
    const eight = signals.filter((s) => s.length === 7)[0];

    const A = removeLetters(seven, [...one.split("")]);
    const B = findByFrequency(6, frequencies);
    const E = findByFrequency(4, frequencies);
    const F = findByFrequency(9, frequencies);
    const D = removeLetters(four, [B, ...one.split("")]);
    const G = removeLetters(eight, [A, E, ...four.split("")]);
    const C = removeLetters(one, [F]);

    const newZero = [A, B, C, E, F, G].sort().join("");
    const newOne = [C, F].sort().join("");
    const newTwo = [A, C, D, E, G].sort().join("");
    const newThree = [A, C, D, F, G].sort().join("");
    const newFour = [B, C, D, F].sort().join("");
    const newFive = [A, B, D, F, G].sort().join("");
    const newSix = [A, B, D, E, F, G].sort().join("");
    const newSeven = [A, C, F].sort().join("");
    const newEight = [A, B, C, D, E, F, G].sort().join("");
    const newNine = [A, B, C, D, F, G].sort().join("");

    let subTotal = "";
    for (let d = 0; d < digits.length; ++d) {
        const orderedDigits = digits[d].split("").sort().join("");
        if (orderedDigits === newZero) {
            subTotal += "0";
        } else if (orderedDigits === newOne) {
            subTotal += "1";
        } else if (orderedDigits === newTwo) {
            subTotal += "2";
        } else if (orderedDigits === newThree) {
            subTotal += "3";
        } else if (orderedDigits === newFour) {
            subTotal += "4";
        } else if (orderedDigits === newFive) {
            subTotal += "5";
        } else if (orderedDigits === newSix) {
            subTotal += "6";
        } else if (orderedDigits === newSeven) {
            subTotal += "7";
        } else if (orderedDigits === newEight) {
            subTotal += "8";
        } else if (orderedDigits === newNine) {
            subTotal += "9";
        }
    }

    total += +subTotal;
}

console.log(total);
