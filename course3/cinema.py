import random

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
        self.seats = [[0]*num_cols for _ in [0]*num_rows]
        for j in range(num_cols):
            for i in range(num_rows):
                self.seats[i][j] = Seat(i, j, None)

    def allocateSpectators(self, spectatorList: [Spectator]):
        
        numberOfAvailableSeats = 0
        for j in range(self.num_cols):
            for i in range(self.num_rows):
                numberOfAvailableSeats += self.seats[i][j].occupied == False
        if (numberOfAvailableSeats < len(spectatorList)):
            return
        filterAge = list(filter(lambda x : x.age > self.film.min_age, spectatorList))
        filterMoney = list(filter(lambda x : x.money > self.film.price, spectatorList))
        numberOfSeatedSpeactors = 0
        while numberOfSeatedSpeactors <= len(filterMoney):
            randomCol = random.randint(0, self.num_cols - 1)
            randomRow = random.randint(0, self.num_rows -1)
            if (self.seats[randomRow][randomCol].occupied == False): 
                self.seats[randomRow][randomCol].occupied = True
                self.seats[randomRow][randomCol].spec = filterMoney[len(filterMoney)-1]
                filterMoney.pop()
                numberOfSeatedSpeactors += 1
        pass

    def getAllocatedSpectators(self):
        spectators = []
        for j in range(self.num_cols):
            for i in range(self.num_rows):
                if self.seats[i][j].occupied == True:
                    spectators.append(self.seats[i][j].spec.id)
        return spectators

    def showSeats(self):
        # TODO

        # for j in range(self.num_cols):
        #     for i in range(self.num_rows):
        #         print(self.seats[i][j].occupied, i, j)
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

