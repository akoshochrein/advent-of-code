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

const horizontal = content
    .filter((c) => c.command === Command.FORWARD)
    .reduce((acc, c) => c.difference + acc, 0);

const vertical = content
    .filter((c) => c.command === Command.DOWN || c.command === Command.UP)
    .reduce((acc, c) => {
        if (c.command === Command.UP) acc -= c.difference;
        if (c.command === Command.DOWN) acc += c.difference;
        return acc;
    }, 0);

console.log(horizontal, vertical, horizontal * vertical);
