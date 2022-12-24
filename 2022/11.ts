type Monkey = {
    id: number;
    items: number[];
    inspect: (oldWorryLevel: number) => number;
    test: number;
    targetIfTrue: number;
    targetIfFalse: number;
    totalInspects: number;
};

const _monkeys: Monkey[] = [
    {
        id: 0,
        items: [79, 98],
        inspect: (oldWorryLevel: number) => oldWorryLevel * 19,
        test: 23,
        targetIfTrue: 2,
        targetIfFalse: 3,
        totalInspects: 0,
    },
    {
        id: 1,
        items: [54, 65, 75, 74],
        inspect: (oldWorryLevel: number) => oldWorryLevel + 6,
        test: 19,
        targetIfTrue: 2,
        targetIfFalse: 0,
        totalInspects: 0,
    },
    {
        id: 2,
        items: [79, 60, 97],
        inspect: (oldWorryLevel: number) => oldWorryLevel,
        test: 13,
        targetIfTrue: 1,
        targetIfFalse: 3,
        totalInspects: 0,
    },
    {
        id: 3,
        items: [74],
        inspect: (oldWorryLevel: number) => oldWorryLevel + 3,
        test: 17,
        targetIfTrue: 0,
        targetIfFalse: 1,
        totalInspects: 0,
    },
];

const monkeys: Monkey[] = [
    {
        id: 0,
        items: [54, 53],
        inspect: (oldWorryLevel: number) => oldWorryLevel * 3,
        test: 2,
        targetIfTrue: 2,
        targetIfFalse: 6,
        totalInspects: 0,
    },
    {
        id: 1,
        items: [95, 88, 75, 81, 91, 67, 65, 84],
        inspect: (oldWorryLevel: number) => oldWorryLevel * 11,
        test: 7,
        targetIfTrue: 3,
        targetIfFalse: 4,
        totalInspects: 0,
    },
    {
        id: 2,
        items: [76, 81, 50, 93, 96, 81, 83],
        inspect: (oldWorryLevel: number) => oldWorryLevel + 6,
        test: 3,
        targetIfTrue: 5,
        targetIfFalse: 1,
        totalInspects: 0,
    },
    {
        id: 3,
        items: [83, 85, 85, 63],
        inspect: (oldWorryLevel: number) => oldWorryLevel + 4,
        test: 11,
        targetIfTrue: 7,
        targetIfFalse: 4,
        totalInspects: 0,
    },
    {
        id: 4,
        items: [85, 52, 64],
        inspect: (oldWorryLevel: number) => oldWorryLevel + 8,
        test: 17,
        targetIfTrue: 0,
        targetIfFalse: 7,
        totalInspects: 0,
    },
    {
        id: 5,
        items: [57],
        inspect: (oldWorryLevel: number) => oldWorryLevel + 2,
        test: 5,
        targetIfTrue: 1,
        targetIfFalse: 3,
        totalInspects: 0,
    },
    {
        id: 6,
        items: [60, 95, 76, 66, 91],
        inspect: (oldWorryLevel: number) => oldWorryLevel * oldWorryLevel,
        test: 13,
        targetIfTrue: 2,
        targetIfFalse: 5,
        totalInspects: 0,
    },
    {
        id: 7,
        items: [65, 84, 76, 72, 79, 65],
        inspect: (oldWorryLevel: number) => oldWorryLevel + 5,
        test: 19,
        targetIfTrue: 6,
        targetIfFalse: 0,
        totalInspects: 0,
    },
];

const inpsectItems = (monkey: Monkey) => {
    const totalInspects = monkey.totalInspects + monkey.items.length;
    return {
        ...monkey,
        totalInspects,
        items: monkey.items.map(monkey.inspect),
    };
};

const reduceStress = (monkey: Monkey, divisor: number) => ({
    ...monkey,
    items: monkey.items.map((item) => item % divisor),
});

const divisor = monkeys.reduce((t, m) => t * m.test, 1);
for (let c = 0; c < 10000; c++) {
    for (let i = 0; i < monkeys.length; ++i) {
        const monkey = monkeys[i];

        const afterInspection = inpsectItems(monkey);
        const afterRelief = reduceStress(afterInspection, divisor);

        monkeys[i] = {
            ...afterRelief,
            items: [],
        };

        monkeys[monkey.targetIfTrue] = {
            ...monkeys[afterRelief.targetIfTrue],
            items: [
                ...monkeys[afterRelief.targetIfTrue].items,
                ...afterRelief.items.filter((i) => i % afterRelief.test === 0),
            ],
        };

        monkeys[monkey.targetIfFalse] = {
            ...monkeys[afterRelief.targetIfFalse],
            items: [
                ...monkeys[afterRelief.targetIfFalse].items,
                ...afterRelief.items.filter((i) => i % afterRelief.test !== 0),
            ],
        };
    }
}

const monkeyBusiness = monkeys
    .sort((a, b) => b.totalInspects - a.totalInspects)
    .slice(0, 2)
    .reduce((total, current) => total * current.totalInspects, 1);

console.log(monkeyBusiness);

export {};
