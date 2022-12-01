
commands = []
with open('input.txt', 'r') as f:
    for line in f.readlines():
        command, value_raw = line.split(" ")
        commands.append([command, int(value_raw)])

horizontal, vertical = 0, 0
for command in commands:
    if command[0] == "forward":
        horizontal += command[1]
    elif command[0] == "down":
        vertical += command[1]
    elif command[0] == "up":
        vertical -= command[1]

print(horizontal * vertical)

