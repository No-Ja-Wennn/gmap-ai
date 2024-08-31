import json
import math
import logging
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import api_connection

from .hill_climbing_search import hill_climbing_search
from .calculate_distance import calculate_distance


logger = logging.getLogger(__name__)

# get locations
def get_locations(request):
    locations = list(api_connection.find())
    for location in locations:
        for key in location:
            location[key] = str(location[key])
    return JsonResponse(locations, safe=False)

# get name of locations

def get_name_locations(request):
    names = list(api_connection.find({}, {"name": 1}))
    for name in names:
        for key in name:
            name[key] = str(name[key])
    return JsonResponse(names, safe=False)

# get distance


def get_distance(request):
    if request.method == 'POST':
        try:
            points_id = json.loads(request.body)
            if len(points_id) != 2:
                return JsonResponse({"error": "Invalid points ID"}, status=400)
            
            locations = list(api_connection.find({"id": {"$in": points_id}}))
            
            start_location, end_location = locations
            
            distance = calculate_distance(start_location, end_location)
            
            return JsonResponse({"distance": distance})
        except Exception as e:
            logger.error(f'Error occurred: {e}')
            return JsonResponse({"error": str(e)}, status=400)
            
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

# nối các đỉnh đường đi

def connect_way(locations, start, end):
    return hill_climbing_search(locations, start, end)

from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

# @ensure_csrf_cookie
@csrf_exempt
def get_way(request):
    if request.method == 'POST':
        try:
            points_id = json.loads(request.body)["id"]
            
            if len(points_id) != 2:
                return JsonResponse({"error": "Invald points ID"}, status = 400)
            
            start_location, end_location = list(api_connection.find({"id": {"$in": points_id}}, {"name": 0, "_id": 0}))

            locations_api = list(api_connection.find({}, {"name": 0, "_id": 0}))

            locations = connect_way(locations_api, start_location, end_location)
            
            return JsonResponse({'locations': locations})
        except Exception as e:
            logger.error(f'Error occurred: {e}')
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)