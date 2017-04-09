import pickle
import matplotlib.pyplot as plt
import numpy as np

def print_rf(rf,i):
    print "RF: ",
    print "min: " + str(i) + ",   best_score: " + str(rf['best_score']) + ",   n_estimators: " + str(rf['n_estimators']),
    print ",   max_features: " + str(rf['max_features']),
    print ",   min_samples_split:" + str(rf['min_samples_split']) + ",   min_samples_leaf:" + str(result['rf']['min_samples_leaf'])

def print_lr(lr,i):
    print "LR: ",
    print "min: " + str(i) + ",   best_score: " + str(lr['best_score']) + ",   C: " + str(lr['best_estimator_.C'])

def print_knn(knn,i):
    print "KNN:",
    print "min: " + str(i) +  ",   best_score: " + str(knn['best_score']) + ",   Number of neighbors: " + str(knn['best_estimator_.n_neighbors'])

def print_svm(svm,i):
    print "SVM: ",
    print "min: " + str(i) + ",   best_score: " + str(svm['best_score']) + ",   C: " + str(svm['best_estimator_.C']),
    print ",    gamma: " + str(svm['best_estimator_.gamma'])


for i in range(1,16):
    result = pickle.load(open('../../saves/algorithm_comparison/'+str(i)+'.pkl','rb'))
    rf = result['rf']
    lr = result['lr']
    knn = result['knn']
    svm = result['svm']
    print_rf(rf,i)
    print_lr(lr,i)
    print_knn(knn,i)
    print_svm(svm,i)
    print ""
