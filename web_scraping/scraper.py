from lxml import html
import requests
from google_play_scraper import app, Sort, reviews

#static 
headers = {
    'User -Agent': "Chrome /87.0.4280.66" }
#'User -Agent': "Mozilla /5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit /537.36 (KHTML , like  Gecko) Chrome /87.0.4280.66  Safari /537.36" 
url = "https://www.google.com/"

# Perform  the web  request  to  obtain  the  resource (i.e. HTML)
page = requests.get(url , headers=headers)
# Check  HTTP  return  code is OK
if page.status_code  == 200:
    # Returns a HTML  document (tree) from a string
    tree = html.fromstring(page.content)
    # Perform  the  XPath  query  for  extracting  the  single  web  title
    result = tree.xpath("/html/head/title/text()")
    # XPath  query  returns a list , but we know it  should  contain 1 elem
    assert(len(result) == 1)
    # Get the  first (and  only) element
    data = result [0]
    # Print  the  page  title
    print(data)

url2 = "https://fnd.io/#/de/iphone-app/1377689068-tomorrow-mobile-banking-by-tomorrow-gmbh"

# Perform  the web  request  to  obtain  the  resource (i.e. HTML)
page = requests.get(url2, headers=headers)
# Check  HTTP  return  code is OK
if page.status_code  == 200:
    # Returns a HTML  document (tree) from a string
    tree = html.fromstring(page.content)
    print(page.content)
    # Perform  the  XPath  query  for  extracting  the  single  web  title
    result = tree.xpath("//div[contains(concat(' ', normalize-space(@class), ' '), 'ii-review-content')]")
    # Get the  first 10 elements
    data = result [:10]
    # Print  the  page  title
    print(data)


#Google play scraping

# result, continuation_token = reviews(
#     'one.tomorrow.app',
#     lang='de', # defaults to 'en'
#     country='de', # defaults to 'us'
#     sort=Sort.MOST_RELEVANT, # defaults to Sort.MOST_RELEVANT
#     count=3, # defaults to 100
#     filter_score_with=2 # defaults to None(means all score)
# )

# # If you pass `continuation_token` as an argument to the reviews function at this point,
# # it will crawl the items after 3 review items.

# result, _ = reviews(
#     'one.tomorrow.app',
#     continuation_token=continuation_token # defaults to None(load from the beginning)
# )

# print(result)

#https://fnd.io/#/de/iphone-app/1377689068-tomorrow-mobile-banking-by-tomorrow-gmbh
#https://play.google.com/store/apps/details?id=one.tomorrow.app&showAllReviews=true


#dynamic