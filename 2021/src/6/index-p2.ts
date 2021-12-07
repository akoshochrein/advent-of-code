import { readFileSync } from "fs";

const content = readFileSync("./src/6/input.txt", "utf-8")
    .split(",")
    .map((n) => +n);

const ITERATIONS = 256;
const GENERATIONS: {
    [k: number]: { firstBreeders: number; subsequentBreeders: number };
} = {
    0: { firstBreeders: 0, subsequentBreeders: 0 },
    1: { firstBreeders: 0, subsequentBreeders: 0 },
    2: { firstBreeders: 0, subsequentBreeders: 0 },
    3: { firstBreeders: 0, subsequentBreeders: 0 },
    4: { firstBreeders: 0, subsequentBreeders: 0 },
    5: { firstBreeders: 0, subsequentBreeders: 0 },
    6: { firstBreeders: 0, subsequentBreeders: 0 },
    7: { firstBreeders: 0, subsequentBreeders: 0 },
    8: { firstBreeders: 0, subsequentBreeders: 0 },
};

for (let i = 0; i < content.length; ++i) {
    GENERATIONS[content[i]].firstBreeders += 1;
}

for (let i = 0; i < ITERATIONS; ++i) {
    // We shift everything
    const temp = GENERATIONS[0];
    for (let j = 0; j < 8; ++j) {
        GENERATIONS[j] = {
            firstBreeders: GENERATIONS[j + 1].firstBreeders,
            subsequentBreeders: GENERATIONS[j + 1].subsequentBreeders,
        };
    }
    // Before the last generation shift we correct
    GENERATIONS[6].subsequentBreeders =
        temp.firstBreeders + temp.subsequentBreeders;
    GENERATIONS[8].firstBreeders = temp.subsequentBreeders + temp.firstBreeders;
}

console.log(
    Object.values(GENERATIONS).reduce(
        (acc, g) => acc + g.firstBreeders + g.subsequentBreeders,
        0
    )
);
