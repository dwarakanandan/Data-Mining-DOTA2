from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import urllib2
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from algorithm_logistic_regression import predict_match



def main(request):
    return render(request, 'prediction/header_prediction.html')


class league_predictor(View):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        returnJSON = predict_match(request.body)
        return JsonResponse(returnJSON)
