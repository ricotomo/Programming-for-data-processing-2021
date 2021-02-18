

def get_depth(tree):
    left = tree['left'] if 'left' in tree.keys() else None
    right = tree['right'] if 'right' in tree.keys() else None

    if left and right:
        left_depth = get_depth(left)
        right_depth = get_depth(right)
        return 1 + max(left_depth, right_depth)
    elif left:
        return 1 + get_depth(left)
    elif right:
        return 1 + get_depth(right)
    return 0


def get_left(tree):
    try:
        return '{0:02d}'.format(tree['left']['key'])
    except KeyError:
        return '[]'
    except TypeError:
        return '{0:02d}'.format(tree['left'])


def get_right(tree):
    try:
        return '{0:02d}'.format(tree['right']['key'])
    except KeyError:
        return '[]'
    except TypeError:
        return '{0:02d}'.format(tree['right'])


def print_arrows(width, depth):
    space = ' ' * ((width - 2) // (pow(2, depth) + 1))
    to_print = space + '/' + space + '\\'
    print(to_print * (pow(2, depth-1)))


def prettyPrint(tree):
    '''
    # _______03
    # _____/_____\
    # ___02_______05
    # __/__\_____/__\
    # 01____[]_04____06

    :param tree:
    :return:
    '''

    depth = get_depth(tree)

    width = 2 + (depth+1) * 4

    # printing the root node
    width - pow(2, depth+1)
    print('{0}{1:02d}'.format(' '*((width-2)//2), tree['key']))

    # depth 1
    print_arrows(width, 1)
    left = get_left(tree)
    right = get_right(tree)
    print('{}{}{}{}'.format(' '*((width-2*2)//5), left, ' '*((width-2*2)*3//5), right, ' '*((width-2*2)//5)))

    # # depth 2
    print_arrows(width, 2)
    left = get_left(tree['left'])
    right = get_right(tree['left'])
    to_print_left = '{}{}{}'.format(left, ' '*((width-2*2)//5), right)

    left = get_left(tree['right'])
    right = get_right(tree['right'])
    to_print_right = '{}{}{}'.format(left, ' '*((width-2*2)//5), right)

    print('{}{}{}'.format(to_print_left, ' '*((width-2*2)//5), to_print_right))


static_tree = {'key': 3, 'left': {'key': 2, 'left': {'key': 1}}, 'right': {'key': 5, 'left': {'key': 4}, 'right': {'key': 6}}}
prettyPrint(static_tree)


