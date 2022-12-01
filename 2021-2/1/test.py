# Load input
with open('test.txt', 'r') as f:
    first = int(f.readline())
    second = int(f.readline())
    third = int(f.readline())
    for l in f:
        print(first, second, third)
        third = int(l)
        first = second
        second = third
        
