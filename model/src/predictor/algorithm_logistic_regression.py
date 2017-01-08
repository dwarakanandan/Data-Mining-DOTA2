import numpy
import pickle

def predict(features,time,x):
    x = x.reshape(1,-1)
    model = pickle.load(open("../../saves/lr/"+str(features)+"f/algorithm_lr_"+str(features)+"f_"+str(time)+"m.pkl","rb"))
    global_prediction_accuracy = pickle.load(open("../../saves/lr/algorithm_lr_"+str(features)+"f.pkl","rb"))[time-1][1]
    prediction = model.predict(x)[0]
    prediction_probablity = model.predict_proba(x)[0]
    return prediction,prediction_probablity,global_prediction_accuracy
