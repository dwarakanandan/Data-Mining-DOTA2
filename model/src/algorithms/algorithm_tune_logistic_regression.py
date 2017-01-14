import numpy
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV
import pickle

features = 90
results = []
if __name__ == '__main__':
	for i in range(1,31):
		save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
		x = save['x']
		y = save['y']
		param_grid = {"C": [0.005,0.01,0.05,0.1,0.5,1,1.5,2]}
		grid = GridSearchCV(cv=10 ,estimator=LogisticRegression(n_jobs=-1), param_grid=param_grid,n_jobs=-1,verbose=1)
		#print grid.estimator.get_params().keys()
		grid.fit(x,y)
		print i,
		print grid.best_score_*100
		results.append([i,grid.best_score_*100])
		model = LogisticRegression(C=grid.best_estimator_.C)
		model.fit(x,y)
		pickle.dump(model,open("../../saves/lr/"+str(features)+"f/algorithm_lr_"+str(features)+"f_"+str(i)+"m.pkl","wb"))
	pickle.dump(results,open("../../saves/lr/algorithm_lr_"+str(features)+"f.pkl","wb"))
