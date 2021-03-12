import sys
import random
import math
import string

memory = {}
fname = "spelljson.txt"
dark = 'false'
lvl = ''
name = ''
desc = ''
crit = ''
type = ''
trad = 'water'
rank = -1
req = ''
sacrifice = ''
target = ''
area = ''
duration = ''
conc = 'false'
trig = 'false'
dark = 'false'
page = 129
source = ''

if trad == 'curse' or trad == 'death' or trad == 'demonology' or trad == 'forbidden' or trad == 'madness' or trad == 'necromancy':
	dark = 'true'
phase = ''

def space():
	result = ""
	for i in range(0, memlen):
		result += " "
	return result

def print_json(comma):
	print('{')
	print('\t"name": "' + name.strip() + '",')
	print('\t"desc": "' + desc.strip() + '",')
	print('\t"crit": "' + crit + '",')
	print('\t"type": "' + type + '",')
	print('\t"tradition": "' + trad + '",')
	print('\t"rank": ' + str(rank) + ',')
	print('\t"requirement": "' + req + '",')
	print('\t"sacrifice": "' + sacrifice + '",')
	print('\t"target": "' + target + '",')
	print('\t"area": "' + area + '",')
	print('\t"duration": "' + duration + '",')
	print('\t"concentration": ' + conc + ',')
	print('\t"triggered": ' + trig + ',')
	print('\t"dark": ' + dark + ',')
	print('\t"source": "' + source + '",')
	print('\t"page": ' + str(page) + ',')
	if comma:
		print('},')
	else:
		print('}')

#print("reading file: " + fname)

f = open(fname, "r",encoding='windows-1252')
input = f.readline()
i = 0
while input != "":
	line = ""
	skip = False;
	for c in input:
		if skip:
			line += c
			skip = False
		else:
			skip = True
	line = line.strip()
	if line is not "":
		if line[0] == '{':
			print(line)
			print('\t' + '"id": ' + str(i) + ',')
			i+= 1;
		elif line[0] == '}':
			print(line)
		else:
			print('\t' + line)
	
	
	input = f.readline()
f.close()