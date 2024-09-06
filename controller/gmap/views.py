import json
import math
import logging
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import api_connection

from .hill_climbing_search import hill_climbing_search
from .calculate_distance import calculate_distance, calculate_distance_way

from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt


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
    names = list(api_connection.find({}, {"name": 1, "id": 1}))
    print("hello")
    for name in names:
        for key in name:
            name[key] = str(name[key])
    return JsonResponse(names, safe=False)

# get distance

@csrf_exempt
def get_distance(request):
    if request.method == 'POST':
        try:
            points_id = json.loads(request.body)["id"]
            if len(points_id) != 2:
                return JsonResponse({"error": "Invalid points ID"}, status=400)
            
            locations = list(api_connection.find({"id": {"$in": points_id}}, {"_id": 0}))
            
            start_location = end_location = []
            
            if points_id[0] == points_id[1]:
                return JsonResponse({"distance": 0, "start": locations[0], "end": locations[0]})
            else:
                start_location, end_location = locations
                distance = calculate_distance(start_location, end_location)
                start_location, end_location = locations
                return JsonResponse({"distance": distance, "start": start_location, "end": end_location})
            
            
        except Exception as e:
            logger.error(f'Error occurred: {e}')
            return JsonResponse({"error": str(e)}, status=400)
            
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

# nối các đỉnh đường đi

def connect_way(locations, start, end):
    return hill_climbing_search(locations, start, end)


# @ensure_csrf_cookie
@csrf_exempt
def get_way(request):
    if request.method == 'POST':
        try:
            points_id = json.loads(request.body)["id"]
            
            if len(points_id) != 2:
                return JsonResponse({"error": "Invald points ID"}, status = 400)
            
            result = list(api_connection.find({"id": {"$in": points_id}}, {"_id": 0}))
            sorted_result = sorted(result, key=lambda x: points_id.index(x['id']))
            
            locations_api = list(api_connection.find({}, {"_id": 0}))
            start_location = end_location = sorted_result[0]
            
            if points_id[0] == points_id[1]:
                locations = [start_location, end_location]
                distance = 0
            else:
                start_location, end_location = sorted_result
                locations, tableShow = connect_way(locations_api, start_location, end_location)
                distance = calculate_distance_way(locations)
            
            return JsonResponse({"start":start_location,"end":  end_location,'way': locations, "distance": distance, "tableShow": tableShow})

        except Exception as e:
            logger.error(f'Error occurred: {e}')
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)