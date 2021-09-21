import json

with open('spelljson.json') as json_file:
	data = json.load(json_file)

i = 0

def sort_data(x, y):

	return x.name > y.name

sorted(data, key=lambda k: k['name'])
sorted(data, key=lambda k: k['rank'])
sorted(data, key=lambda k: k['tradition'])
sorted(data, key=lambda k: k['source'])


def spelldesc():
	print('{')
	print('\t\"id\": ' + str(p["id"]) + ',')
	print('\t\"name\": \"' + p["name"] + '\",')
	print('\t\"shortdesc\": \"' + p["desc"].split('<')[0][0:50].strip() + '...\",')
	print('\t\"desc\": \"<p>' + p["desc"].replace('"', '\\"').replace('<br/>', '</p><p>') + '</p>\",')
	print('\t\"crit\": \"' + p["crit"] + '\",')
	print('\t\"type\": \"' + p["type"] + '\",')
	print('\t\"tradition\": \"' + p["tradition"] + '\",')
	print('\t\"rank\": ' + str(p["rank"]) + ',')
	print('\t\"requirement\": \"' + p["requirement"] + '\",')
	print('\t\"sacrifice\": \"' + p["sacrifice"] + '\",')
	print('\t\"target\": \"' + p["target"] + '\",')
	print('\t\"area\": \"' + p["area"] + '\",')
	print('\t\"duration\": \"' + p["duration"] + '\",')
	if(p["concentration"]):
		print('\t\"concentration\": true,')
	else:
		print('\t\"concentration\": false,')
	if(p["triggered"]):
		print('\t\"triggered\": true,')
	else:
		print('\t\"triggered\": false,')
	try:
		if(p["dark"]):
			print('\t\"dark\": true,')
		else:
			print('\t\"dark\": false,')
	except:
		print('\t\"dark\": false,')
	print('\t\"source\": \"' + p["source"] + '\",')
	print('\t\"page\": ' + str(p["page"]))
	print('},')
	
	
for p in data:
	if p["rank"] < 6 and p["desc"].find("music") > -1:
		print(p["name"])
		i += 1