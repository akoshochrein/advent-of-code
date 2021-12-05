export type Cell = { value: string; hit: boolean };
export type BoardRow = Cell[];
export type Board = BoardRow[];

// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
const _transposeBoard = (board: Board) =>
    board[0].map((r, i) => board.map((r) => r[i]));

export const printBoards = (boards: Board[]) => {
    console.log(
        boards.map((c) =>
            c.map((r) => r.map((cell) => `${cell.hit ? "+" : ""}${cell.value}`))
        )
    );
};

export const loadBoards = (rawBoards: string[]): Board[] => {
    const boards: Board[] = [];
    let boardBuffer: Board = [];
    for (let i = 0; i < rawBoards.length; ++i) {
        const content = rawBoards[i].match(/\d+/g) || [];
        boardBuffer.push(content.map((c) => ({ value: c, hit: false })));
        if (i % 5 === 4) {
            boards.push(boardBuffer);
            boardBuffer = [];
        }
    }
    return boards;
};

export const mark = (n: string, board: Board) => {
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === n) {
                board[i][j].hit = true;
            }
        }
    }
    return board;
};

export const sumUnmarked = (board: Board) => {
    return board.reduce((acc, r) => {
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
    for (let i = 0; i < board.length; ++i) {
        if (!board[i][i].hit) return false;
    }
    return true;
};

// Bit of an over achievement...
export const checkRightDiagonal = (board: Board) => {
    for (let i = 0; i < board.length; ++i) {
        if (!board[i][board.length - i - 1].hit) return false;
    }
    return true;
};

export const checkRows = (board: Board) => {
    for (let i = 0; i < board.length; ++i) {
        if (board[i].filter((c) => c.hit).length === 5) {
            return true;
        }
    }
    return false;
};

export const checkColumns = (board: Board) => {
    const transposedBoard = _transposeBoard(board);
    return checkRows(transposedBoard);
};
