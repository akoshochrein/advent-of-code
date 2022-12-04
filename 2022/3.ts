const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const PRIORITIES: { [key: string]: number } = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
};

const groups = new Array(input.split("\n").length / 3).fill(new Array());

const groupRucksacks = (
    groups: string[][][],
    rucksack: string[],
    _index: number
): string[][][] => {
    const index = Math.floor(_index / 3);
    groups[index] = [rucksack, ...groups[index]];
    return groups;
};

const findCommons = (group: string[][]) => {
    return group.reduce((commons, rucksack, index) => {
        if (index === 0) {
            return [...rucksack];
        } else {
            return commons.filter((item) => rucksack.indexOf(item) > -1);
        }
    }, []);
};

const result = input
    .split("\n")
    .map((line) => line.split(""))
    .reduce(groupRucksacks, groups)
    .map(findCommons)
    .map((group) => group[0])
    .map((common) => PRIORITIES[common])
    .reduce((score, current) => score + current, 0);

console.log(result);

export {};
