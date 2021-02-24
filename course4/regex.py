import re
import os

text = ""

#set system path
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

#open text file and save as string obj
with open(os.path.join(__location__, './messages_syslog_class.txt')) as f:
    text = f.read()
    f.close()


