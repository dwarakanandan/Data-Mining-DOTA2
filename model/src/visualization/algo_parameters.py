import pickle
import matplotlib.pyplot as plt
import numpy as np

def print_rf(rf,i):
    print "RF: ",
    print "min: " + str(i) + ",   best_score: " + str(rf[str(i)]['best_score']) + ",   n_estimators: " + str(rf[str(i)]['n_estimators']),
    print ",    criterion: " + str(rf[str(i)]['criterion']) + ",   max_features: " + str(rf[str(i)]['max_features']),
    print ",   min_samples_split:" + str(rf[str(i)]['min_samples_split']) + ",   min_samples_leaf:" + str(result['rf'][str(i)]['min_samples_leaf'])

def print_lr(lr,i):
    print "LR: ",
    print "min: " + str(i) + ",   best_score: " + str(lr[str(i)]['best_score']) + ",   C: " + str(lr[str(i)]['best_estimator_.C'])

def print_knn(knn,i):
    print "KNN:",
    print "min: " + str(i) +  ",   best_score: " + str(knn[str(i)]['best_score']) + ",   Number of neighbors: " + str(knn[str(i)]['best_estimator_.n_neighbors'])

def print_svm(svm,i):
    print "SVM: ",
    print "min: " + str(i) + ",   best_score: " + str(svm[str(i)]['best_score']) + ",   C: " + str(svm[str(i)]['best_estimator_.C']),
    print ",    gamma: " + str(svm[str(i)]['grid.best_estimator_.gamma']) + ",   kernel: " + svm[str(i)]['grid.best_estimator_.kernel']

result = pickle.load(open("../../saves/algorithm_selection.pickle","rb"))
rf = result['rf']
lr = result['lr']
knn = result['knn']
svm = result['svm']
for i in range(5,31,5):
    print_rf(rf,i)
    print_lr(lr,i)
    print_knn(knn,i)
    #print_svm(svm,i)
    print ""
