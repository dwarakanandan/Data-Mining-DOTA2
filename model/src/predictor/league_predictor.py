import urllib2
import json
import numpy as np
from sklearn.preprocessing import StandardScaler
from algorithm_logistic_regression import predict

def num_tower_kills(towers):
    tstring = str(towers)[2:]
    count = 0
    for i in range(0,11):
        if tstring[i]=='0':
            count+=1
    return count

def parse_match(game):
    scoreboard = game['scoreboard']
    duration = scoreboard['duration']/60
    radiant_players = scoreboard['radiant']['players']
    dire_players = scoreboard['dire']['players']
    radiant = []
    for radiant_player in radiant_players:
        radiant.append(radiant_player['assists'])
        radiant.append(radiant_player['death'])
        radiant.append(radiant_player['denies'])
        radiant.append(radiant_player['kills'])
        radiant.append(radiant_player['last_hits'])
        radiant.append(radiant_player['net_worth'])
        radiant.append((radiant_player['gold_per_min'])*duration)
        radiant.append((radiant_player['xp_per_min'])*duration)
        radiant.append(0.0)#TOWER_KILLS
    dire = []
    for dire_player in dire_players:
        dire.append(dire_player['assists'])
        dire.append(dire_player['death'])
        dire.append(dire_player['denies'])
        dire.append(dire_player['kills'])
        dire.append(dire_player['last_hits'])
        dire.append(dire_player['net_worth'])
        dire.append((dire_player['gold_per_min'])*duration)
        dire.append((dire_player['xp_per_min'])*duration)
        dire.append(0.0)#TOWER_KILLS

    radiant_18f = np.array(radiant).reshape(5,9).sum(axis=0)
    dire_18f = np.array(dire).reshape(5,9).sum(axis=0)
    radiant_tower_state = bin(scoreboard['radiant']['tower_state'])
    dire_tower_state = bin(scoreboard['dire']['tower_state'])
    radiant_18f[-1] = num_tower_kills(radiant_tower_state)
    dire_18f[-1] = num_tower_kills(dire_tower_state)
    match_18f = np.concatenate([radiant_18f,dire_18f]).reshape(18,1)
    match_90f = np.concatenate([radiant,dire]).reshape(90,1)
    scalar = StandardScaler().fit(match_18f)
    match_18f = scalar.transform(match_18f)
    scalar = StandardScaler().fit(match_90f)
    match_90f = scalar.transform(match_90f)
    return match_18f,match_90f


features = 18
res = urllib2.urlopen("https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v0001/?key=ACABEB1FD8894A44B2A5AB4B79209C75")
string = res.read().decode('utf-8')
json_obj = json.loads(string)
matches = json_obj['result']['games']
for i in range(0,100):
    try:
        game = matches[i]
        time = int((game['scoreboard']['duration'])/60)
        temp = time
        if time>30:
            time=30
        m18f,m90f = parse_match(game)
        if features == 18:
            prediction,prediction_probablity,global_prediction_accuracy = predict(18,time,m18f)
        else:
            prediction,prediction_probablity,global_prediction_accuracy = predict(90,time,m90f)
        #if prediction_probablity[prediction]<0.7:
        #    continue
        print "Predicting matchid:",game['match_id'],
        print "  Duration:",temp,"min"
        if prediction==0:
            print "Radiant",
        else:
            print "Dire",
        print "has a ","%.2f%% probablity of winning" % (prediction_probablity[prediction]*100)
        print "Model accuracy at ",time," min is:","%.2f%%" % global_prediction_accuracy
        print
    except:
        pass
