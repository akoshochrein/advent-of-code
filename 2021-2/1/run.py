
depths = []

# Load input
with open('input.txt', 'r') as f:
    for line in f.readlines():
        depths.append(int(line.strip()))

# Execute
count = 0
for i in range(1, len(depths)):
    if depths[i] > depths[i - 1]:
        count += 1

print(count)

