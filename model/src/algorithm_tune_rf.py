import numpy
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import RandomizedSearchCV
import pickle


if __name__ == '__main__':
	results = []
	for i in range(5,6):
		save = pickle.load(open("../cache/18f/"+str(i)+".pkl","rb"))
		x = save['x']
		y = save['y']
		param_grid = { 
			'n_estimators': [60,100,500,1000],
			"max_depth": [5,10,20,30, None],
			"min_samples_leaf": [1,2,5,10],
			'max_features': ['auto', 'sqrt', 'log2'],
			"min_samples_split" : [1,2,5,10,15]
		}
		model = RandomForestClassifier()
		#grid = GridSearchCV(cv=4,estimator=model, param_grid=param_grid,verbose=1,n_jobs=-1)
		grid =  RandomizedSearchCV(n_iter=40,cv=5,estimator=model, param_distributions=param_grid,verbose=1,n_jobs=-1)
		#print grid.estimator.get_params().keys()
		grid.fit(x,y)
		temp = []
		temp.append(i)
		temp.append(grid.best_score_*100)
		temp.append(grid.best_estimator_.n_estimators)
		temp.append(grid.best_estimator_.max_depth)
		temp.append(grid.best_estimator_.min_samples_leaf)
		temp.append(grid.best_estimator_.max_features)
		temp.append(grid.best_estimator_.min_samples_split)
		results.append(temp)
		print i,
		print grid.best_score_*100
	pickle.dump(results,open("../saves/algorithm_tune_rf.pkl","wb"))
