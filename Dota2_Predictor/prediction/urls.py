from django.conf.urls import url
from . import views

from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^$', views.main, name="main"),
    url(r'^predict$', csrf_exempt(views.league_predictor.as_view()), name="league_predictor")
]
