import numpy
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV
import pickle

results = []
if __name__ == '__main__':
	for i in range(1,30):
		save = pickle.load(open("../cache/18f/"+str(i)+".pkl","rb"))
		x = save['x']
		y = save['y']
		param_grid = {"C": [0.001,0.005,0.01,0.05,0.1,0.5,1,1.5,2]}
		model = LogisticRegression(n_jobs=-1)
		grid = GridSearchCV(cv=100 ,estimator=model, param_grid=param_grid,n_jobs=-1,verbose=1)
		#print grid.estimator.get_params().keys()
		grid.fit(x,y)
		results.append([i,grid.best_score_*100])
		print i,
		print grid.best_score_*100,
		print grid.best_estimator_.C

	pickle.dump(results,open("../saves/algorithm_tune_lr.pkl","wb"))
