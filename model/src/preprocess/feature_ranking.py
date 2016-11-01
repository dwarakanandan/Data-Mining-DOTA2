from sklearn import datasets
from sklearn import metrics
from sklearn.ensemble import ExtraTreesClassifier
import numpy as np
from load_data_90f import load

x,y = load(5)
model = ExtraTreesClassifier()
n=2500
model.fit(x[:n],y[:n])
np.set_printoptions(precision=3)
print model.score(x[n:],y[n:])
print model.feature_importances_.reshape(10,9).sum(axis=0)
