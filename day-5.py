import string
from collections import defaultdict


DOUBLES = [c * 2 for c in string.ascii_lowercase]
BAD_WORDS = ['ab', 'cd', 'pq', 'xy']

strings = []
with open('day-5.txt', 'r') as f:
    strings = map(lambda x: x.strip(), f.readlines())


def has_pair_of_two(s):
    dict_of_doubles = defaultdict(list)
    for i in range(len(s)-1):
        current_double = s[i] + s[i+1]
        if current_double in dict_of_doubles.keys():
            if i - 1 not in dict_of_doubles[current_double]:
                dict_of_doubles[current_double].append(i)
        else:
            dict_of_doubles[current_double].append(i)
        if 2 in map(len, dict_of_doubles.values()):
            return True
    return False


def has_hugging_chars(s):
    for i in range(len(s)-2):
        if s[i] == s[i+2]:
            return True
    return False


# 1
good_strings = []
for s in strings:
    has_three_vowels = (s.count('a') + s.count('e') + s.count('i') + s.count('o') + s.count('u')) > 2
    has_doubles = True in [double in s for double in DOUBLES]
    has_bad_words = True in [bad_word in s for bad_word in BAD_WORDS]

    if has_three_vowels and has_doubles and not has_bad_words:
        good_strings.append(good_strings)
print len(good_strings)


#2
good_strings = []
for s in strings:
    if has_pair_of_two(s) and has_hugging_chars(s):
        good_strings.append(s)
print len(good_strings)
