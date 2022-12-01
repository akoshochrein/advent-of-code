
commands = []
with open('input.txt', 'r') as f:
    for line in f.readlines():
        command, value_raw = line.split(" ")
        commands.append([command, int(value_raw)])

horizontal, depth, aim = 0, 0, 0
for command in commands:
    name, value = command
    if name == "forward":
        horizontal += value
        depth += aim * value
    elif name == "down":
        aim += value
    elif name == "up":
        aim -= value


print(horizontal * depth)

