import numpy
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
import pickle
import scipy

if __name__ == '__main__':
	results = []
	for i in range(1,31):
		save = pickle.load(open("../cache/18f/"+str(i)+".pkl","rb"))
		x = save['x']
		y = save['y']
		param_grid = {"C": [0.01,0.05,0.1,0.5,1,1.5,2,2.5,3],
									'gamma': [0.01,0.005,0.001,0.0005, 0.0001],
									'class_weight':['balanced']}
		model = SVC()
		grid = GridSearchCV(cv=5,estimator=model, param_grid=param_grid,verbose=1,n_jobs=-1)
		#print grid.estimator.get_params().keys()
		grid.fit(x,y)
		results.append([i,grid.best_score_*100])
		print i,
		print grid.best_score_*100,
		print grid.best_estimator_.C,grid.best_estimator_.gamma,grid.best_estimator_.class_weight
		print

	pickle.dump(results,open("../saves/algorithm_tune_svm.pkl","wb"))
