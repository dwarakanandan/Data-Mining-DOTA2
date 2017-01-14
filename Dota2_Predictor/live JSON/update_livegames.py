import urllib2
import json
import time

while(True):
    res = urllib2.urlopen("https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v0001/?key=ACABEB1FD8894A44B2A5AB4B79209C75")
    string = res.read().decode('utf-8')
    json_obj = json.loads(string)
    matches = json_obj['result']['games']
    file = open("livegames.json", "w")
    json.dump(json_obj, file)
    file.close()
    time.sleep(10)
