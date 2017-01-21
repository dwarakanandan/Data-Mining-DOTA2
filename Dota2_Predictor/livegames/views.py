from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import urllib2
import json

def main(request):
    return render(request, 'livegames/header_livegames.html')


def getDetailsJSON(request):
    file = open('JSONs/livegames.json', 'r')
    json_obj_livegames = json.loads(file.read())
    file.close()
    file = open('JSONs/heroes.json', 'r')
    json_obj_heroes = json.loads(file.read())
    file.close()
    json_obj = {"livegames":json_obj_livegames, "heroes":json_obj_heroes}
    return JsonResponse(json_obj)
