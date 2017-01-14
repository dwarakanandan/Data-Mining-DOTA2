import pickle
import matplotlib.pyplot as plt
import numpy as np

def plot(fname,color):
	results = pickle.load(open("../../saves/lr/"+fname+".pkl","rb"))
	game_time = 1
	x = []
	y_lr = []
	for result in results:
		x.append(game_time)
		y_lr.append(result[1])
		plt.scatter(game_time,result[1])
		game_time+=1
	plt.plot(x,y_lr,label=fname.split("_")[-1],color=color)

plot("algorithm_lr_18f","g")
plot("algorithm_lr_90f","r")
plt.legend(loc=2)
plt.show()
