
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

    def __init__(self, row:int, col:int, spec: Spectator) -> None:
        self.row = row
        self.col = col
        self.spec = spec

    def __repr__(self):
        return '[{}, {}]'.format(self.row, self.col)


class Cinema:

    def __init__(self, num_rows: int, num_cols: int, film: Film):
        self.num_rows = num_rows
        self.num_cols = num_cols
        self.film = film

    def allocateSpectators(self, spectatorList: [Spectator]):
        # TODO
        pass

    def getAllocatedSpectators(self):
        # TODO
        pass

    def showSeats(self):
        # TODO
        pass

