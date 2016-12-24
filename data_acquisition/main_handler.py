import subprocess
import urllib2
import json

def get_match_details(match_id):
	res = urllib2.urlopen("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+str(match_id)+"&key=ACABEB1FD8894A44B2A5AB4B79209C75")
	string = res.read().decode('utf-8')
	json_obj = json.loads(string)
	return json_obj

NUM_REPLAYS_TO_DOWNLOAD = 100
CONFIG_FILE = "./config/dwaraka0071_config"

match_ids = []
duration_list = []
num=1
previous_matchid = ""

while num<= NUM_REPLAYS_TO_DOWNLOAD:
	if len(previous_matchid)==0:
		res = urllib2.urlopen("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?format=json&skill=3&key=ACABEB1FD8894A44B2A5AB4B79209C75")
		string = res.read().decode('utf-8')
		json_obj = json.loads(string)
		matches = json_obj['result']['matches']
		previous_matchid = str(matches[99]['match_id'])
		continue
	else:
		res = urllib2.urlopen("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?start_at_match_id="+previous_matchid+"&skill=3&key=ACABEB1FD8894A44B2A5AB4B79209C75")
	string = res.read().decode('utf-8')
	json_obj = json.loads(string)
	matches = json_obj['result']['matches']
	if len(matches)!=100:
		break
	previous_matchid = str(matches[99]['match_id'])

	for i in range(0,100):
		if num<=NUM_REPLAYS_TO_DOWNLOAD:
			match_id = matches[i]['match_id']
			duration = get_match_details(match_id)['result']['duration']
			if duration > 1800:
				match_ids.append(matches[i]['match_id'])
				duration_list.append(duration)
				print num,"Selected",
				print "Match_id:",match_id,
				print "Duration:",duration," seconds"
				num+=1

argv = CONFIG_FILE
for match_id in match_ids:
	argv+=" "+str(match_id)

print "Calling dota client"
subprocess.call("node match_details.js "+argv)
print "Finished downloading"
