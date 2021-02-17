
def under_eleven(nums):
    '''
    Write an algorithm that given the following list of integers a = [12,67,1,89,3,0,100,23,65,34,64,98,12,27]
    counts the number of integers below ’11’ and returns a sublist of those elements that are less than half of the average
    of the elements in the list.
    :param nums: list of numbers
    :return: average of elements under eleven of nums
    '''
    under = list(filter(lambda x: x < 11, nums))
    avg = sum(under) / len(under)
    return list(filter(lambda x: x < avg, under))


a = [12, 67, 1, 89, 3, 0, 100, 23, 65, 34, 64, 98, 12, 27]

assert under_eleven(a) == [1, 0], "Incorrect"
