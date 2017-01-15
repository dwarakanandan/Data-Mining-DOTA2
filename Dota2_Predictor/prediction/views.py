from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import urllib2
import json

def main(request):
    return render(request, 'prediction/header_prediction.html')
