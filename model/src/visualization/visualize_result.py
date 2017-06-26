import pickle
import matplotlib.pyplot as plt
import numpy as np

def plot(fname,color,s_time,e_time):
	results = pickle.load(open("../../saves/lr/"+fname+".pkl","rb"))
	game_time = 1
	x = []
	y_lr = []
	for result in results:
		if game_time < s_time:
			x.append(game_time)
			y_lr.append(result[1])
			game_time+=1
			continue
		if game_time > e_time :
			x.append(game_time)
			y_lr.append(result[1])
			game_time+=1
			continue
		x.append(game_time)
		y_lr.append(result[1])
		plt.scatter(game_time,result[1])
		game_time+=1
	plt.plot(x[s_time-1:e_time],y_lr[s_time-1:e_time],label=fname.split("_")[-1],color=color)

s_time = 20
e_time = 30
plot("algorithm_lr_18f","g",s_time,e_time)
plot("algorithm_lr_90f","r",s_time,e_time)
plot("algorithm_lr_34f","b",s_time,e_time)
plot("algorithm_lr_170f","y",s_time,e_time)
plt.legend(loc=2)
plt.show()
