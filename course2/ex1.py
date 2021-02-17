
def under_eleven(nums):
    under = list(filter(lambda x: x < 11, nums))
    avg = sum(under) / len(under)
    return list(filter(lambda x: x < avg, under))


a = [12,67,1,89,3,0,100,23,65,34,64,98,12,27]

assert under_eleven(a) == [1, 3, 0], "Incorrect"