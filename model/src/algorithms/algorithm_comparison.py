import numpy, pickle, os
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

def lr(features,i):
	save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	param_grid = {"C": [0.001,0.005,0.01,0.05,0.1,0.5,1,1.5,2]}
	model = LogisticRegression(n_jobs=-1)
	grid = GridSearchCV(cv=5 ,estimator=model, param_grid=param_grid,n_jobs=-1,verbose=1)
	#print grid.estimator.get_params().keys()
	grid.fit(x,y)
	#print i,
	result['lr']['best_score'] = grid.best_score_*100
	result['lr']['best_estimator_.C'] = grid.best_estimator_.C

def svm(features,i):
	save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	C = numpy.logspace(-3, 3, 7)
	gamma = numpy.logspace(-4, 3, 8)
	param_grid = {"C": C,"gamma":gamma}
	model = SVC()
	grid = GridSearchCV(cv=5,estimator=model, param_grid=param_grid,verbose=1,n_jobs=-1)
	#print grid.estimator.get_params().keys()
	grid.fit(x,y)
	result['svm']['best_score'] = grid.best_score_*100
	result['svm']['best_estimator_.C'] = grid.best_estimator_.C
	result['svm']['best_estimator_.gamma'] = grid.best_estimator_.gamma

def knn(features,i):
	save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	param_grid = {"n_neighbors": [150,200,300,500],
					"algorithm": ['auto']}
	model = KNeighborsClassifier(n_jobs=-1)
	grid = GridSearchCV(cv=5 ,estimator=model, param_grid=param_grid,n_jobs=6,verbose=1)
	#print grid.estimator.get_params().keys()
	grid.fit(x,y)
	result['knn']['best_score'] = grid.best_score_*100
	result['knn']['best_estimator_.n_neighbors'] = grid.best_estimator_.n_neighbors

def rf(features,i):
	save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	param_grid = {"n_estimators": [60,160,260,360],
					"max_features": ['auto','log2'],
					"min_samples_split": [25,50,75],
					"min_samples_leaf": [5,10,15]
					}
	model = RandomForestClassifier(n_jobs=-1)
	grid = GridSearchCV(cv=5,estimator=model,param_grid=param_grid,n_jobs=4,verbose=1)
	grid.fit(x,y)
	result['rf']['best_score'] = grid.best_score_*100
	result['rf']['n_estimators'] = grid.best_estimator_.n_estimators
	result['rf']['max_features'] = grid.best_estimator_.max_features
	result['rf']['min_samples_split'] = grid.best_estimator_.min_samples_split
	result['rf']['min_samples_leaf'] = grid.best_estimator_.min_samples_leaf

if __name__ == '__main__':
	features=18
	if not os.path.exists("../../saves/algorithm_comparison"):
		os.mkdir("../../saves/algorithm_comparison")
	for i in range(1,31):
		result = {'lr':{},'svm':{},'knn':{},'rf':{}}
		print i
		time=i
		lr(features,time)
		knn(features,time)
		svm(features,time)
		rf(features,time)
		pickle_out = pickle.dump(result,open('../../saves/algorithm_comparison/'+str(i)+'.pkl','wb'))
		print ""
