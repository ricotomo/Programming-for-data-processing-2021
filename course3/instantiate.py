import cinema

nowShowing = cinema.Film("Star Wars: Revenge of the Sith", 2, 13, "George Lucas", 10.75)

Mo = cinema.Spectator(1, 23, 5)
Lena = cinema.Spectator(2, 24, 10)
Tim = cinema.Spectator(3, 23, 15)
Soo = cinema.Spectator(2, 23, 20)



spectators = [Mo, Lena, Tim, Soo]

Cine_Dore = cinema.Cinema(num_rows=4, num_cols=15, film=nowShowing)

Cine_Dore.allocateSpectators(spectators)

#Cine_Dore.getAllocatedSpectators()
Cine_Dore.showSeats()