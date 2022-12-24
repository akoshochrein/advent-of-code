const input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const ADDX_RE = /addx (-?\d+)/;
const NOOP_RE = /noop/;

type Cycle = {
    operator: string;
    value: number;
};

type Registers = {
    x: number;
    px: number;
};

type CycleWithRegisters = {
    cycle: Cycle;
    registers: Registers;
};

const toCycle = (cycles: Cycle[], instruction: string) => {
    const addMatch = instruction.match(ADDX_RE);
    const noopMatch = instruction.match(NOOP_RE);
    return [
        ...cycles,
        ...(addMatch
            ? [{ operator: "ADD", value: parseInt(addMatch![1]) }]
            : []),
        ...(noopMatch ? [{ operator: "NOOP", value: 0 }] : []),
    ];
};

const addAddWaits = (cycles: Cycle[], cycle: Cycle, index: number) => {
    return [
        ...cycles,
        ...(cycle.operator === "ADD"
            ? [{ operator: "ADD_WAIT", value: 0 }]
            : []),
        cycle,
    ];
};

const reduceWithRegisters = (
    cyclesWithRegisters: CycleWithRegisters[],
    cycle: Cycle,
    index: number
) => {
    if (index === 0) return [{ cycle, registers: { x: 1, px: 1 } }];
    const px = cyclesWithRegisters[index - 1].registers.x;
    const x = cycle.operator === "ADD" ? px + cycle.value : px;
    return [
        ...cyclesWithRegisters,
        {
            cycle,
            registers: {
                x,
                px,
            },
        },
    ];
};

const raceTheBeam = (
    cathodeBuffer: string[],
    cycle: CycleWithRegisters,
    index: number
) => {
    const { px } = cycle.registers;
    const shiftedPx = px + Math.floor(index / 40) * 40;
    return [
        ...cathodeBuffer,
        ...(index % 40 === 0 ? ["\n"] : []),
        ...([shiftedPx - 1, shiftedPx, shiftedPx + 1].indexOf(index) > -1
            ? ["#"]
            : ["."]),
    ];
};

const result = input
    .split("\n")
    .reduce(toCycle, [])
    .reduce(addAddWaits, [])
    .reduce(reduceWithRegisters, [])
    .reduce(raceTheBeam, [])
    .join("");

console.log(result);

export {};
