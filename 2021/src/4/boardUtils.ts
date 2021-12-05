export type Cell = { value: string; hit: boolean };
export type BoardRow = Cell[];
export type Board = {
    index: number;
    cells: BoardRow[];
};

// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
const _transposeBoard = (board: Board) => ({
    index: board.index,
    cells: board.cells[0].map((r, i) => board.cells.map((r) => r[i])),
});

export const printBoards = (boards: Board[]) => {
    console.log(
        boards.map((c) =>
            c.cells.map((r) =>
                r.map((cell) => `${cell.hit ? "+" : ""}${cell.value}`)
            )
        )
    );
};

export const loadBoards = (rawBoards: string[]): Board[] => {
    const boards: Board[] = [];
    let boardBuffer: Board["cells"] = [];
    for (let i = 0; i < rawBoards.length; ++i) {
        const content = rawBoards[i].match(/\d+/g) || [];
        boardBuffer.push(content.map((c) => ({ value: c, hit: false })));
        if (i % 5 === 4) {
            boards.push({
                index: i,
                cells: boardBuffer,
            });
            boardBuffer = [];
        }
    }
    return boards;
};

export const mark = (n: string, board: Board) => {
    for (let i = 0; i < board.cells.length; ++i) {
        for (let j = 0; j < board.cells[i].length; j++) {
            if (board.cells[i][j].value === n) {
                board.cells[i][j].hit = true;
            }
        }
    }
    return board;
};

export const sumUnmarked = (board: Board) => {
    return board.cells.reduce((acc, r) => {
        return (
            acc +
            r.reduce((cacc, c) => {
                return cacc + (c.hit ? 0 : +c.value);
            }, 0)
        );
    }, 0);
};

// Bit of an over achievement...
export const checkLeftDiagonal = (board: Board) => {
    for (let i = 0; i < board.cells.length; ++i) {
        if (!board.cells[i][i].hit) return false;
    }
    return true;
};

// Bit of an over achievement...
export const checkRightDiagonal = (board: Board) => {
    for (let i = 0; i < board.cells.length; ++i) {
        if (!board.cells[i][board.cells.length - i - 1].hit) return false;
    }
    return true;
};

export const checkRows = (board: Board) => {
    for (let i = 0; i < board.cells.length; ++i) {
        if (board.cells[i].filter((c) => c.hit).length === 5) {
            return true;
        }
    }
    return false;
};

export const checkColumns = (board: Board) => {
    const transposedBoard = _transposeBoard(board);
    return checkRows(transposedBoard);
};
