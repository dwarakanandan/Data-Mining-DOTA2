import os
import urllib2
import json
import sys
import time
import requests

def downloadFile(url, directory) :
	localFilename = url.split('/')[-1]
	with open(directory + '/' + localFilename, 'wb') as f:
		start = time.clock()
		r = requests.get(url, stream=True)
		total_length = int(r.headers.get('content-length'))
		if total_length==0:
			print "  Time Out!"
			return
		print " Size:"+str(total_length/(1024*1024))+"MB"
		dl = 0
		if total_length is None:
			f.write(r.content)
		else:
			for chunk in r.iter_content(1024):
				dl += len(chunk)
				f.write(chunk)
				done = int(50 * dl / total_length)
				if (time.clock()-start) > 10:
					if ((dl//(time.clock() - start))/(1024)) < 15:
						print "Broken URL"
						return
				sys.stdout.write("\r[%s%s] %04d KB/s" % ('=' * done, ' ' * (50-done), (dl//(time.clock() - start))/(1024))),
	print ""


files =  os.listdir("../../resources/match_details")
for f in files:
	match_id = f.split(".")[0]
	json_obj = json.load(open("../../resources/match_details/"+f,"r"))
	replay_salt =  json_obj['match']['replay_salt']
	cluster = json_obj['match']['cluster']
	if os.path.exists("../../resources/replays/"+match_id+"_"+str(replay_salt)+".dem.bz2")==False:
		print "Downloading  "+f,
		url = "http://replay"+str(cluster)+".valve.net/570/"+match_id+"_"+str(replay_salt)+".dem.bz2";
		print url,
		downloadFile(url,"../../resources/replays")

#clean broken links
files = os.listdir("../../resources/replays")
for f in files:
	if os.path.getsize("../../resources/replays/"+f)<10000000:
		os.remove("../../resources/replays/"+f)
		match_id = f.split(".")[0].split("_")[0]
		os.remove("../../resources/match_details/"+match_id+".json")
