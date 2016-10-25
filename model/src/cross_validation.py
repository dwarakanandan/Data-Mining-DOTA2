from sklearn import cross_validation
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
import pickle

results = []

for i in range(1,31):
	save = pickle.load(open("../cache/18f/"+str(i)+".pkl","rb"))
	x = save['x']
	y = save['y']
	models = []
	models.append(("LR",LogisticRegression()))
	models.append(("SVM",SVC()))
	models.append(("RF",RandomForestClassifier()))
	print "Game Time: ",i
	result = []
	for name,model in models:
		cv_results = cross_validation.cross_val_score(model, x,y, cv=10,scoring='accuracy')
		result.append([name,cv_results.mean()*100])
		print(" Algo %s - Accuracy: %.3f%%") % (name,cv_results.mean()*100)
	results.append(result)

pickle.dump(results,open("../saves/cross_validation_18f.pkl","wb"))
