import { readFileSync } from "fs";

const content = readFileSync("./src/3/input.txt", "utf-8").split("\n");

const ONE = "1";
const ZERO = "0";

type Accumulator = {
    ones: number;
    zeros: number;
};

const countBitsByIndex =
    (currentIndex: number) => (acc: Accumulator, l: string) => {
        const bit = l.split("")[currentIndex];
        return {
            ones: bit === ONE ? acc.ones + 1 : acc.ones,
            zeros: bit === ZERO ? acc.zeros + 1 : acc.zeros,
        };
    };

const filterLogsForOxygen = (
    logs: string[],
    currentIndex: number
): string[] => {
    if (logs.length === 1) return logs;
    const acc = logs.reduce(countBitsByIndex(currentIndex), {
        ones: 0,
        zeros: 0,
    });
    return filterLogsForOxygen(
        acc.ones >= acc.zeros
            ? logs.filter((l) => l[currentIndex] === ONE)
            : logs.filter((l) => l[currentIndex] === ZERO),
        currentIndex + 1
    );
};

const filterLogsForCO2 = (logs: string[], currentIndex: number): string[] => {
    if (logs.length === 1) return logs;
    const acc = logs.reduce(countBitsByIndex(currentIndex), {
        ones: 0,
        zeros: 0,
    });
    return filterLogsForCO2(
        acc.ones >= acc.zeros
            ? logs.filter((l) => l[currentIndex] === ZERO)
            : logs.filter((l) => l[currentIndex] === ONE),
        currentIndex + 1
    );
};

const oxigen = parseInt(filterLogsForOxygen(content, 0)[0], 2);
const co2 = parseInt(filterLogsForCO2(content, 0)[0], 2);

console.log(oxigen * co2);
