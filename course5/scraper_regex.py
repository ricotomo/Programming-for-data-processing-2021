import re
import os
from operator import itemgetter
from collections import Counter
import codecs

#imported text line by line as list
text = []

#set system path
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

#open text file and save as string obj4e
file = codecs.open((os.path.join(__location__, './Solomon_Kullback.html')), "r", "utf-8")
text = file.read()

print(text[:10])