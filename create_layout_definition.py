#!/usr/bin/python

'''
Reads all subdirectories of the argv directory and 
creates portfolio sets. The names of the subdirectories 
will be used as the set titles and the first instance of a
.txt files content will be used for the set description.
'''

import sys
from os import walk, sep, path
from string import find, rsplit
from json import JSONEncoder

dirfiles = 2
topdir = 0

def main(argv=None):
	
	if argv is None:
		argv = sys.argv
	
	scanPortfolio(argv[1])

def scanPortfolio(dir):
	
	output = list()
	
	listing = walk(dir)
	
	for step in listing:
		for foundFile in step[dirfiles]:
			if find(foundFile, ".txt") > 0:
				
				print "found " + foundFile + " in " + step[topdir]
				title = rsplit(step[topdir], sep, 1)[1]				
				print "creating portfolio set named '" + title + "'"
				
				descriptionLines = (open(path.join(step[topdir], foundFile), 'r')).readlines()
				description = "".join(descriptionLines[0:len(descriptionLines)])
				
				images = list()
				images = filter(lambda f : find(f, ".jpg") > 0, step[dirfiles])
				images = map(lambda i : path.join(step[topdir], i), images)
				
				portfolioSet = dict()
				portfolioSet['title'] = title
				portfolioSet['description'] = description
				portfolioSet['images'] = images
				
				output.append(portfolioSet)
	
	layoutFile = open(path.join(dir, "layout.json"), 'w')
	layoutFile.write(JSONEncoder().encode(output))
											

if __name__ == "__main__":
	sys.exit(main())
