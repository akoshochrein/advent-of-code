import { readFileSync } from "fs";
import {
    checkColumns,
    checkRows,
    loadBoards,
    mark,
    sumUnmarked,
} from "./boardUtils";

const input = readFileSync("./src/4/input.txt", "utf-8").split("\n");

const numbers = input[0].split(",");
const rawBoards = input.slice(2).filter((l) => l !== "");

const boards = loadBoards(rawBoards);

for (let i = 0; i < numbers.length; ++i) {
    boards.forEach((b) => mark(numbers[i], b));
    const winningBoardsByColumns = boards.filter(checkColumns);
    const winningBoardsByRows = boards.filter(checkRows);

    const winningBoards = [...winningBoardsByColumns, ...winningBoardsByRows];

    if (winningBoards.length > 0) {
        const sum = sumUnmarked(winningBoards[0]);
        console.log(sum, numbers[i], +numbers[i] * sum);
        break;
    }
}
