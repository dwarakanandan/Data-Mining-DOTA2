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
		x = np.array(row)
		match_id = x[0]
		x = x[2:]
		new_f = []
		for i in range(0,17):
			temp = 0
			for j in range(0,5):
				temp+=x[(j*17)+i]
			new_f.append(temp)
			temp = 0
			for j in range(5,10):
				temp+=x[(j*17)+i]
			new_f.append(temp)
		features.append(new_f)
		lables.append(getMatchOutcome(match_id,connection))
	connection.close()
	return np.array(features),np.array(lables)

x,y = load(1)
print x.shape
print y.shape
