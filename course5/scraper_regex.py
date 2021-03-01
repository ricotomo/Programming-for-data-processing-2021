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

# The number of article published.
#itemtype="http://schema.org/ScholarlyArticle"
#title="Journal Articles"
#class="nr"

#function which returns the number of article published.
def searchArticles(text):
    pattern = re.compile(r'title="Journal Articles"', re.IGNORECASE)
    result = len(re.findall(pattern, text))
    return result

print("The number of articles published is " + str(searchArticles(text)))

# The number of proceedings published.
#itemtype="http://schema.org/BookSeries"
#title="Parts in Books or Collections"
#Because this researcher doesnt have proceedings we used books
def searchBooks(text):
    pattern1 = re.compile(r'title="Parts in Books or Collections"', re.IGNORECASE)
    result = len(re.findall(pattern1, text))
    return result

print("The number of books published is " + str(searchBooks(text)))

# The list of ids of the articles.The list of ids of the proceedings.
# The name of the publications.IThe authors of each publications