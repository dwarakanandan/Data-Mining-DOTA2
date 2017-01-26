import sqlite3
import numpy as np

def getMatchOutcome(match_id,connection):
	query = connection.execute("SELECT MATCH_OUTCOME FROM MATCH_DATA WHERE MATCH_ID = "+str(match_id)).fetchall()
	if query[0][0] == "radiant":
		return 0
	else:
		return 1

def load(time_elapsed):
	connection = sqlite3.connect("../../../../resources/dota2.db")
	query = connection.execute("SELECT * FROM PLAYER_DATA WHERE TIME_ELAPSED="+str(time_elapsed)).fetchall()
	features = []
	lables  = []
	for row in query:
		match_id = row[0]
		match = np.array(row)
		match = np.delete(match,[0,1]).reshape(10,17)
		del_index = [1,4,7,9,10,11,12,13]
		#ASSISTS,DEATHS,DENY_COUNT,KILLS,LAST_HIT_COUNT,NET_WORTH,TOTAL_GOLD_EARNED,TOTAL_XP_EARNED,TOWER_KILLS
		match = np.delete(match,del_index,1)
		radiant = match[:5].sum(axis=0)
		dire = match[5:].sum(axis=0)
		match = np.concatenate([radiant,dire])
		features.append(match)
		lables.append(getMatchOutcome(match_id,connection))
	connection.close()
	return np.array(features),np.array(lables)
