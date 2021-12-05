import { readFileSync } from "fs";
import {
    checkColumns,
    checkRows,
    loadBoards,
    mark,
    printBoards,
    sumUnmarked,
} from "./boardUtils";

const input = readFileSync("./src/4/input.txt", "utf-8").split("\n");

const numbers = input[0].split(",");
const rawBoards = input.slice(2).filter((l) => l !== "");

const boards = loadBoards(rawBoards);
let lastBoardIndex: number | null = null;

for (let i = 0; i < numbers.length; ++i) {
    boards.forEach((b) => mark(numbers[i], b));
    const winningBoardsByColumns = boards.filter(checkColumns);
    const winningBoardsByRows = boards.filter(checkRows);

    const winningBoards = [...winningBoardsByColumns, ...winningBoardsByRows];

    const losingBoards = boards.filter(
        (b) => winningBoards.map((b) => b.index).indexOf(b.index) === -1
    );

    if (
        lastBoardIndex !== null &&
        winningBoards.map((b) => b.index).indexOf(lastBoardIndex) > -1
    ) {
        const sum = sumUnmarked(
            winningBoards.filter((b) => b.index === lastBoardIndex)[0]
        );
        console.log(+numbers[i] * sum);
        break;
    }

    if (losingBoards.length === 1) {
        lastBoardIndex = losingBoards[0].index;
    }
}
