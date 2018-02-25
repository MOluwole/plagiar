#Using python for plagiarism checker

str = "i want to code today. But My Mummy is complaining about me.Line1 is cool. We love u so much, We still love to see more of you around here"
str1 = "Abiodun is awesome.Line1 is cool.we love u so much, We still love to see more of you around here.sdklfjsldkfjsflkjsflk, lskdfjsfweirwoerueworierowierwer.i want to code today"

"""
  Split with full stop (period)
"""
explode = str.split('.')
explode1 = str1.split('.')

"""
 split with comma(,)
"""

comma = str.split(',')
comma1 = str1.split(',')

"""
  Conditions
"""
count = 0
store = []

for i in xrange(len(explode)):
  for x in xrange(len(explode1)):
    if explode[i].strip() == explode1[x].strip():
      count = count + 1
      store.append(explode[i])	

for c in xrange(len(comma)):
  for cm in xrange(len(comma1)):
    if comma[c].strip() == comma1[cm].strip():
      count = count + 1
      store.append(comma[c])

print count
print store

    
