
class Film:

    def __init__(self, title: str, duration: int, min_age: int, director: str, price: float) -> None:
        self.title = title
        self.duration = duration
        self.min_age = min_age
        self.director = director
        self.price = price


class Spectator:

    def __init__(self, id: int, age: int, money: float) -> None:
        self.id = id
        self.age = age
        self.money = money


class Seat:
    # TODO

    def __init__(self, row:int, col:int, spec: Spectator=None) -> None:
        self.row = row
        self.col = col
        self.spec = spec
        self.occupied = False if spec is None else True

    def __repr__(self):
        return '[{}, {}]'.format(self.row, self.col)


class Cinema:

    def __init__(self, num_rows: int, num_cols: int, film: Film):
        self.num_rows = num_rows
        self.num_cols = num_cols
        self.film = film

        # #code not working yet. 
        # #My idea was to instantiate an empty multidemensional list and then fill it with seat objects
        # self.seats = [[None] * num_cols for i in range(num_rows)]

        # #initialize seats as empty and then update seats which are filled
        # for j in range(num_rows):
        #     for i in range(num_rows):
        #         print("row is " + str(j) + " col num is " +str(i))
        #         self.seats[j][i] = Seat(j,i)

    def allocateSpectators(self, spectatorList: [Spectator]):
        # TODO
        pass

    def getAllocatedSpectators(self):
        # TODO
        pass

    def showSeats(self):
        # TODO

        #prints the screen in terminal
        stars=""
        centered_text = self.num_cols*4//2-3
        centered_spaces = ""

        for x in range(self.num_cols):
            stars = stars + "****"
        for x in range(centered_text):
            centered_spaces = centered_spaces + " "

        print(stars)
        print(centered_spaces + "screen")
        print(stars)

        # for j in range(self.num_rows):
        #     print("\n")
        #     for i in range(self.num_cols):
        #         print (self.seats[j][i])

        pass

