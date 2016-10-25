import numpy
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import pickle


if __name__ == '__main__':
	save = pickle.load(open("../cache/44f/"+str(5)+".pkl","rb"))
	x = save['x']
	y = save['y']
	model = pickle.load(open("../saves/algorithm_tune_rf.pkl","rb"))[0]
	print model
	clf = RandomForestClassifier(n_estimators=model[2],max_depth=model[3],min_samples_leaf=model[4],max_features=model[5],min_samples_split=model[6])
	for i in range(0,10):
		scores = cross_val_score(clf,x,y,cv=10,n_jobs=-1)
		print scores.mean()*100
