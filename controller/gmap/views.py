from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import api_connection
# get locations
def getLocations(request):
    locations = list(api_connection.find())
    for location in locations:
        for key in location:
            location[key] = str(location[key])
    return JsonResponse(locations, safe=False)

# 
    