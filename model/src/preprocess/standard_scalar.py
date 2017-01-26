from sklearn.preprocessing import StandardScaler
import numpy as np
from load_data_18f import load
import pickle
import os

features = "18"
if not os.path.exists("../../cache/"+features+"f"):
	os.mkdir("../../cache/"+features+"f")

for time_elapsed in range(1,31):
	x,y = load(time_elapsed)
	scalar = StandardScaler().fit(x)
	rescaled_x = scalar.transform(x)
	save = {"x":rescaled_x,"y":y}
	pickle.dump(save,open("../../cache/"+features+"f/"+str(time_elapsed)+".pkl","wb"))
