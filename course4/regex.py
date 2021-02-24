import re
import os
from operator import itemgetter

#imported text line by line as list
text = []

#set system path
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

#open text file and save as string obj
with open(os.path.join(__location__, './messages_syslog_class.txt')) as f:
    for x in f:
        text.append(f.readline())
    f.close()



#Exercise 1
results_list = []
name_token = ""

#function which takes type of user to be searched for
def searchForUserLogins(name_token):
    pattern = re.compile(r'Failed password for .*' + name_token, re.IGNORECASE)
    result = list(filter(pattern.findall, text))
    mytuple = (name_token, int(len(result)))
    return mytuple

#search for root logins
results_list.append(searchForUserLogins(name_token="root"))
#search for admin logins
results_list.append(searchForUserLogins(name_token="admin"))
#search for test logins
results_list.append(searchForUserLogins(name_token="test"))
#search for guest logins
results_list.append(searchForUserLogins(name_token="guest"))
#search for mysql logins
results_list.append(searchForUserLogins(name_token="mysql"))
#search for info logins
results_list.append(searchForUserLogins(name_token="info"))
#search for oracle logins
results_list.append(searchForUserLogins(name_token="oracle"))
#search for postgres logins
results_list.append(searchForUserLogins(name_token="postgres"))


#sort the list by index 1 of tuple 
print(sorted(results_list,key=itemgetter(1),reverse=True))