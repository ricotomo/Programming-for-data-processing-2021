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
#title="Journal Articles"
#class="nr"

#function which returns the number of article published.
def searchArticles(text):
    pattern = re.compile(r'title="Journal Articles"', re.IGNORECASE)
    result = len(re.findall(pattern, text))
    return result

print("The number of articles published is " + str(searchArticles(text)))

# The number of proceedings published.
#title="Parts in Books or Collections"
#Because this researcher doesnt have proceedings we used books
def searchBooks(text):
    pattern1 = re.compile(r'title="Parts in Books or Collections"', re.IGNORECASE)
    result = len(re.findall(pattern1, text))
    return result

print("The number of books published is " + str(searchBooks(text)))

# The list of ids of the articles.The list of ids of the proceedings.
# The name of the publications.
#<span itemprop="name"> IEEE Trans. Ind. Theory</span>
#rft.jtitle=Cryptologia&amp;
#<span class="title" itemprop="name">Looking Back.</span> 
#"<span(.*?)</span>"



# # The authors of each publications
# #"<span itemprop="author" itemscope="" itemtype="http://schema.org/Person"><span class="this-person" itemprop="name">Solomon Kullback</span></span
# # for (String s: data.split("(?<=[0-9])(?=[a-zA-Z])"))
# #     System.out.println(s);

# #regexr.com/5nijj

# def authorsOfPubs(text):
#     patternArticles = re.compile(r'title="Journal Articles"', re.IGNORECASE)
#     # patternAuthor = re.compile(r'itemprop="author">', re.IGNORECASE)
#     patternAuthor = re.compile(r'(?<=itemprop="author">)(.*)(?=\</span>)', re.IGNORECASE)
#     result = []
#     #when splitting the regex token is not saved in either string
#     journalTokens = re.split(patternArticles, text)
#     for x in journalTokens:
#         # numofAuthors = len(re.findall(patternAuthor, text))
#         # journalTokens = re.split(patternAuthor, text)
#         authors = re.findall(patternAuthor, x)
#         result.append(authors)
#     return result

# listOfTokens = authorsOfPubs(text)

# for x in listOfTokens:
#     print("\n here is the next token \n" +str(x))
