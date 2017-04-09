
from load_data_170f import load
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV
from sklearn.decomposition import PCA

for i in range(1,16):
    """
    x,y = load(i)
    model = LogisticRegression()
    rfe = RFE(model,18)
    fit = rfe.fit(x, y)
    #print("Num Features: %d") % fit.n_features_
    #print("Selected Features: %s") % fit.support_
    #print("Feature Ranking: %s") % fit.ranking_
    """
    x,y = load(i)
    pca = PCA(n_components=100)
    x = pca.fit_transform(x)
    param_grid = {"C": [0.005,0.01,0.05,0.1,0.5,1,1.5,2]}
    grid = GridSearchCV(cv=10 ,estimator=LogisticRegression(), param_grid=param_grid)
    #print grid.estimator.get_params().keys()
    grid.fit(x,y)
    print i,
    print grid.best_score_*100
