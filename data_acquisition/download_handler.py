import threading
import os
import urllib2
import json
import sys
import time
import requests

NUM_THREADS = 4
BROKEN_THRESHOLD = 15

class myThread (threading.Thread):
		def __init__(self, threadID,urlList):
				threading.Thread.__init__(self)
				self.threadID = str(threadID)
				self.urlList = urlList
		def run(self):
				print "Starting Thread "+self.threadID+"\n",
				for url in self.urlList:
					print "[Thread "+self.threadID+"]"+"Downloading "+url+"\n",
					downloadFile(url,self.threadID)
				print "Exiting Thread "+self.threadID+"\n",

def downloadFile(url,threadID):
	localFilename = url.split('/')[-1]
	with open("../../resources/replays"+ '/' + localFilename, 'wb') as f:
		start = time.clock()
		r = requests.get(url, stream=True)
		total_length = int(r.headers.get('content-length'))
		if total_length==0:
			print "[Thread "+threadID+"]"+" Time Out!"+"\n",
			return
		dl = 0
		if total_length is None:
			f.write(r.content)
		else:
			for chunk in r.iter_content(1024):
				dl += len(chunk)
				f.write(chunk)
				done = int(50 * dl / total_length)
				if (time.clock()-start) > 10:
					if ((dl//(time.clock() - start))/(1024)) < BROKEN_THRESHOLD:
						print "[Thread "+threadID+"]"+"Broken URL"+"\n",
						return

files =  os.listdir("../../resources/match_details")
urls = []
for f in files:
	match_id = f.split(".")[0]
	json_obj = json.load(open("../../resources/match_details/"+f,"r"))
	replay_salt =  json_obj['match']['replay_salt']
	cluster = json_obj['match']['cluster']
	if os.path.exists("../../resources/replays/"+match_id+"_"+str(replay_salt)+".dem.bz2")==False:
		url = "http://replay"+str(cluster)+".valve.net/570/"+match_id+"_"+str(replay_salt)+".dem.bz2";
		urls.append(url)


urlList = [urls[i::NUM_THREADS] for i in range(NUM_THREADS)]

threads = []
for i in range(0,NUM_THREADS):
	thread = myThread(i,urlList[i])
	thread.start()
	threads.append(thread)

for t in threads:
    t.join()

print "Exiting Main Thread"
