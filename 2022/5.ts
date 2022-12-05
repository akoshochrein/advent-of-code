const rawStacks = ["ZN", "MCD", "P"];
const input = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const INSTRUCTION_RE = /move (\d+) from (\d+) to (\d+)/;

type Instruction = {
    amount: number;
    from: number;
    to: number;
};

const toInstruction = (l: string): Instruction => {
    const match = l.match(INSTRUCTION_RE);
    return {
        amount: match ? parseInt(match[1]) : 0,
        from: match ? parseInt(match[2]) - 1 : 0,
        to: match ? parseInt(match[3]) - 1 : 0,
    };
};

const restack = (stacks: string[][], instruction: Instruction): string[][] => {
    const sliceIndex = stacks[instruction.from].length - instruction.amount;
    const toMove = stacks[instruction.from].slice(sliceIndex);
    stacks[instruction.from] = stacks[instruction.from].slice(0, sliceIndex);
    stacks[instruction.to] = [...stacks[instruction.to], ...toMove];
    return [...stacks];
};

const concatenateTopCrates = (topCrates: string[], stack: string[]) => [
    ...topCrates,
    stack.length > 0 ? stack[stack.length - 1] : "",
];

const stacks = rawStacks.map((rs) => rs.split(""));
const result = input
    .split("\n")
    .map(toInstruction)
    .reduce(restack, [...stacks])
    .reduce(concatenateTopCrates, [])
    .join("");

console.log(result);
