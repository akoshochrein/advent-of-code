const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb
bvwbjplbgvbhsrlpgdmjqwftvncz
nppdvjthqldpwncqszvftbrmjlhg
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

type SignalSearchResult = {
    window: string[];
    found: boolean;
    startIndex: number;
};

const SIGNAL_WINDOW_SIZE = 14;

const countWindow = (window: string[]) =>
    window.reduce<Record<string, number>>((counter, character) => {
        if (counter[character] !== undefined) {
            counter[character] += 1;
        } else {
            counter[character] = 1;
        }
        return counter;
    }, {});

const checkWindow = (window: Record<string, number>) =>
    Object.keys(window).length === SIGNAL_WINDOW_SIZE &&
    Object.values(window).every((n) => n === 1);

const processSignal = (signal: string[]) =>
    signal.reduce<SignalSearchResult>(
        (signalResult, character) => {
            if (signalResult.found) return signalResult;

            const initialWindow =
                signalResult.window.length < SIGNAL_WINDOW_SIZE;

            const window = initialWindow
                ? [...signalResult.window, character]
                : [...signalResult.window.slice(1), character];
            const found = checkWindow(countWindow(window));
            const startIndex = signalResult.startIndex + 1;

            return {
                window,
                found,
                startIndex,
            };
        },
        { window: [], found: false, startIndex: 0 }
    );

const result = input
    .split("\n")
    .map((l) => l.split(""))
    .map(processSignal);

console.log(result);

export {};
