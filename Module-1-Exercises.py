import math


# Write a program which will raise any number x to a positive power n using a “for loop“
number = int(input("what number would you like to use? "))
power = int(input("what power do you want to raise this number to? "))
output = number

for x in range(int(power)-1):
    output = output * number

print(output)

# Create a program for printing
# *
# ***
# *****
# *******
stars = ["*", "***", "*****", "*******" ]

for x in stars:
    print(x)

#Write a program that calculates the area of a circle fromthe radius. The radius will be an integer read in from thekeyboard. 
#You will need to use the constantmath.pi(import math)

rad = int(input("what is the radius of your circle?"))

area = rad**2*math.pi

print("the area is: " + str(area))

#Write an algorithm that asks the users how many numbershe/she wants to type. Then read these numbers and printout the smallest number, the sum, 
# the average and thelargest number (watch for possible errors).

numofvals = int(input("How many numbers do you want to enter? "))
vals = []

for x in range(numofvals):
    vals.append(int(input("Enter your number ")))


sum = sum(vals)
avg = sum/len(vals)
vals.sort()

print("sum is: " + str(sum) + " average is: " + str(avg) + " lowest number is: " + str(vals[0]) + " highest number is: " + str(vals[len(vals)-1]) )

#Write a program that asks the user to enter two words. Theprogram then prints out both words on one line, the lengthof both words and number of 
# points added. The words will be separated by enought dots so that the total line length is 30:F  i  r  s  t   w  o  r  d   :    t  u  r  t  l  eS  e  c  o  n  d                    w  o  r  d   :                   1  5  3t  u  r  t  l  e     .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   1   5   3L  e  n  g  t  h                     f  i  r  s  t                    w  o  r  d   :                   6L  e  n  g  t  h                     f  i  r  s  t                    w  o  r  d   :                   3N  u  m  b  e  r                    o  f                    p  o  i  n  t  s    :                                   2  1


#You are given the following DNA sequence:
# A   A   A   C   G   C   T   G   T   C   A   A   T   A   C   A   A   T   C   T   T   Y   C   T   A   G   A   T   A   T   T   C   G   G   A   T   T   T   G   A   AT   T   T   T   G   C   A   A   A   A   A   G   T   C   C   G   A   A   G   C   T   G   C   C   C   A   C   C   T   C   A   A   G   T   C   A   T   T   G   T   TT   C   A   A   C   T   C   G   C   T   T   A   C   G   G   T   A   T   A   T   A   T   A   T   C   T   A   C   T   T   T   C   A   T   T   G   A   G   A   T   AT   A   A   A   C   A   G   C   G   C   T   G   A   T   A   C   A   A   T   C   T   T   T   T   T   A   T   A   T   A   A   G   T   C   T   T   T   T   G   T   AC   A   A   A   T   A   A   A   G   C   T   A   G   G   A   A   A   A   G   C   C   C   G   A   C   G   T   C   A   T   T   A   T   A   G   C   T   A   TAn imaginary restriction enzyme cuts in "AAGTCA" findwhere in the previous sequence this enzyme will cut

#You are given the following DNA sequence:
# A   A   A   C   G   C   T   G   T   C   A   A   T   A   C   A   A   T   C   T   T   Y   C   T   A   G   A   T   A   T   T   C   G   G   A   T   T   T   G   A   A   TT  T  T  G  C  A  A  A  Awrite a loop that will split the above sequence in tripletsand print them?

#Create a program for printing
#see slide 8