import os
import bz2

bz2files = os.listdir("../../resources/replays")

for bz2file in bz2files:
	match_id = bz2file.split(".")[0]
	if os.path.exists("../../resources/replays_dem/"+match_id+".dem") == False:
		zipfile = bz2.BZ2File("../../resources/replays/"+bz2file)
		try:
			print "Extracting",match_id,"..."
			data = zipfile.read()
			open("../../resources/replays_dem/"+match_id+".dem", 'wb').write(data)
		except EOFError:
			zipfile.close()
			print "EOF error: deleted",match_id
			os.remove("../../resources/replays/"+bz2file)
			os.remove("../../resources/match_details/"+match_id.split("_")[0]+".json")

