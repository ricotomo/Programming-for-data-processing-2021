import re
import os
from operator import itemgetter
from collections import Counter

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

#Exercise 2

def createRankedTouple(ipAddress, count):
    mytuple = ()
    if (count > 0 and count <= 50):
        mytuple = ('0 < x <= 50', ipAddress)
    if (count > 50 and count <= 100):
        mytuple = ('50 < x <= 100', ipAddress)
    if (count > 100 and count <= 150):
        mytuple = ('100 < x <= 150', ipAddress)
    if (count > 150 and count <= 200):
        mytuple = ('150 < x <= 200', ipAddress)
    if (count > 200 and count <= 250):
        mytuple = ('200 < x <= 250', ipAddress)
    return mytuple



#function which takes type of user to be searched for
def searchForAttackDistribution():
    pattern = re.compile(r'Invalid user .*', re.IGNORECASE)
    result = list(filter(pattern.findall, text))
    patternPassword = re.compile(r'Failed password .*', re.IGNORECASE)
    resultPassword = list(filter(patternPassword.findall, text))
    result = result + resultPassword
    patternIP = re.compile(r'(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})', re.IGNORECASE)
    ipList = []
    for j in result:
        ipAddress = re.findall(patternIP, j)
        if(ipAddress != []):
            ipList.append(ipAddress[0])
    ipWithoutDuplicates = list(set(ipList))
    attackList = []
    for k in ipWithoutDuplicates:
        attackList.append(createRankedTouple(k, ipList.count(k)))
    return attackList       
# the sort is only missing    
print(searchForAttackDistribution())