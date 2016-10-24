import pickle
import matplotlib.pyplot as plt

for i in range(1,31):
	save = pickle.load(open("../../cache/18f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	plot_x_r = []
	plot_x_d = []
	plot_y_r = []
	plot_y_d = []
	for index,i in enumerate(x):
		if y[index] == 0:
			plot_x_r.append(i[1])
			plot_y_r.append(i[0]+i[3])
		else:
			plot_x_d.append(i[1])
			plot_y_d.append(i[0]+i[3])
	plt.scatter(plot_x_r,plot_y_r,color="r",label="radiant_victory")
	plt.scatter(plot_x_d,plot_y_d,color="b",label="dire_victory")
	plt.legend(loc=2)
	plt.show()
