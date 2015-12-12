from collections import defaultdict
from pprint import pprint


def calculate_houses_visited(houses_visited, path):
    current_location = [0, 0]
    houses_visited[','.join(map(str, current_location))] += 1
    for d in path:
        if d == '^':
            current_location[1] += 1
        if d == '>':
            current_location[0] += 1
        if d == 'v':
            current_location[1] -= 1
        if d == '<':
            current_location[0] -= 1
        houses_visited[','.join(map(str, current_location))] += 1
    return houses_visited

def calculate_houses_visited_with_robo_santa(houses_visited, path):
    current_location = {'robo': [0, 0], 'real': [0, 0]}
    houses_visited[','.join(map(str, current_location['real']))] += 1
    for i, d in enumerate(path):
        current_santa = 'robo' if i % 2 else 'real'
        if d == '^':
            current_location[current_santa][1] += 1
        if d == '>':
            current_location[current_santa][0] += 1
        if d == 'v':
            current_location[current_santa][1] -= 1
        if d == '<':
            current_location[current_santa][0] -= 1
        houses_visited[','.join(map(str, current_location[current_santa]))] += 1
    return houses_visited



directions = ''
with open('day-3.txt', 'r') as f:
    directions = f.read().strip()

# 1
coords_visited = defaultdict(int)
coords_visited = calculate_houses_visited(coords_visited, directions)
print len(coords_visited.keys())

# 2
coords_visited = defaultdict(int)
coords_visited = calculate_houses_visited_with_robo_santa(coords_visited, directions)
print len(coords_visited.keys())
