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