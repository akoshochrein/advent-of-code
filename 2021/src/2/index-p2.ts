import { readFileSync } from "fs";

enum Command {
    FORWARD = "forward",
    DOWN = "down",
    UP = "up",
}

type RowType = {
    command: Command;
    difference: number;
};

const content = readFileSync("./src/2/input.txt", "utf-8")
    .split("\n")
    .map((l): RowType => {
        const [command, difference] = l.split(" ");
        return {
            command: command as Command,
            difference: +difference,
        };
    });

const { horizontal, depth } = content.reduce(
    (acc, c) => {
        if (c.command === Command.DOWN) acc.aim += c.difference;
        if (c.command === Command.UP) acc.aim -= c.difference;
        if (c.command === Command.FORWARD) {
            acc.horizontal += c.difference;
            acc.depth += acc.aim * c.difference;
        }
        return acc;
    },
    { aim: 0, horizontal: 0, depth: 0 }
);

console.log(horizontal, depth, horizontal * depth);
