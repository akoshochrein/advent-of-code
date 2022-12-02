const input = `A Y
B X
C Z`;

const WIN_SCORE = 6;
const DRAW_SCORE = 3;
const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;

const LOSE = "X";
const DRAW = "Y";
const WIN = "Z";

const ROCK = "A";
const PAPER = "B";
const SCISSORS = "C";

const score = input
    .split("\n")
    .map((l) => l.split(" "))
    .reduce((score, game) => {
        const [opponent, result] = game;
        if (result === LOSE) {
            if (opponent === ROCK) {
                score += SCISSORS_SCORE;
            } else if (opponent === PAPER) {
                score += ROCK_SCORE;
            } else {
                score += PAPER_SCORE;
            }
        } else if (result === DRAW) {
            score += DRAW_SCORE;
            if (opponent === ROCK) {
                score += ROCK_SCORE;
            } else if (opponent === PAPER) {
                score += PAPER_SCORE;
            } else {
                score += SCISSORS_SCORE;
            }
        } else if (result === WIN) {
            score += WIN_SCORE;
            if (opponent === ROCK) {
                score += PAPER_SCORE;
            } else if (opponent === PAPER) {
                score += SCISSORS_SCORE;
            } else {
                score += ROCK_SCORE;
            }
        }
        return score;
    }, 0);

console.log(score);
