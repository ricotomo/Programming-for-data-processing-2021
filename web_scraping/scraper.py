from lxml import html
import time
import requests
from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
driver = webdriver.Firefox(executable_path=GeckoDriverManager().install())



#get webpage
driver.get("https://www.investing.com/etfs/ishares-global-corporate-bond-$")
#set timer to 3 seconds in case there is a  delay in loading
time.sleep (3)

try:
#click "Historical Data" 
#<ul id="pairSublinksLevel2" class="arial_12 newBigSubTabs "> followed by two <li>s the second <li> is the one we need with the <a> tag inside
#click claendar Icon
#set timeframe (can be changed using the input text fields Start Date and End Date).. Need to set 01/01/2020and12/31/2020, both inclusive.
#click button apply
#page is updated - set timer?
#extract info from HTML Table. Need only date and info in column price. All else can be discarded
#store info in csv format
#finish up by closing driver connection
driver.close()






# from selenium.webdriver.chrome.options import Options
# driver = webdriver.Chrome(executable_path='C:/Users/morit/downloads/chromedriver.exe')



# #static 
# headers = {
#     'User -Agent': "Chrome /87.0.4280.66" }
# #'User -Agent': "Mozilla /5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit /537.36 (KHTML , like  Gecko) Chrome /87.0.4280.66  Safari /537.36" 
# url = "https://www.google.com/"

# # Perform  the web  request  to  obtain  the  resource (i.e. HTML)
# page = requests.get(url , headers=headers)
# # Check  HTTP  return  code is OK
# if page.status_code  == 200:
#     # Returns a HTML  document (tree) from a string
#     tree = html.fromstring(page.content)
#     # Perform  the  XPath  query  for  extracting  the  single  web  title
#     result = tree.xpath("/html/head/title/text()")
#     # XPath  query  returns a list , but we know it  should  contain 1 elem
#     assert(len(result) == 1)
#     # Get the  first (and  only) element
#     data = result [0]
#     # Print  the  page  title
#     print(data)

# url2 = "https://fnd.io/#/de/iphone-app/1377689068-tomorrow-mobile-banking-by-tomorrow-gmbh"

# # Perform  the web  request  to  obtain  the  resource (i.e. HTML)
# page = requests.get(url2, headers=headers)
# # Check  HTTP  return  code is OK
# if page.status_code  == 200:
#     # Returns a HTML  document (tree) from a string
#     tree = html.fromstring(page.content)
#     print(page.content)
#     # Perform  the  XPath  query  for  extracting  the  single  web  title
#     result = tree.xpath("//div[contains(concat(' ', normalize-space(@class), ' '), 'ii-review-content')]")
#     # Get the  first 10 elements
#     data = result [:10]
#     # Print  the  page  title
#     print(data)


#dynamic
# webdriver.Chrome(executable_path=r'C:\Users\morit\Downloads\chromedriver.exe')
# driver = webdriver.Chrome(executable_path='C:/Users/morit/downloads/chromedriver.exe')
# webdriver_options = Options()
# webdriver_options.add_argument('--headless')
# webdriver_options.add_argument('--no-sandbox')
# webdriver_options.add_argument('--disable-dev-shm-usage')
# with driver (
#     options = webdriver_options) as driver :
#         driver.get ("http://pythonscraping.com/pages/javascript/ajaxDemo.html")
#         time.sleep(1)
#         print(driver.find_element_by_id("content").text)


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


