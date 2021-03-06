import xmltodict
import pprint
import json
import sys
import uuid
import datetime
from pymongo import MongoClient

xmlfile = sys.argv[1]

client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor

# Look here for the guide
# https://www.journaldev.com/19392/python-xml-to-json-dict

# with open('nmap-out.xml') as fd:
with open(xmlfile) as fd:
	doc = xmltodict.parse(fd.read())

pp = pprint.PrettyPrinter(indent=4)
sourceForInsert = json.dumps(doc)
pp.pprint(json.dumps(doc))

runStats = json.loads(doc)

docId = str(uuid.uuid4())

result = db.filedata.insert_one({
	'_id': docId,
	'source': sourceForInsert,
	'runStats': runStats['nmaprun']['runstats'],
	'origination': 'from python file',
	'dateCreated': datetime.datetime.now()
})
pp.pprint(result)