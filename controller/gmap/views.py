import json
import math
import logging
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import api_connection

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

def calculate_distance(start, end):
    R = 6371.0
    
    lat1 = math.radians(start['lat'])
    lon1 = math.radians(start['long'])
    lat2 = math.radians(end['lat'])
    lon2 = math.radians(end['long'])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    # Khoảng cách
    distance = R * c
    
    return distance

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