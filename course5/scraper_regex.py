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
#class="entry article toc"
#itemtype="http://schema.org/ScholarlyArticle"
#  len(re. findall(pattern, string))

#function which returns the number of article published.
def searchArticles(text):
    pattern = re.compile(r'itemtype="http://schema.org/ScholarlyArticle"', re.IGNORECASE)
    result = len(re.findall(pattern, text))
    return result

print("The number of articles published is " + str(searchArticles(text)))
# The number of proceedings published.
# The list of ids of the articles.The list of ids of the proceedings.
# The name of the publications.IThe authors of each publications