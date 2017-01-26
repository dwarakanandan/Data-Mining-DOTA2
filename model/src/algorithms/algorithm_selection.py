import numpy
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
import pickle

def lr(features,i):
	save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	param_grid = {"C": [0.001,0.005,0.01,0.05,0.1,0.5,1,1.5,2]}
	model = LogisticRegression(n_jobs=-1)
	grid = GridSearchCV(cv=5 ,estimator=model, param_grid=param_grid,n_jobs=-1,verbose=1)
	#print grid.estimator.get_params().keys()
	grid.fit(x,y)
	print i,
	print grid.best_score_*100,
	print grid.best_estimator_.C

def svm(features,i):
	save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	param_grid = {"C": [0.01,0.1,0.5,1.5,2],
								'kernel':['linear'],
								'gamma': [0.01,0.005,0.001,0.0005, 0.0001],
								'class_weight':['balanced']}
	model = SVC()
	grid = GridSearchCV(cv=5,estimator=model, param_grid=param_grid,verbose=1,n_jobs=-1)
	#print grid.estimator.get_params().keys()
	grid.fit(x,y)
	print i,
	print grid.best_score_*100,
	print grid.best_estimator_.C,grid.best_estimator_.gamma,grid.best_estimator_.class_weight

def knn(features,i):
	save = pickle.load(open("../../cache/"+str(features)+"f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	param_grid = {"n_neighbors": [150,200,300,500]}
	model = KNeighborsClassifier(n_jobs=-1)
	grid = GridSearchCV(cv=5 ,estimator=model, param_grid=param_grid,n_jobs=-1,verbose=1)
	#print grid.estimator.get_params().keys()
	grid.fit(x,y)
	print i,
	print grid.best_score_*100,
	print grid.best_estimator_.n_neighbors

if __name__ == '__main__':
	features=90
	time=5
	lr(features,time)
	knn(features,time)
	svm(features,time)
