from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import urllib2
import json

def main(request):
    return render(request, 'livegames/header_livegames.html')


def getJSON(request):
    file = open("live JSON/livegames.json", "r")
    json_obj = json.loads(file.read())
    return JsonResponse(json_obj)
