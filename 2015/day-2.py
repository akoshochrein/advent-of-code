
def pop_smallest(l):
    smallest = min(l)
    l.remove(min(l))
    return smallest


# 1
total_paper_needed = 0
with open('day-2.txt', 'r') as f:
    for line in f.readlines():
        w, l, h = map(int, line.split('x'))
        a, b, c = w * l, l * h, h * w
        total_paper_needed += (2*a + 2*b + 2*c + min(a, b, c))
print total_paper_needed

# 2
total_ribbon_needed = 0
with open('day-2.txt', 'r') as f:
    for line in f.readlines():
        filter_perims = map(int, line.split('x'))
        w, l, h = map(int, line.split('x'))

        shortest_side = pop_smallest(filter_perims)
        second_shortest_side = pop_smallest(filter_perims)

        total_ribbon_needed += (2*shortest_side + 2*second_shortest_side + w*l*h)
print total_ribbon_needed
