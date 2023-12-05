const input = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

function toNumber(char: string) {
    return parseInt(char);
}

function forNumbers(char: number) {
    return !isNaN(char);
}

function forFirstAndLast(_: number, index: number, array: Array<number>) {
    return index === 0 || index === array.length - 1;
}

function padWithExisting(
    _patchedArray: number[],
    _currentElement: number,
    _currentIndex: number,
    array: number[]
) {
    return array.length === 1 ? [array[0], array[0]] : array;
}

function toDecimal(
    total: number,
    current: number,
    index: number,
    array: number[]
) {
    return (array.length - index - 1) * 10 * current || current + total;
}

const sum = input.reduce((total, line) => {
    const code = line
        .split("")
        .map(toNumber)
        .filter(forNumbers)
        .filter(forFirstAndLast)
        .reduce(padWithExisting, [])
        .reduce(toDecimal, 0);

    return total + code;
}, 0);

console.log(sum);
