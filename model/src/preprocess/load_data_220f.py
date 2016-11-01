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
	query = query[:2]#remove later
	features = []
	lables  = []
	for row in query:
		x = np.array(row)
		match_id = x[0]
		x = x[2:]
		features.append(x)
		lables.append(getMatchOutcome(match_id,connection))
	connection.close()
	return np.array(features),np.array(lables)

