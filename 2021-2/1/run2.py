
depths = []

# Load input
with open('input.txt', 'r') as f:
    for line in f.readlines():
        depths.append(int(line.strip()))

# Execute
count = 0
for i in range(4, len(depths)):
    first_window = depths[i - 1] + depths[i - 2] + depths[i - 3]
    second_window = depths[i] + depths[i - 1] + depths[i - 2]
    if second_window > first_window:
        count += 1

print(count)

