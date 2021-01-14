
'''
This file takes in story text and translates it into 
text for story dialogue. This text contains quotes and
things like new line character.
'''

file = open('stringify.txt', 'r')
lines = file.readlines()

string = repr("".join(lines))
newstring = ""

for x in range(0, len(string)):
  if(string[x] == "“" or string[x] == "”"):
    newstring += "\\\""
  else:
    newstring += string[x]

if newstring[-3:-1] == "\\n":
  newstring = newstring[:-3] + "\""

print(newstring)
