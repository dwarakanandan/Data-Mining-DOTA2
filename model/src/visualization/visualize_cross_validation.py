import pickle
import matplotlib.pyplot as plt

def plot(fname,color):
	results = pickle.load(open("../../saves/"+fname+".pkl","rb"))
	game_time = 1
	x = []
	y_lr = []
	y_svm = []
	y_rf = []
	x.append(0)
	y_lr.append(50)
	y_svm.append(50)
	y_rf.append(50)
	for result in results:
		x.append(game_time)
		y_lr.append(result[0][1])
		y_svm.append(result[1][1])
		y_rf.append(result[2][1])
		game_time+=1
	plt.plot(x,y_lr,label="LR"+fname.split("_")[-1],color="r")
	plt.plot(x,y_svm,label="SVM"+fname.split("_")[-1],color="g")
	plt.plot(x,y_rf,label="RF"+fname.split("_")[-1],color="b")

def plot_44(fname,color):
	results = pickle.load(open("../saves/"+fname+".pkl","rb"))
	game_time = 5
	x = []
	y_lr = []
	for result in results:
		x.append(game_time)
		y_lr.append(result[1])
		game_time+=1
	plt.plot(x,y_lr,label=fname.split("_")[-1]+"_optimized",color=color)


plot("cross_validation_18f","g")
#plot_44("algorithm_tune_lr","g")
#plot_optimized("algorithm_tune_svm","y")
plt.legend(loc=2)
plt.show()
