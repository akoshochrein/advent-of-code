import md5


def get_secret_key(input, length):
    for i in xrange(10 ** length):
        s = str(i).zfill(length)
        if md5.new(input + s).hexdigest().startswith('0' * (length - 1)):
            return s


input = 'iwrupvqb'

# 1
print get_secret_key(input, 6)

# 2
print get_secret_key(input, 7)
