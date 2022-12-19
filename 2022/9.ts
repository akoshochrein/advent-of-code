const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const ROPE_LENGTH = 10;

type Coordinate = {
    x: number;
    y: number;
};

const toInstructions = (l: string) => ({
    direction: l.split(" ")[0],
    amount: parseInt(l.split(" ")[1]),
});

const hydrateRope = (
    _newRope: Coordinate[],
    _head: Coordinate,
    index: number,
    _rope: Coordinate[]
) => {
    if (index === 0) return [_head];

    const head = _rope[index - 1];
    const tail = _rope[index];

    const xDistance = head.x - tail.x;
    const yDistance = head.y - tail.y;

    const isDiagonal = Math.abs(xDistance) === 2 && Math.abs(yDistance) === 2;

    if (isDiagonal) {
        tail.x += Math.sign(xDistance);
        tail.y += Math.sign(yDistance);
    } else if (Math.abs(xDistance) === 2) {
        tail.x += Math.sign(xDistance);
        tail.y = yDistance === 0 ? tail.y : head.y;
    } else if (Math.abs(yDistance) === 2) {
        tail.x = xDistance === 0 ? tail.x : head.x;
        tail.y += Math.sign(yDistance);
    }

    return [..._newRope, tail];
};

const result = input
    .split("\n")
    .map(toInstructions)
    .reduce<{ rope: Coordinate[]; locations: Set<string> }>(
        (state, instruction) => {
            const { rope, locations } = state;
            const { amount, direction } = instruction;
            const [globalHead, ..._] = rope;
            let newRope: Coordinate[] = [];

            for (let i = 0; i < amount; ++i) {
                if (direction === "R") {
                    globalHead.x += 1;
                } else if (direction === "L") {
                    globalHead.x -= 1;
                } else if (direction === "U") {
                    globalHead.y += 1;
                } else {
                    globalHead.y -= 1;
                }

                newRope = rope.reduce<Coordinate[]>(hydrateRope, []);

                const tail = rope.at(-1);
                if (tail !== undefined) locations.add(`${tail.x},${tail.y}`);
            }
            return { rope: newRope, locations };
        },
        {
            rope: Array.from({ length: ROPE_LENGTH }, (_) => ({ x: 0, y: 0 })),
            locations: new Set<string>(),
        }
    );

console.log(result.locations.size);
