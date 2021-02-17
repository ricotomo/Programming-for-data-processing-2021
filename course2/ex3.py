bilingual = {
  "merry": "feliz",
  "christmas": "navidad",
  "and": "y",
  "happy" : "prospero",
  "new" : "nuevo",
  "year" : "ano"
}



def readSentence():
    engstr = input("Enter your English sentance: ")
    print(engstr)
    englist = str.split(engstr)
    print(englist)
    spanishstr = ""

    for x in englist:
        print(x)
        try: 
            spanishstr = spanishstr + bilingual[x] + " "
        except:
            "We're sorry a word you used isnt in our dictionary"
            break
    return spanishstr
def translate (ls : list):
    spanishwords = []
    for x in ls:
        spanishwords.append(bilingual[x])
    return spanishwords

print(readSentence())

print(translate(ls=["christmas", "new", "happy"]))