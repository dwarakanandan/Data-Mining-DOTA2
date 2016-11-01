import matplotlib.pyplot as plt
import numpy as np
from scipy import stats
import sqlite3


connection = sqlite3.connect("../../../../resources/dota2.db")
query = connection.execute("SELECT DURATION FROM MATCH_DATA").fetchall()
data = []
for i in query:
	data.append(i[0])
data.sort()
min = data[0]
max = data[-1]
bins = range(min,max)
plt.hist(data,bins=200)
plt.show()

