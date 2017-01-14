import threading
import os
import bz2
import sys

NUM_THREADS = 8

class myThread (threading.Thread):
		def __init__(self, threadID,bz2List):
				threading.Thread.__init__(self)
				self.threadID = str(threadID)
				self.bz2List = bz2List
		def run(self):
				print "Starting Thread "+self.threadID+"\n",
				for bz2file in self.bz2List:
					print "[Thread "+self.threadID+"]"+"Extracting "+bz2file+"\n",
					extract(self,bz2file)
				print "Exiting Thread "+self.threadID+"\n",

def extract(self,bz2file):
	match_id = bz2file.split(".")[0]
	zipfile = bz2.BZ2File("C:/Ani/Project/Beta/resources/replays/"+bz2file)
	try:
		data = zipfile.read()
		open("../../resources/replays_dem/"+match_id+".dem", 'wb').write(data)
	except EOFError:
		zipfile.close()
		print "[Thread "+self.threadID+"]"+"EOF error: deleted"+str(match_id)+"\n",
		#os.remove("../../resources/replays/"+bz2file)
		os.remove("../../resources/match_details/"+match_id.split("_")[0]+".json")
	except IOError:
		zipfile.close()
		print "[Thread "+self.threadID+"]"+"IO error: deleted"+str(match_id)+"\n",
		#os.remove("../../resources/replays/"+bz2file)
		os.remove("../../resources/match_details/"+match_id.split("_")[0]+".json")

files = os.listdir("C:/Ani/Project/Beta/resources/replays")
bz2files = []

for f in files:
	match_id = f.split(".")[0]
	if os.path.exists("../../resources/replays_dem/"+match_id+".dem") == False:
		bz2files.append(f)

bz2List = [bz2files[i::NUM_THREADS] for i in range(NUM_THREADS)]

threads = []
for i in range(0,NUM_THREADS):
	thread = myThread(i,bz2List[i])
	thread.start()
	threads.append(thread)

for t in threads:
    t.join()

print "Exiting Main Thread"
