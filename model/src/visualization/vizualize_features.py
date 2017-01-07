import pickle
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
import numpy as np

fig = plt.figure()

for i in range(1,31):
	save = pickle.load(open("../../cache/18f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	pca = PCA(n_components=2)
	x = pca.fit_transform(x)
	x_r = []
	x_d = []
	for index,j in enumerate(x):
		if y[index] == 0:
			x_r.append(j)
		else:
			x_d.append(j)
	x_r = np.array(x_r)
	x_d = np.array(x_d)
	subplot = fig.add_subplot(6,6,i)
	n_scatter = 200
	subplot.set_title(str(i)+' min')
	subplot.scatter(x_r[:n_scatter,0],x_r[:n_scatter,1],color="r",label="radiant_victory")
	subplot.scatter(x_d[:n_scatter,0],x_d[:n_scatter,1],color="b",label="dire_victory")

fig.subplots_adjust(hspace=0.6)
plt.legend()
plt.show()
