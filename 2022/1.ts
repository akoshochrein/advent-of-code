const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const caloriesPerElf = [0];
input.split("\n").forEach((l) => {
    if (l.length === 0) {
        caloriesPerElf.push(0);
    } else {
        caloriesPerElf[caloriesPerElf.length - 1] += parseInt(l);
    }
});

caloriesPerElf.sort((a, b) => b - a);

console.log(caloriesPerElf.slice(0, 3).reduce((acc, curr) => acc + curr, 0));

export {};
