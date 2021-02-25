import re
import os
from operator import itemgetter
from collections import Counter

#imported text line by line as list
text = []

#set system path
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

#open text file and save as string obj4e
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
    test_count_0to50 = 0
    if (count > 0 and count <= 50):
        mytuple = ('0 < x <= 50', ipAddress)
        return mytuple
    elif (count > 50 and count <= 100):
        mytuple = ('50 < x <= 100', ipAddress)
        return mytuple
    elif (count > 100 and count <= 150):
        mytuple = ('100 < x <= 150', ipAddress)
        return mytuple
    elif (count > 150 and count <= 200):
        mytuple = ('150 < x <= 200', ipAddress)
        return mytuple
    elif (count > 200 and count <= 250):
        mytuple = ('200 < x <= 250', ipAddress)
    else:
        return None



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
    countAttacks = []
    zerotofifty = 0 
    fiftytohun = 0
    huntoonefifty = 0
    onefiftytotwohun = 0
    twohuntotwofifty = 0 
    for k in ipWithoutDuplicates:
        attackList.append(createRankedTouple(k, ipList.count(k)))
    
    for x in attackList:
        if x[0] == "0 < x <= 50":
            zerotofifty += 1
        elif x[0] == "50 < x <= 100":
            fiftytohun += 1
        elif x[0] == "100 < x <= 150":
            huntoonefifty += 1
        elif x[0] == "150 < x <= 200":
            onefiftytotwohun += 1
        elif x[0] == "200 < x <= 250":
            twohuntotwofifty += 1
    
    tuple1 = ("0 < x <= 50", zerotofifty)
    tuple5 = ("100 < x <= 150", huntoonefifty)
    tuple2 = ("100 < x <= 150", huntoonefifty)
    tuple3 = ("150 < x <= 200", onefiftytotwohun)
    tuple4 = ("200 < x <= 250", twohuntotwofifty)
    countAttacks.append(tuple1)
    countAttacks.append(tuple2)
    countAttacks.append(tuple3)
    countAttacks.append(tuple4)
    countAttacks.append(tuple5)


    return countAttacks    
# sorted    
# results_list2 = []
results_list2 = searchForAttackDistribution()
print(sorted(results_list2,key=itemgetter(1),reverse=True))


# Exercise 3


# main function for exercise 3
def rank_failure():
    pattern = re.compile(r'Invalid user .* from (\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})')

    for each in text:
        ip = re.search(pattern, each)
        if ip:
            ips.append(ip.group(1))
    return Counter(ips).most_common()

# Exercise 4
def GetReverseRank():

    path="messages_syslog_class.txt"
    file=open(path,'r')
    text=[]
    if file:
        for line in file:
            text.append(line)


    #regex to find
    pattern=re.compile(r'Failed password for invalid user|Failed password|Invalid user?')
    result=list(filter(pattern.findall,text))


    pattern=re.compile(r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}[^0-9]")
    IPData=[]
    for line in result:
        IPResult=pattern.search(line)
        IPData.append(IPResult.group(0))

    IPWiseData=[]  #getting all IPS
    IPData=set(IPData)
    IPDataSet=IPData
    for IP in IPData:
        data=[]
        for r in result:
            if IP in r:
                data.append(r)
        IPWiseData.append(data)


    AvgList=[]
    for IPData in IPWiseData:
        count=0
        sum=0
        for index in range(len(IPData)-1):
            tokensOne=IPData[index].split(" ")
            tokensTwo = IPData[index+1].split(" ")

            #first time
            startTime=tokensOne[2]
            #second time
            endTime=tokensTwo[2]


            from datetime import datetime

            date_time_obj1 = datetime.strptime(startTime, '%H:%M:%S')
            date_time_obj2 = datetime.strptime(endTime, '%H:%M:%S')

            date_time_obj1=date_time_obj1.second+date_time_obj1.minute*60+date_time_obj1.hour*3600
            date_time_obj2 = date_time_obj2.second + date_time_obj2.minute * 60 + date_time_obj2.hour * 3600

            count+=1

            total_seconds = int(date_time_obj2)-int(date_time_obj1)
            #print(total_seconds)
            sum+=(total_seconds)
            #sum+=int(date_time_obj2-date_time_obj1)

        #print(sum,count)
        if(sum!=0 and count!=0):
            if(sum<0):
                sum=sum*-1
            AvgList.append(sum//count)

    IPDataSet=list(IPDataSet)

    finalResult=[]
    for index in range(len(AvgList)):
        finalResult.append((IPDataSet[index],AvgList[index]))

    #sorting
    AvgList.sort()
    final=[]
    #print(AvgList)
    for e in AvgList:
        for x in finalResult:
            if(x[1]==e):
                final.append((x[0],x[1]))
                break;
    return (final)

print(GetReverseRank())
