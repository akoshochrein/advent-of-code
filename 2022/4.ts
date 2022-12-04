const input = `2-4,6-8
2-3,4-5
7-9,5-7
2-8,3-7
6-6,4-6
2-6,4-8`;

type Range = { start: Number; end: Number };

type Schedule = {
    first: Range;
    second: Range;
};

const toSchedule = (l: string): Schedule => {
    const [first, second] = l.split(",").map(toRange);
    return {
        first,
        second,
    };
};

const toRange = (schedule: string): Range => {
    const [start, end] = schedule.split("-");
    return {
        start: parseInt(start),
        end: parseInt(end),
    };
};

const countOverlaps = (counter: number, schedule: Schedule) => {
    const { first, second } = schedule;
    const [lowerIdSchedule, higherIdSchedule] =
        first.start < second.start ? [first, second] : [second, first];
    return lowerIdSchedule.end >= higherIdSchedule.start
        ? counter + 1
        : counter;
};

const result = input.split("\n").map(toSchedule).reduce(countOverlaps, 0);

console.log(result);

export {};
