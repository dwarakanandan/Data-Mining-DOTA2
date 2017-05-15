import pickle
import matplotlib.pyplot as plt
import numpy as np

def plot(algo,color):
	x = []
	y = []
	for match_time in range(1,10):
		result = pickle.load(open('../../saves/algorithm_comparison/'+str(match_time)+'.pkl','rb'))
		x.append(match_time)
		y.append(result[algo]['best_score'])
		plt.scatter(match_time,result[algo]['best_score'])
	plt.plot(x,y,label=algo,color=color)

plot("lr","g")
plot("knn","b")
plot("svm","r")
plot("rf","y")
plt.legend(loc=2)
plt.show()
